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