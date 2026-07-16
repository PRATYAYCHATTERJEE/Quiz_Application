const questions = [
  {
    question: "Which HTML tag is used to define a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Syntax", "Creative Style System", "Computer Style Setup"],
    correct: 0,
  },
  {
    question: "Which JavaScript keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "function"],
    correct: 1,
  },
  {
    question: "Which of these is a valid CSS unit for spacing?",
    options: ["px", "m", "kg", "sec"],
    correct: 0,
  },
  {
    question: "What does the 'box-shadow' property add to an element?",
    options: ["Padding", "Shadow effect", "Animation", "Outline"],
    correct: 1,
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "append()", "insert()", "add()"],
    correct: 0,
  },
  {
    question: "Which HTML5 element is used to define navigation links?",
    options: ["<header>", "<section>", "<nav>", "<footer>"],
    correct: 2,
  },
  {
    question: "Which of these is a valid responsive unit?",
    options: ["vh", "kg", "mb", "mph"],
    correct: 0,
  },
  {
    question: "What is the purpose of the 'display: flex' rule?",
    options: ["Creates a grid", "Adds spacing", "Enables flexbox layout", "Changes color"],
    correct: 2,
  },
  {
    question: "Which symbol denotes an ID selector in CSS?",
    options: [".", "#", "*", ":"],
    correct: 1,
  },
  {
    question: "Which of these is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Number"],
    correct: 2,
  },
  {
    question: "Which property changes the text color?",
    options: ["background-color", "color", "font-size", "border"],
    correct: 1,
  },
  {
    question: "What does API stand for?",
    options: ["Application Program Interface", "Advanced Programming Input", "Automated Program Integration", "Application Process Integration"],
    correct: 0,
  },
  {
    question: "Which method selects an HTML element by ID?",
    options: ["querySelectorAll()", "getElementsByClassName()", "getElementById()", "select()"],
    correct: 2,
  },
  {
    question: "What does 'aria-label' improve?",
    options: ["Image quality", "Accessibility", "Animation speed", "Memory usage"],
    correct: 1,
  },
  {
    question: "Which file extension is used for a stylesheet?",
    options: [".js", ".html", ".css", ".json"],
    correct: 2,
  },
  {
    question: "What is the default display value of a div?",
    options: ["inline", "block", "flex", "grid"],
    correct: 1,
  },
  {
    question: "Which operator compares both value and type?",
    options: ["==", "=", "===", "!=="],
    correct: 2,
  },
  {
    question: "What does the 'transition' property control?",
    options: ["Document title", "Animation smoothness", "Text alignment", "Image source"],
    correct: 1,
  },
  {
    question: "Which method is used to submit a form?",
    options: ["submit()", "send()", "post()", "request()"],
    correct: 0,
  },
];

const participantName = "Ava Chen";
const totalQuestions = questions.length;
let currentQuestion = 0;
let timeLeft = 150;
let selectedAnswers = Array(totalQuestions).fill(null);
let quizFinished = false;
let timer;

const loadingState = document.getElementById("loadingState");
const quizCard = document.getElementById("quizCard");
const questionText = document.getElementById("questionText");
const questionBadge = document.getElementById("questionBadge");
const optionsContainer = document.getElementById("optionsContainer");
const headerQuestionCounter = document.getElementById("headerQuestionCounter");
const timerElement = document.getElementById("timer");
const navigator = document.getElementById("navigator");
const participantLabel = document.getElementById("participantName");
const scoreValue = document.getElementById("scoreValue");
const answeredValue = document.getElementById("answeredValue");
const remainingValue = document.getElementById("remainingValue");
const progressBar = document.getElementById("progressBar");
const resultModal = document.getElementById("resultModal");
const modalScore = document.getElementById("modalScore");
const modalCorrect = document.getElementById("modalCorrect");
const modalWrong = document.getElementById("modalWrong");
const modalAccuracy = document.getElementById("modalAccuracy");
const modalPosition = document.getElementById("modalPosition");

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.className = "ripple";
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${event.clientX - rect.left}px`;
  circle.style.top = `${event.clientY - rect.top}px`;
  button.appendChild(circle);
  setTimeout(() => circle.remove(), 550);
}

function attachRipple(button) {
  button.addEventListener("click", createRipple);
}

function updateStats() {
  const answered = selectedAnswers.filter((answer) => answer !== null).length;
  const remaining = totalQuestions - answered;
  const correct = selectedAnswers.reduce((count, answer, index) => {
    if (answer === null) return count;
    return count + (answer === questions[index].correct ? 1 : 0);
  }, 0);

  scoreValue.textContent = `${correct}`;
  answeredValue.textContent = `${answered}`;
  remainingValue.textContent = `${remaining}`;
  progressBar.style.width = `${(answered / totalQuestions) * 100}%`;
  participantLabel.textContent = participantName;
}

function renderQuestion() {
  if (quizFinished) return;

  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  questionBadge.textContent = `Question ${String(currentQuestion + 1).padStart(2, "0")}`;
  headerQuestionCounter.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;

  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-card";
    if (selectedAnswers[currentQuestion] === index) btn.classList.add("selected");
    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${option}</span>
      <span class="check-icon"><i class="fa-solid fa-check"></i></span>
    `;
    btn.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(btn);
  });

  renderNavigator();
  updateStats();
}

function renderNavigator() {
  navigator.innerHTML = "";
  questions.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "nav-dot";
    if (index === currentQuestion) dot.classList.add("current");
    else if (selectedAnswers[index] !== null) dot.classList.add("answered");
    else dot.classList.add("unanswered");
    dot.textContent = index + 1;
    dot.addEventListener("click", () => jumpToQuestion(index));
    navigator.appendChild(dot);
  });
}

function selectOption(index) {
  if (quizFinished) return;
  selectedAnswers[currentQuestion] = index;
  renderQuestion();
}

function jumpToQuestion(index) {
  if (quizFinished) return;
  currentQuestion = index;
  renderQuestion();
}

function goToPrevious() {
  if (quizFinished) return;
  currentQuestion = currentQuestion === 0 ? 0 : currentQuestion - 1;
  renderQuestion();
}

function goToNext() {
  if (quizFinished) return;
  currentQuestion = currentQuestion === totalQuestions - 1 ? totalQuestions - 1 : currentQuestion + 1;
  renderQuestion();
}

function submitCurrentAnswer() {
  if (quizFinished) return;
  quizFinished = true;
  clearInterval(timer);

  const correct = selectedAnswers.reduce((count, answer, index) => {
    return count + (answer === questions[index].correct ? 1 : 0);
  }, 0);
  const wrong = totalQuestions - correct;
  const accuracy = Math.round((correct / totalQuestions) * 100);
  const position = Math.max(1, Math.min(8, Math.floor(Math.random() * 8 + 1)));

  modalScore.textContent = `${correct * 10}`;
  modalCorrect.textContent = `${correct}`;
  modalWrong.textContent = `${wrong}`;
  modalAccuracy.textContent = `${accuracy}%`;
  modalPosition.textContent = `#${position}`;
  resultModal.classList.remove("hidden");
}

function updateTimer() {
  if (timeLeft <= 0) {
    timerElement.textContent = "00:00";
    submitCurrentAnswer();
    return;
  }

  timerElement.textContent = formatTime(timeLeft);
  timeLeft -= 1;
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}

document.getElementById("prevBtn").addEventListener("click", () => {
  attachRipple(document.getElementById("prevBtn"));
  goToPrevious();
});
document.getElementById("nextBtn").addEventListener("click", () => {
  attachRipple(document.getElementById("nextBtn"));
  goToNext();
});
document.getElementById("submitBtn").addEventListener("click", () => {
  attachRipple(document.getElementById("submitBtn"));
  submitCurrentAnswer();
});
document.getElementById("leaderboardBtn").addEventListener("click", () => {
  attachRipple(document.getElementById("leaderboardBtn"));
  resultModal.classList.add("hidden");
  alert("Leaderboard view is ready for the next release.");
});

window.addEventListener("load", () => {
  participantLabel.textContent = participantName;
  setTimeout(() => {
    loadingState.classList.add("hidden");
    quizCard.classList.remove("hidden");
    renderQuestion();
    startTimer();
  }, 900);
});