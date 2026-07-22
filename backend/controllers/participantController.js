const Participant = require("../models/Participant");

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

console.log("=================================");
        console.log("Participant ID:", participantId);
        console.log("Question ID:", questionId);
        console.log("Selected Option:", selectedOption);


        const participant = await Participant.findById(participantId);

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
        console.log("Answers Before Save:", participant.answers.length);

participant.answers.forEach((answer, index) => {
    console.log(
        index,
        answer.questionId.toString(),
        answer.selectedOption
    );
});
        await participant.save();
console.log("Saved Successfully");
console.log("Answers After Save:", participant.answers.length);
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

        const Question = require("../models/Question");

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

        if (answered < 5) {

            return res.status(400).json({

                success: false,
                message: "You must answer at least 5 questions."

            });

        }

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




module.exports = {

    registerParticipant,
    saveAnswer,
    finishQuiz
};


