const Participant = require("../models/Participant");
const Question = require("../models/Question");
// ==========================
// Register Participant
// ==========================
const registerParticipant = async (req, res) => {

    try {

        const {

            name,
            department,
            year,
            phone

        } = req.body;

        const existingParticipant = await Participant.findOne({ phone });

if (existingParticipant) {
    return res.status(400).json({
        success: false,
        message: "Phone number already registered."
    });
}

const participant = new Participant({
    name,
    department,
    year,
    phone
});

const savedParticipant = await participant.save();

        res.status(201).json({

            success: true,
            message: "Participant Registered Successfully",
            data: savedParticipant

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// Save Answer
// ==========================
const saveAnswer = async (req, res) => {

    try {

        const {
            participantId,
            questionId,
            selectedOption
        } = req.body;

        // console.log("=================================");
        // console.log("Participant ID:", participantId);
        // console.log("Question ID:", questionId);
        // console.log("Selected Option:", selectedOption);


        const participant = await Participant.findById(participantId);
        if (participant.completed) {

    return res.status(400).json({

        success: false,
        message: "Quiz has already been submitted."

    });

}
       // console.log("==================================");
       // console.log("FINISH QUIZ");
       // console.log("Participant ID:", participantId);
       // console.log("Total Answers:", participant.answers.length);

//        participant.answers.forEach((answer, index) => {
//           console.log(
//         index,
//         answer.questionId.toString(),
//         answer.selectedOption
//     );
// });
        if (!participant) {

            return res.status(404).json({
                success: false,
                message: "Participant not found"
            });

        }

        const existingAnswer = participant.answers.find(
            answer => answer.questionId.toString() === questionId
        );

        if (existingAnswer) {

            existingAnswer.selectedOption = selectedOption;

        } else {

            participant.answers.push({

                questionId,
                selectedOption

            });

        }
       // console.log("Answers Before Save:", participant.answers.length);

// participant.answers.forEach((answer, index) => {
//     console.log(
//         index,
//         answer.questionId.toString(),
//         answer.selectedOption
//     );
// });
        await participant.save();
//console.log("Saved Successfully");
//console.log("Answers After Save:", participant.answers.length);
        res.json({

            success: true,
            message: "Answer Saved"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==========================
// Finish Quiz
// ==========================
const finishQuiz = async (req, res) => {

    try {

        const { participantId } = req.body;

        const participant = await Participant.findById(participantId);

        if (!participant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found"
            });
        }


        const questions = await Question.find();

        let answered = 0;
        let correct = 0;
        let wrong = 0;
        let score = 0;

        for (const answer of participant.answers) {

            const question = questions.find(
                q => q._id.toString() === answer.questionId.toString()
            );

            if (!question) continue;

            answered++;

            if (answer.selectedOption === question.correctAnswer) {

                correct++;
                score += question.marks;

                answer.isCorrect = true;
                answer.marks = question.marks;

            } else {

                wrong++;

                answer.isCorrect = false;
                answer.marks = 0;

            }

        }
        
        // if (answered < 5) {

        //     return res.status(400).json({

        //         success: false,
        //         message: "You must answer at least 5 questions."

        //     });

        // }

        participant.answered = answered;
        participant.correct = correct;
        participant.wrong = wrong;
        participant.score = score;

        participant.completed = true;
        participant.status = "Completed";
        participant.endTime = new Date();

        await participant.save();

        res.json({

            success: true,

            result: {

                answered,
                correct,
                wrong,
                score

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// Get All Participants
// ==========================
const getParticipants = async (req, res) => {

    try {

        const participants = await Participant.find()
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: participants.length,
            data: participants

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// Leaderboard
// ==========================
const getLeaderboard = async (req, res) => {

    try {

        const Question = require("../models/Question");

        // Get total quiz marks
        const questions = await Question.find();

        const totalMarks = questions.reduce(
            (sum, question) => sum + question.marks,
            0
        );

        // Get completed participants
        const participants = await Participant.find({

            completed: true

        });

        const leaderboard = participants.map(participant => {

            const timeTakenMs =
                new Date(participant.endTime) -
                new Date(participant.startTime);

            const minutes = Math.floor(timeTakenMs / 60000);

            const seconds = Math.floor((timeTakenMs % 60000) / 1000);

            return {

                _id: participant._id,

                name: participant.name,

                department: participant.department,

                image: participant.image || "",

                score: participant.score,

                totalMarks,

                correct: participant.correct,

                wrong: participant.wrong,

                timeTakenMs,

                timeTaken:
                    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`,

                endTime: participant.endTime

            };

        });

        // Ranking Logic
        leaderboard.sort((a, b) => {

            // 1. Highest Score
            if (b.score !== a.score)
                return b.score - a.score;

            // 2. Highest Correct
            if (b.correct !== a.correct)
                return b.correct - a.correct;

            // 3. Lowest Time
            if (a.timeTakenMs !== b.timeTakenMs)
                return a.timeTakenMs - b.timeTakenMs;

            // 4. Earliest Finish
            return new Date(a.endTime) - new Date(b.endTime);

        });

        leaderboard.forEach((participant, index) => {

            participant.rank = index + 1;

            delete participant.timeTakenMs;

            delete participant.endTime;

        });

        res.json({

            success: true,

            count: leaderboard.length,

            data: leaderboard

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    registerParticipant,
    saveAnswer,
    finishQuiz,
    getParticipants,
    getLeaderboard
};


