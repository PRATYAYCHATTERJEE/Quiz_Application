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

questions = [

{
    question:"Which method creates a shallow copy of an array?",
    options:[
        "Array.prototype.deepCopy()",
        "Array.prototype.slice()",
        "Array.prototype.clone()",
        "Array.prototype.duplicate()"
    ],
    answer:1,
    category:"JavaScript",
    difficulty:"Easy",
    marks:2,
    time:60
},

{
    question:"Which keyword declares a constant variable?",
    options:[
        "let",
        "const",
        "var",
        "static"
    ],
    answer:1,
    category:"JavaScript",
    difficulty:"Easy",
    marks:2,
    time:60
}

];

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    totalQuestionText.textContent = questions.length;

    loadQuestion();

    startTimer();

});

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

        const minutes = String(Math.floor(totalTime/60)).padStart(2,"0");

        const seconds = String(totalTime%60).padStart(2,"0");

        timer.textContent = `${minutes}:${seconds}`;

    },1000);

}

/* ==========================================================
   LOAD QUESTION
========================================================== */

function loadQuestion(){

    const q = questions[currentQuestion];

    questionNumber.textContent = String(currentQuestion+1).padStart(2,"0");

    currentQuestionText.textContent = currentQuestion+1;

    questionText.textContent = q.question;

    optionCards.forEach((card,index)=>{

        card.querySelector("span").textContent = q.options[index];

        card.classList.remove("active");

    });

    updateProgress();

}

/* ==========================================================
   OPTION SELECT
========================================================== */

optionCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        optionCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        selectedAnswers[currentQuestion]=index;

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

        currentQuestion++;

        loadQuestion();

        updateNavigator();

    }

});

/* ==========================================================
   PREVIOUS QUESTION
========================================================== */

previousBtn.addEventListener("click",()=>{

    if(currentQuestion>0){

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