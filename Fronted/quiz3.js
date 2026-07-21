/* ==========================================================
   QUIZVERSE QUIZ.JS
========================================================== */

/* ==========================================================
   VARIABLES
========================================================== */

let questions = [];
let currentQuestion = 0;
let selectedAnswers = [];
let reviewQuestions = [];
let skippedQuestions = [];
let quizFinished = false;
let totalTime = 20 * 60;
let timerInterval = null;

/* ==========================================================
   API URL
========================================================== */

const API_URL = "http://localhost:5000/api/questions";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const questionNumber = document.getElementById("questionNo");
const questionText = document.getElementById("questionText");

const optionCards = document.querySelectorAll(".option-card");

const currentQuestionText = document.getElementById("currentQuestion");
const totalQuestionText = document.getElementById("totalQuestions");

const progressFill = document.querySelector(".progress-fill");

const timer = document.getElementById("quizTimer");

const navigatorButtons = document.querySelectorAll(".nav-btn");


/* ==========================================================
   TEMP QUESTIONS
========================================================== */



/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await fetchQuestions();

restoreQuizState();

loadQuestion();

updateNavigator();

startTimer();

});


/* ==========================================================
   FETCH QUESTIONS
========================================================== */

async function fetchQuestions(){

    try{

        const response = await fetch(API_URL);

        const result = await response.json();

        if(result.success){

            questions = result.data;

            totalQuestionText.textContent = questions.length;

            loadQuestion();

            updateNavigator();

        }

    }catch(error){

        console.error(error);

        alert("Unable to load quiz.");

    }

}



/* ==========================================================
   TIMER
========================================================== */

function startTimer(){

    timerInterval = setInterval(()=>{

        if(totalTime<=0){

            clearInterval(timerInterval);

            finishQuiz();

            return;

        }

        totalTime--;
        saveQuizState();
        const minutes = String(Math.floor(totalTime/60)).padStart(2,"0");

        const seconds = String(totalTime%60).padStart(2,"0");

        timer.textContent = `${minutes}:${seconds}`;

    },1000);

}

/* ==========================================================
   LOAD QUESTION
========================================================== */

function loadQuestion(){

    const q=questions[currentQuestion];

    questionNumber.textContent=
    String(currentQuestion+1).padStart(2,"0");

    currentQuestionText.textContent=
    currentQuestion+1;

    questionText.textContent=q.question;

    optionCards.forEach((card,index)=>{

        card.querySelector("span").textContent=q.options[index];

        card.classList.remove("active");

        if(selectedAnswers[currentQuestion]===index){

            card.classList.add("active");

        }

    });

    updateProgress();

}
const questionCategory=document.getElementById("questionCategory");

const questionDifficulty=document.getElementById("questionDifficulty");

const questionMarks=document.getElementById("questionMarks");


/* ==========================================================
   OPTION SELECT
========================================================== */

optionCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        optionCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        selectedAnswers[currentQuestion]=index;
        saveQuizState();
    });

});

/* ==========================================================
   PROGRESS
========================================================== */

function updateProgress(){

    const percent=((currentQuestion+1)/questions.length)*100;

    progressFill.style.width=percent+"%";

}

/* ==========================================================
   FINISH
========================================================== */

function finishQuiz(){

    alert("Quiz Finished");

}

/* ==========================================================
   FOOTER BUTTONS
========================================================== */

const previousBtn=document.querySelector(".previous");
const nextBtn=document.querySelector(".next");
const reviewBtn=document.querySelector(".review");
const clearBtn=document.querySelector(".clear");
const skipBtn=document.querySelector(".skip");
const submitBtn=document.querySelector(".submit");
const finishBtn=document.querySelector(".finish");

/* ==========================================================
   NEXT QUESTION
========================================================== */

nextBtn.addEventListener("click",()=>{

    if(currentQuestion<questions.length-1){
        saveQuizState();
        currentQuestion++;

        loadQuestion();
        questionCategory.textContent=q.category;

questionDifficulty.textContent=q.difficulty;

questionMarks.textContent=q.marks+" Marks";
        updateNavigator();

    }

});

/* ==========================================================
   PREVIOUS QUESTION
========================================================== */

previousBtn.addEventListener("click",()=>{

    if(currentQuestion>0){
        saveQuizState();
        currentQuestion--;

        loadQuestion();

        updateNavigator();

    }

});

/* ==========================================================
   NAVIGATOR
========================================================== */

navigatorButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        currentQuestion=index;

        loadQuestion();

        updateNavigator();

    });

});

/* ==========================================================
   UPDATE NAVIGATOR
========================================================== */

function updateNavigator(){

    navigatorButtons.forEach(btn=>{

        btn.classList.remove("current");

    });

    navigatorButtons[currentQuestion].classList.add("current");

}

/* ==========================================================
   CLEAR ANSWER
========================================================== */

clearBtn.addEventListener("click",()=>{

    selectedAnswers[currentQuestion]=undefined;
    saveQuizState();
    optionCards.forEach(card=>{

        card.classList.remove("active");

    });

});

/* ==========================================================
   REVIEW QUESTION
========================================================== */

reviewBtn.addEventListener("click",()=>{

    if(!reviewQuestions.includes(currentQuestion)){

        reviewQuestions.push(currentQuestion);
        saveQuizState();
    }

    navigatorButtons[currentQuestion].classList.add("review");

    alert("Question marked for review.");

});

/* ==========================================================
   SKIP QUESTION
========================================================== */

skipBtn.addEventListener("click",()=>{

    if(!skippedQuestions.includes(currentQuestion)){

        skippedQuestions.push(currentQuestion);
        saveQuizState();
    }

    navigatorButtons[currentQuestion].classList.add("skipped");

    if(currentQuestion<questions.length-1){

        currentQuestion++;

        loadQuestion();

        updateNavigator();

    }

});

/* ==========================================================
   SUBMIT CURRENT
========================================================== */

submitBtn.addEventListener("click",()=>{

    if(selectedAnswers[currentQuestion]===undefined){

        alert("Please select an option.");

        return;

    }

    navigatorButtons[currentQuestion].classList.remove("current");

    navigatorButtons[currentQuestion].classList.add("answered");

    alert("Answer Submitted.");

});

/* ==========================================================
   FINISH QUIZ
========================================================== */

finishBtn.addEventListener("click",finishQuiz);

function finishQuiz(){

    const confirmFinish=confirm(
        "Are you sure you want to finish the quiz?"
    );

    if(!confirmFinish) return;

    clearInterval(timerInterval);

    alert("Quiz Finished Successfully.");

}


/* ==========================================================
   SAVE QUIZ STATE
========================================================== */

function saveQuizState(){

    const quizState={

        currentQuestion,

        selectedAnswers,

        reviewQuestions,

        skippedQuestions,

        totalTime

    };

    localStorage.setItem(
        "quizverseQuizState",
        JSON.stringify(quizState)
    );

}


/* ==========================================================
   RESTORE QUIZ STATE
========================================================== */

function restoreQuizState(){

    const savedQuiz=localStorage.getItem("quizverseQuizState");

    if(!savedQuiz) return;

    const quizState=JSON.parse(savedQuiz);

    currentQuestion=quizState.currentQuestion ?? 0;

    selectedAnswers=quizState.selectedAnswers ?? [];

    reviewQuestions=quizState.reviewQuestions ?? [];

    skippedQuestions=quizState.skippedQuestions ?? [];

    totalTime=quizState.totalTime ?? totalTime;

}