/* ═══════════════════════════════════════════════════════════════
   QuizVerse — Participant Quiz Interface — JavaScript Engine
   ═══════════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

  // ─── Quiz Data ───
  const QUIZ_DATA = {
    title: 'Advanced Web Technologies',
    participant: { name: 'Prithwish Das', department: 'CSE', year: '3rd', avatar: 'PD' },
    totalTime: 30 * 60, // 30 minutes in seconds
    negativeMarking: 1,
    questions: [
      {
        id: 1,
        text: 'Which of the following methods is used to create a shallow copy of an array in JavaScript?',
        category: 'JavaScript',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 60,
        image: null,
        options: [
          { id: 'a', text: 'Array.prototype.deepCopy()' },
          { id: 'b', text: 'Array.prototype.slice()' },
          { id: 'c', text: 'Array.prototype.clone()' },
          { id: 'd', text: 'Array.prototype.duplicate()' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 2,
        text: 'What does the CSS property "backdrop-filter: blur()" do when applied to an element?',
        category: 'CSS',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 90,
        image: null,
        options: [
          { id: 'a', text: 'Blurs the element itself' },
          { id: 'b', text: 'Blurs everything behind the element' },
          { id: 'c', text: 'Blurs the text inside the element' },
          { id: 'd', text: 'Blurs the border of the element' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 3,
        text: 'In the context of React, what is the purpose of the useEffect hook?',
        category: 'React',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 90,
        image: null,
        options: [
          { id: 'a', text: 'To manage component state' },
          { id: 'b', text: 'To perform side effects in function components' },
          { id: 'c', text: 'To create reusable UI components' },
          { id: 'd', text: 'To optimize rendering performance' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 4,
        text: 'Which HTTP status code indicates that the requested resource has been permanently moved to a new URL?',
        category: 'Web Fundamentals',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 45,
        image: null,
        options: [
          { id: 'a', text: '200 OK' },
          { id: 'b', text: '301 Moved Permanently' },
          { id: 'c', text: '404 Not Found' },
          { id: 'd', text: '503 Service Unavailable' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 5,
        text: 'What is the time complexity of searching for an element in a balanced binary search tree?',
        category: 'Algorithms',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 120,
        image: null,
        options: [
          { id: 'a', text: 'O(1)' },
          { id: 'b', text: 'O(n)' },
          { id: 'c', text: 'O(log n)' },
          { id: 'd', text: 'O(n log n)' },
        ],
        correctAnswer: 'c',
      },
      {
        id: 6,
        text: 'Which of the following is NOT a valid JavaScript data type?',
        category: 'JavaScript',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 45,
        image: null,
        options: [
          { id: 'a', text: 'Symbol' },
          { id: 'b', text: 'BigInt' },
          { id: 'c', text: 'Float' },
          { id: 'd', text: 'Undefined' },
        ],
        correctAnswer: 'c',
      },
      {
        id: 7,
        text: 'What does the "async" keyword do when placed before a function declaration?',
        category: 'JavaScript',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 75,
        image: null,
        options: [
          { id: 'a', text: 'Makes the function run in a separate thread' },
          { id: 'b', text: 'Makes the function always return a Promise' },
          { id: 'c', text: 'Makes the function execute immediately' },
          { id: 'd', text: 'Makes the function non-blocking by default' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 8,
        text: 'In CSS Grid, what does "grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))" achieve?',
        category: 'CSS',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 120,
        image: null,
        options: [
          { id: 'a', text: 'Creates exactly 4 equal columns' },
          { id: 'b', text: 'Creates responsive columns that auto-fill with a minimum of 250px' },
          { id: 'c', text: 'Creates a single column layout' },
          { id: 'd', text: 'Creates columns that are always 250px wide' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 9,
        text: 'What is the purpose of a Service Worker in Progressive Web Applications?',
        category: 'Web Fundamentals',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 90,
        image: null,
        options: [
          { id: 'a', text: 'To directly manipulate the DOM' },
          { id: 'b', text: 'To act as a proxy between the app and the network' },
          { id: 'c', text: 'To compile JavaScript at runtime' },
          { id: 'd', text: 'To handle database queries on the server' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 10,
        text: 'Which design pattern is commonly used for state management in large-scale JavaScript applications?',
        category: 'Architecture',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 75,
        image: null,
        options: [
          { id: 'a', text: 'Decorator Pattern' },
          { id: 'b', text: 'Flux / Redux Pattern' },
          { id: 'c', text: 'Factory Pattern' },
          { id: 'd', text: 'Builder Pattern' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 11,
        text: 'What is the difference between "==" and "===" in JavaScript?',
        category: 'JavaScript',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 45,
        image: null,
        options: [
          { id: 'a', text: 'They are identical in behavior' },
          { id: 'b', text: '"==" compares with type coercion, "===" compares without' },
          { id: 'c', text: '"===" is used only for strings' },
          { id: 'd', text: '"==" is faster than "==="' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 12,
        text: 'Which of the following is a correct way to declare a TypeScript interface with an optional property?',
        category: 'TypeScript',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 60,
        image: null,
        options: [
          { id: 'a', text: 'interface User { name?: string }' },
          { id: 'b', text: 'interface User { optional name: string }' },
          { id: 'c', text: 'interface User { name: string | void }' },
          { id: 'd', text: 'interface User { name = string }' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 13,
        text: 'What does the "defer" attribute on a script tag do?',
        category: 'HTML',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 45,
        image: null,
        options: [
          { id: 'a', text: 'Delays script execution until after the DOM is parsed' },
          { id: 'b', text: 'Makes the script run asynchronously' },
          { id: 'c', text: 'Prevents the script from running entirely' },
          { id: 'd', text: 'Loads the script from a CDN automatically' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 14,
        text: 'In Node.js, what is the Event Loop responsible for?',
        category: 'Node.js',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 120,
        image: null,
        options: [
          { id: 'a', text: 'Compiling JavaScript to machine code' },
          { id: 'b', text: 'Managing asynchronous operations and callbacks' },
          { id: 'c', text: 'Handling HTTP routing' },
          { id: 'd', text: 'Managing database connections' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 15,
        text: 'What is the CSS specificity order from lowest to highest?',
        category: 'CSS',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 90,
        image: null,
        options: [
          { id: 'a', text: 'ID → Class → Element → Inline' },
          { id: 'b', text: 'Element → Class → ID → Inline' },
          { id: 'c', text: 'Class → Element → Inline → ID' },
          { id: 'd', text: 'Inline → ID → Class → Element' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 16,
        text: 'Which of the following best describes the concept of "hoisting" in JavaScript?',
        category: 'JavaScript',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 75,
        image: null,
        options: [
          { id: 'a', text: 'Moving elements up in the DOM tree' },
          { id: 'b', text: 'Variable and function declarations moved to the top of scope' },
          { id: 'c', text: 'Increasing the priority of CSS rules' },
          { id: 'd', text: 'Optimizing network requests' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 17,
        text: 'What is the primary advantage of using WebSockets over HTTP polling?',
        category: 'Web Fundamentals',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 90,
        image: null,
        options: [
          { id: 'a', text: 'WebSockets are more secure' },
          { id: 'b', text: 'WebSockets enable full-duplex, persistent communication' },
          { id: 'c', text: 'WebSockets use less bandwidth on initial connection' },
          { id: 'd', text: 'WebSockets work without a server' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 18,
        text: 'In the context of web security, what does CORS stand for?',
        category: 'Security',
        difficulty: 'easy',
        marks: 2,
        estimatedTime: 30,
        image: null,
        options: [
          { id: 'a', text: 'Central Origin Resource Sharing' },
          { id: 'b', text: 'Cross-Origin Resource Sharing' },
          { id: 'c', text: 'Common Object Request System' },
          { id: 'd', text: 'Cross-Object Relay Service' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 19,
        text: 'What is the purpose of the "key" prop when rendering lists in React?',
        category: 'React',
        difficulty: 'medium',
        marks: 4,
        estimatedTime: 75,
        image: null,
        options: [
          { id: 'a', text: 'It adds a CSS class to each element' },
          { id: 'b', text: 'It helps React identify which items have changed, added, or removed' },
          { id: 'c', text: 'It encrypts the list data for security' },
          { id: 'd', text: 'It determines the sort order of elements' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 20,
        text: 'Which algorithm has the best average-case time complexity for sorting?',
        category: 'Algorithms',
        difficulty: 'hard',
        marks: 5,
        estimatedTime: 120,
        image: null,
        options: [
          { id: 'a', text: 'Bubble Sort — O(n²)' },
          { id: 'b', text: 'Quick Sort — O(n log n)' },
          { id: 'c', text: 'Selection Sort — O(n²)' },
          { id: 'd', text: 'Insertion Sort — O(n²)' },
        ],
        correctAnswer: 'b',
      },
    ],
  };

  // ─── State ───
  const state = {
    currentQuestion: 0,
    answers: {},             // { questionIndex: selectedOptionId }
    questionStatus: {},      // { questionIndex: 'not-visited'|'visited'|'answered'|'marked'|'skipped' }
    submitted: {},           // { questionIndex: true }  — submitted answers
    timeRemaining: QUIZ_DATA.totalTime,
    timerInterval: null,
    quizFinished: false,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    questionTimes: {},       // { questionIndex: seconds spent }
    questionStartTime: Date.now(),
    fastAnswers: 0,          // answers under 30s
    speedAnswers: 0,         // answers under 20s
    achievements: { fast: false, speed: false, accurate: false, top: false },
    sidebarOpen: false,
  };

  // ─── DOM Refs ───
  const $ = (id) => document.getElementById(id);
  const el = {
    timerDisplay:     $('timerDisplay'),
    timerText:        $('timerText'),
    progressText:     $('progressText'),
    progressBarFill:  $('progressBarFill'),
    questionNum:      $('questionNum'),
    questionText:     $('questionText'),
    questionCard:     $('questionCard'),
    badgeCategory:    $('badgeCategory'),
    badgeDifficulty:  $('badgeDifficulty'),
    badgeMarks:       $('badgeMarks'),
    badgeTime:        $('badgeTime'),
    optionsGrid:      $('optionsGrid'),
    questionImageContainer: $('questionImageContainer'),
    questionImage:    $('questionImage'),
    imageLoading:     $('imageLoading'),
    imageZoomBtn:     $('imageZoomBtn'),
    questionNavGrid:  $('questionNavGrid'),
    progressRing:     $('progressRing'),
    progressPercent:  $('progressPercent'),
    prevBtn:          $('prevBtn'),
    nextBtn:          $('nextBtn'),
    markReviewBtn:    $('markReviewBtn'),
    clearBtn:         $('clearBtn'),
    skipBtn:          $('skipBtn'),
    submitAnswerBtn:  $('submitAnswerBtn'),
    submitQuizBtn:    $('submitQuizBtn'),
    fullscreenBtn:    $('fullscreenBtn'),
    themeToggle:      $('themeToggle'),
    exitQuizBtn:      $('exitQuizBtn'),
    rightSidebar:     $('rightSidebar'),
    sidebarToggle:    $('sidebarToggle'),
    sidebarBackdrop:  $('sidebarBackdrop'),
    modalOverlay:     $('modalOverlay'),
    modal:            $('modal'),
    modalIcon:        $('modalIcon'),
    modalTitle:       $('modalTitle'),
    modalDesc:        $('modalDesc'),
    modalActions:     $('modalActions'),
    lightbox:         $('lightbox'),
    lightboxImage:    $('lightboxImage'),
    lightboxClose:    $('lightboxClose'),
    toastContainer:   $('toastContainer'),
    timeWarningOverlay: $('timeWarningOverlay'),
    timeWarningText:  $('timeWarningText'),
    // Stats
    statAnswered:     $('statAnswered'),
    statRemaining:    $('statRemaining'),
    statSkipped:      $('statSkipped'),
    statReview:       $('statReview'),
    infoScore:        $('infoScore'),
    infoAnswered:     $('infoAnswered'),
    infoNegative:     $('infoNegative'),
    statAccuracy:     $('statAccuracy'),
    statAttempt:      $('statAttempt'),
    statSpeed:        $('statSpeed'),
    statProgress:     $('statProgress'),
    barAccuracy:      $('barAccuracy'),
    barAttempt:       $('barAttempt'),
    barSpeed:         $('barSpeed'),
    barProgress:      $('barProgress'),
  };

  const TOTAL = QUIZ_DATA.questions.length;
  const CIRCUMFERENCE = 2 * Math.PI * 63; // for SVG circle r=63

  // ─── Initialize ───
  function init() {
    restoreState();
    buildQuestionNav();
    renderQuestion(state.currentQuestion);
    startTimer();
    bindEvents();
    updateAllStats();
    applyTheme();
  }

  // ─── Save / Restore ───
  function saveState() {
    const s = {
      currentQuestion: state.currentQuestion,
      answers: state.answers,
      questionStatus: state.questionStatus,
      submitted: state.submitted,
      timeRemaining: state.timeRemaining,
      score: state.score,
      correctCount: state.correctCount,
      wrongCount: state.wrongCount,
      questionTimes: state.questionTimes,
      fastAnswers: state.fastAnswers,
      speedAnswers: state.speedAnswers,
      achievements: state.achievements,
      quizFinished: state.quizFinished,
    };
    try { localStorage.setItem('quizverse_state', JSON.stringify(s)); } catch (e) { /* noop */ }
  }

  function restoreState() {
    try {
      const saved = localStorage.getItem('quizverse_state');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.quizFinished) { localStorage.removeItem('quizverse_state'); return; }
        Object.assign(state, s);
        state.questionStartTime = Date.now();
      }
    } catch (e) { /* noop */ }
    // Mark first question as visited
    if (!state.questionStatus[0]) state.questionStatus[0] = 'visited';
  }

  // ─── Timer ───
  function startTimer() {
    if (state.quizFinished) return;
    state.timerInterval = setInterval(() => {
      if (state.timeRemaining <= 0) {
        clearInterval(state.timerInterval);
        autoSubmitQuiz();
        return;
      }
      state.timeRemaining--;
      updateTimerDisplay();
      saveState();
    }, 1000);
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const t = state.timeRemaining;
    const m = Math.floor(t / 60);
    const s = t % 60;
    el.timerText.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    // Timer urgency classes
    const td = el.timerDisplay;
    td.classList.remove('warning', 'danger', 'critical', 'shake');

    if (t <= 10) {
      td.classList.add('critical', 'shake');
      showTimeWarning(t);
    } else if (t <= 30) {
      td.classList.add('critical', 'shake');
      hideTimeWarning();
    } else if (t <= 60) {
      td.classList.add('critical');
      hideTimeWarning();
    } else if (t <= 300) {
      td.classList.add('danger');
      hideTimeWarning();
    } else if (t <= 600) {
      td.classList.add('warning');
      hideTimeWarning();
    } else {
      hideTimeWarning();
    }
  }

  function showTimeWarning(seconds) {
    el.timeWarningOverlay.classList.add('active');
    el.timeWarningText.textContent = seconds;
  }

  function hideTimeWarning() {
    el.timeWarningOverlay.classList.remove('active');
  }

  // ─── Build Question Navigator ───
  function buildQuestionNav() {
    el.questionNavGrid.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) {
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.textContent = i + 1;
      btn.setAttribute('aria-label', `Go to question ${i + 1}`);
      btn.dataset.index = i;
      btn.addEventListener('click', () => goToQuestion(i));
      el.questionNavGrid.appendChild(btn);
    }
    updateNavGrid();
  }

  function updateNavGrid() {
    const buttons = el.questionNavGrid.querySelectorAll('.nav-btn');
    buttons.forEach((btn, i) => {
      btn.className = 'nav-btn';
      if (i === state.currentQuestion) {
        btn.classList.add('current');
      } else {
        const status = state.questionStatus[i] || 'not-visited';
        btn.classList.add(status === 'not-visited' ? 'not-visited' :
                          status === 'visited'     ? 'visited' :
                          status === 'answered'    ? 'answered' :
                          status === 'marked'      ? 'marked' :
                          status === 'skipped'     ? 'skipped' : 'not-visited');
      }
    });
  }

  // ─── Render Question ───
  function renderQuestion(index) {
    const q = QUIZ_DATA.questions[index];
    if (!q) return;

    // Track time on previous question
    recordQuestionTime();
    state.questionStartTime = Date.now();

    state.currentQuestion = index;

    // Mark as visited if not already further
    if (!state.questionStatus[index] || state.questionStatus[index] === 'not-visited') {
      state.questionStatus[index] = 'visited';
    }

    // Animate card
    el.questionCard.style.animation = 'none';
    // trigger reflow
    void el.questionCard.offsetWidth;
    el.questionCard.style.animation = 'fadeSlideUp 0.45s var(--ease-out)';

    // Question number
    el.questionNum.textContent = String(index + 1).padStart(2, '0');

    // Text
    el.questionText.textContent = q.text;

    // Badges
    el.badgeCategory.textContent = `📚 ${q.category}`;

    el.badgeDifficulty.textContent = q.difficulty === 'easy' ? '🟢 Easy' :
                                     q.difficulty === 'medium' ? '🔥 Medium' : '🔴 Hard';
    el.badgeDifficulty.className = `badge badge-difficulty-${q.difficulty}`;

    el.badgeMarks.textContent = `⭐ ${q.marks} Marks`;
    el.badgeTime.textContent = `⏳ ${q.estimatedTime}s`;

    // Image
    if (q.image) {
      el.questionImageContainer.classList.add('has-image');
      el.imageLoading.style.display = 'flex';
      el.questionImage.style.display = 'none';
      el.questionImage.onload = () => {
        el.imageLoading.style.display = 'none';
        el.questionImage.style.display = 'block';
      };
      el.questionImage.onerror = () => {
        el.questionImageContainer.classList.remove('has-image');
      };
      el.questionImage.src = q.image;
    } else {
      el.questionImageContainer.classList.remove('has-image');
    }

    // Options
    renderOptions(q, index);

    // Update header progress
    el.progressText.textContent = `${index + 1} / ${TOTAL}`;
    const pct = ((index + 1) / TOTAL) * 100;
    el.progressBarFill.style.width = `${pct}%`;

    // Nav, stats
    updateNavGrid();
    updateButtons();
    saveState();
  }

  function renderOptions(q, qIndex) {
    el.optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const isSubmitted = state.submitted[qIndex];

    q.options.forEach((opt, i) => {
      const card = document.createElement('div');
      card.className = 'option-card';
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Option ${letters[i]}: ${opt.text}`);
      card.dataset.optionId = opt.id;

      // If already selected
      if (state.answers[qIndex] === opt.id) {
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');

        if (isSubmitted) {
          if (opt.id === q.correctAnswer) {
            card.classList.remove('selected');
            card.classList.add('correct');
          } else {
            card.classList.remove('selected');
            card.classList.add('wrong');
          }
        }
      }

      // Show correct answer on submitted
      if (isSubmitted && opt.id === q.correctAnswer && state.answers[qIndex] !== opt.id) {
        card.classList.add('correct');
      }

      card.innerHTML = `
        <div class="option-circle"></div>
        <div class="option-letter">${letters[i]}</div>
        <div class="option-text">${opt.text}</div>
      `;

      if (!isSubmitted) {
        card.addEventListener('click', (e) => selectOption(qIndex, opt.id, card, e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectOption(qIndex, opt.id, card, e);
          }
        });
      } else {
        card.style.cursor = 'default';
      }

      el.optionsGrid.appendChild(card);
    });
  }

  function selectOption(qIndex, optionId, cardEl, event) {
    if (state.submitted[qIndex] || state.quizFinished) return;

    // Ripple effect
    createRipple(cardEl, event);

    // Deselect all
    el.optionsGrid.querySelectorAll('.option-card').forEach((c) => {
      c.classList.remove('selected');
      c.setAttribute('aria-checked', 'false');
    });

    // Select this one
    cardEl.classList.add('selected');
    cardEl.setAttribute('aria-checked', 'true');

    state.answers[qIndex] = optionId;
    state.questionStatus[qIndex] = 'answered';

    updateNavGrid();
    updateAllStats();
    saveState();
  }

  function createRipple(element, event) {
    const existing = element.querySelector('.ripple');
    if (existing) existing.remove();

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = element.getBoundingClientRect();

    let x, y;
    if (event && event.clientX) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      x = rect.width / 2;
      y = rect.height / 2;
    }

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // ─── Record Question Time ───
  function recordQuestionTime() {
    const elapsed = (Date.now() - state.questionStartTime) / 1000;
    const prev = state.questionTimes[state.currentQuestion] || 0;
    state.questionTimes[state.currentQuestion] = prev + elapsed;
  }

  // ─── Navigation ───
  function goToQuestion(index) {
    if (index < 0 || index >= TOTAL || index === state.currentQuestion) return;
    renderQuestion(index);
  }

  function goNext() {
    if (state.currentQuestion < TOTAL - 1) {
      goToQuestion(state.currentQuestion + 1);
    }
  }

  function goPrev() {
    if (state.currentQuestion > 0) {
      goToQuestion(state.currentQuestion - 1);
    }
  }

  // ─── Actions ───
  function markForReview() {
    const i = state.currentQuestion;
    if (state.questionStatus[i] === 'marked') {
      state.questionStatus[i] = state.answers[i] !== undefined ? 'answered' : 'visited';
      showToast('Removed from review', 'info');
    } else {
      state.questionStatus[i] = 'marked';
      showToast('Marked for review', 'warning');
    }
    updateNavGrid();
    updateAllStats();
    saveState();
  }

  function clearSelection() {
    const i = state.currentQuestion;
    if (state.submitted[i]) {
      showToast('Cannot clear a submitted answer', 'error');
      return;
    }
    delete state.answers[i];
    state.questionStatus[i] = 'visited';
    renderOptions(QUIZ_DATA.questions[i], i);
    updateNavGrid();
    updateAllStats();
    saveState();
    showToast('Selection cleared', 'info');
  }

  function skipQuestion() {
    const i = state.currentQuestion;
    if (state.submitted[i]) { goNext(); return; }
    state.questionStatus[i] = 'skipped';
    updateNavGrid();
    updateAllStats();
    saveState();
    showToast('Question skipped', 'warning');
    goNext();
  }

  function submitAnswer() {
    const i = state.currentQuestion;
    if (state.submitted[i]) {
      showToast('Already submitted', 'info');
      return;
    }
    if (state.answers[i] === undefined) {
      showToast('Please select an answer first', 'error');
      return;
    }

    const q = QUIZ_DATA.questions[i];
    const isCorrect = state.answers[i] === q.correctAnswer;
    state.submitted[i] = true;

    // Track time for achievements
    const timeSpent = (state.questionTimes[i] || 0) + ((Date.now() - state.questionStartTime) / 1000);
    state.questionTimes[i] = timeSpent;
    state.questionStartTime = Date.now();

    if (isCorrect) {
      state.correctCount++;
      state.score += q.marks;
      showToast(`Correct! +${q.marks} points`, 'success');
      if (timeSpent < 30) state.fastAnswers++;
      if (timeSpent < 20) state.speedAnswers++;
    } else {
      state.wrongCount++;
      state.score -= QUIZ_DATA.negativeMarking;
      if (state.score < 0) state.score = 0;
      showToast(`Wrong! -${QUIZ_DATA.negativeMarking} point`, 'error');
    }

    state.questionStatus[i] = 'answered';
    renderOptions(q, i);
    updateNavGrid();
    updateAllStats();
    checkAchievements();
    saveState();
  }

  // ─── Submit Quiz ───
  function finishQuiz() {
    const answered = Object.keys(state.submitted).length;
    const unanswered = TOTAL - answered;

    showModal({
      icon: '🏁',
      iconClass: 'info',
      title: 'Submit Quiz?',
      desc: `You have answered ${answered} of ${TOTAL} questions.${unanswered > 0 ? ` ${unanswered} questions are unanswered and will not be scored.` : ''} Are you sure you want to finish?`,
      actions: [
        { text: 'Cancel', class: 'btn-ghost', handler: closeModal },
        { text: 'Submit Quiz', class: 'btn-primary', handler: () => { closeModal(); doFinishQuiz(); } },
      ],
    });
  }

  function doFinishQuiz() {
    clearInterval(state.timerInterval);
    state.quizFinished = true;

    // Submit all unanswered
    for (let i = 0; i < TOTAL; i++) {
      if (!state.submitted[i] && state.answers[i] !== undefined) {
        const q = QUIZ_DATA.questions[i];
        const isCorrect = state.answers[i] === q.correctAnswer;
        state.submitted[i] = true;
        if (isCorrect) {
          state.correctCount++;
          state.score += q.marks;
        } else {
          state.wrongCount++;
          state.score -= QUIZ_DATA.negativeMarking;
        }
      }
    }
    if (state.score < 0) state.score = 0;

    const maxScore = QUIZ_DATA.questions.reduce((s, q) => s + q.marks, 0);
    const pct = Math.round((state.score / maxScore) * 100);

    showModal({
      icon: '🏆',
      iconClass: 'success',
      title: 'Quiz Completed!',
      desc: `You scored ${state.score} out of ${maxScore} (${pct}%).\n\nCorrect: ${state.correctCount}  |  Wrong: ${state.wrongCount}  |  Skipped: ${TOTAL - state.correctCount - state.wrongCount}`,
      actions: [
        { text: 'Review Answers', class: 'btn-ghost', handler: () => { closeModal(); state.quizFinished = false; renderQuestion(0); state.quizFinished = true; } },
        { text: 'Close', class: 'btn-primary', handler: () => { closeModal(); } },
      ],
    });

    checkAchievements();
    updateAllStats();
    saveState();
    localStorage.removeItem('quizverse_state');
  }

  function autoSubmitQuiz() {
    hideTimeWarning();
    showModal({
      icon: '⏰',
      iconClass: 'danger',
      title: 'Time\'s Up!',
      desc: 'The quiz time has expired. Your answers will be submitted automatically.',
      actions: [
        { text: 'View Results', class: 'btn-primary', handler: () => { closeModal(); doFinishQuiz(); } },
      ],
    });
  }

  function exitQuiz() {
    showModal({
      icon: '⚠️',
      iconClass: 'warning',
      title: 'Exit Quiz?',
      desc: 'Your progress will be saved. You can resume later if the quiz is still active.',
      actions: [
        { text: 'Continue Quiz', class: 'btn-ghost', handler: closeModal },
        { text: 'Exit', class: 'btn-danger', handler: () => { closeModal(); saveState(); showToast('Quiz progress saved', 'info'); } },
      ],
    });
  }

  // ─── Buttons State ───
  function updateButtons() {
    el.prevBtn.disabled = state.currentQuestion === 0;
    el.nextBtn.disabled = state.currentQuestion === TOTAL - 1;

    const i = state.currentQuestion;
    const isSubmitted = state.submitted[i];

    if (isSubmitted) {
      el.submitAnswerBtn.disabled = true;
      el.clearBtn.disabled = true;
      el.markReviewBtn.disabled = true;
    } else {
      el.submitAnswerBtn.disabled = false;
      el.clearBtn.disabled = false;
      el.markReviewBtn.disabled = false;
    }

    if (state.quizFinished) {
      el.submitAnswerBtn.disabled = true;
      el.clearBtn.disabled = true;
      el.markReviewBtn.disabled = true;
      el.skipBtn.disabled = true;
      el.submitQuizBtn.disabled = true;
    }
  }

  // ─── Stats Updates ───
  function updateAllStats() {
    const answered  = Object.values(state.questionStatus).filter(s => s === 'answered').length;
    const skipped   = Object.values(state.questionStatus).filter(s => s === 'skipped').length;
    const review    = Object.values(state.questionStatus).filter(s => s === 'marked').length;
    const remaining = TOTAL - answered;
    const submittedCount = Object.keys(state.submitted).length;

    // Sidebar progress stats
    el.statAnswered.textContent = answered;
    el.statRemaining.textContent = remaining;
    el.statSkipped.textContent = skipped;
    el.statReview.textContent = review;

    // Progress ring
    const pct = Math.round((answered / TOTAL) * 100);
    el.progressPercent.textContent = `${pct}%`;
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * pct / 100);
    el.progressRing.style.strokeDashoffset = offset;

    // Info section
    el.infoScore.textContent = state.score;
    el.infoAnswered.textContent = `${submittedCount}/${TOTAL}`;
    el.infoNegative.textContent = state.wrongCount > 0 ? `-${state.wrongCount * QUIZ_DATA.negativeMarking}` : '0';

    // Live stats
    const accuracy = submittedCount > 0 ? Math.round((state.correctCount / submittedCount) * 100) : 0;
    const attempt = Math.round((submittedCount / TOTAL) * 100);
    const progress = pct;

    // Average time
    const times = Object.values(state.questionTimes).filter(t => t > 0);
    const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

    animateCounter(el.statAccuracy, accuracy, '%');
    animateCounter(el.statAttempt, attempt, '%');
    el.statSpeed.textContent = avgTime > 0 ? `${avgTime}s` : '—';
    animateCounter(el.statProgress, progress, '%');

    el.barAccuracy.style.width = `${accuracy}%`;
    el.barAttempt.style.width = `${attempt}%`;
    el.barSpeed.style.width = `${Math.min(100, (avgTime / 120) * 100)}%`;
    el.barProgress.style.width = `${progress}%`;

    updateButtons();
  }

  function animateCounter(element, targetValue, suffix) {
    const current = parseInt(element.textContent) || 0;
    if (current === targetValue) { element.textContent = `${targetValue}${suffix}`; return; }

    const step = targetValue > current ? 1 : -1;
    const duration = 300;
    const steps = Math.abs(targetValue - current);
    const interval = Math.max(duration / steps, 16);
    let val = current;

    const timer = setInterval(() => {
      val += step;
      element.textContent = `${val}${suffix}`;
      if (val === targetValue) clearInterval(timer);
    }, interval);
  }

  // ─── Achievements ───
  function checkAchievements() {
    const submittedCount = Object.keys(state.submitted).length;

    if (state.fastAnswers >= 3 && !state.achievements.fast) {
      state.achievements.fast = true;
      unlockAchievement('fast', '🔥 Fast Learner unlocked!');
    }
    if (state.speedAnswers >= 5 && !state.achievements.speed) {
      state.achievements.speed = true;
      unlockAchievement('speed', '⚡ Speed Master unlocked!');
    }
    if (submittedCount >= 5) {
      const acc = state.correctCount / submittedCount;
      if (acc >= 0.8 && !state.achievements.accurate) {
        state.achievements.accurate = true;
        unlockAchievement('accurate', '🎯 Accurate unlocked!');
      }
    }

    const maxScore = QUIZ_DATA.questions.reduce((s, q) => s + q.marks, 0);
    if (state.score / maxScore >= 0.75 && !state.achievements.top) {
      state.achievements.top = true;
      unlockAchievement('top', '🏆 Top Performer unlocked!');
    }

    // Update UI
    Object.keys(state.achievements).forEach(key => {
      const el = document.querySelector(`.achievement[data-name="${key}"]`);
      if (el) {
        if (state.achievements[key]) {
          el.classList.add('unlocked');
        } else {
          el.classList.remove('unlocked');
        }
      }
    });
  }

  function unlockAchievement(name, message) {
    showToast(message, 'success');
  }

  // ─── Modal ───
  function showModal({ icon, iconClass, title, desc, actions }) {
    el.modalIcon.textContent = icon;
    el.modalIcon.className = `modal-icon ${iconClass}`;
    el.modalTitle.textContent = title;
    el.modalDesc.textContent = desc;
    el.modalActions.innerHTML = '';

    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = `btn ${action.class}`;
      btn.innerHTML = `<span class="btn-text">${action.text}</span>`;
      btn.addEventListener('click', action.handler);
      el.modalActions.appendChild(btn);
    });

    el.modalOverlay.classList.add('active');
    el.modalOverlay.setAttribute('aria-hidden', 'false');

    // Trap focus
    setTimeout(() => {
      const firstBtn = el.modalActions.querySelector('.btn');
      if (firstBtn) firstBtn.focus();
    }, 100);
  }

  function closeModal() {
    el.modalOverlay.classList.remove('active');
    el.modalOverlay.setAttribute('aria-hidden', 'true');
  }

  // ─── Toast ───
  function showToast(message, type = 'info') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3500);
  }

  // ─── Theme ───
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    el.themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
    try { localStorage.setItem('quizverse_theme', next); } catch (e) { /* noop */ }
  }

  function applyTheme() {
    try {
      const theme = localStorage.getItem('quizverse_theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        el.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
    } catch (e) { /* noop */ }
  }

  // ─── Fullscreen ───
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // ─── Sidebar Toggle ───
  function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    el.rightSidebar.classList.toggle('open', state.sidebarOpen);
    el.sidebarBackdrop.classList.toggle('active', state.sidebarOpen);
  }

  function closeSidebar() {
    state.sidebarOpen = false;
    el.rightSidebar.classList.remove('open');
    el.sidebarBackdrop.classList.remove('active');
  }

  // ─── Lightbox ───
  function openLightbox() {
    const src = el.questionImage.src;
    if (!src) return;
    el.lightboxImage.src = src;
    el.lightbox.classList.add('active');
  }

  function closeLightbox() {
    el.lightbox.classList.remove('active');
  }

  // ─── Event Bindings ───
  function bindEvents() {
    // Navigation
    el.prevBtn.addEventListener('click', goPrev);
    el.nextBtn.addEventListener('click', goNext);

    // Actions
    el.markReviewBtn.addEventListener('click', markForReview);
    el.clearBtn.addEventListener('click', clearSelection);
    el.skipBtn.addEventListener('click', skipQuestion);
    el.submitAnswerBtn.addEventListener('click', submitAnswer);
    el.submitQuizBtn.addEventListener('click', finishQuiz);

    // Header
    el.fullscreenBtn.addEventListener('click', toggleFullscreen);
    el.themeToggle.addEventListener('click', toggleTheme);
    el.exitQuizBtn.addEventListener('click', exitQuiz);

    // Sidebar
    el.sidebarToggle.addEventListener('click', toggleSidebar);
    el.sidebarBackdrop.addEventListener('click', closeSidebar);

    // Lightbox
    el.imageZoomBtn.addEventListener('click', openLightbox);
    el.questionImageContainer.addEventListener('click', (e) => {
      if (e.target === el.questionImage) openLightbox();
    });
    el.lightbox.addEventListener('click', (e) => {
      if (e.target === el.lightbox || e.target === el.lightboxImage) closeLightbox();
    });
    el.lightboxClose.addEventListener('click', closeLightbox);

    // Modal close on Escape
    el.modalOverlay.addEventListener('click', (e) => {
      if (e.target === el.modalOverlay) closeModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
  }

  function handleKeyboard(e) {
    // Don't handle if modal is open
    if (el.modalOverlay.classList.contains('active')) {
      if (e.key === 'Escape') { closeModal(); e.preventDefault(); }
      return;
    }

    if (el.lightbox.classList.contains('active')) {
      if (e.key === 'Escape') { closeLightbox(); e.preventDefault(); }
      return;
    }

    // Don't intercept when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'p':
      case 'P':
        e.preventDefault();
        goPrev();
        break;
      case 'ArrowRight':
      case 'n':
      case 'N':
        e.preventDefault();
        goNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateOptions(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateOptions(1);
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        markForReview();
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        clearSelection();
        break;
      case 'Enter':
        e.preventDefault();
        submitAnswer();
        break;
      case ' ':
        e.preventDefault();
        // Select currently focused option
        const focused = document.activeElement;
        if (focused && focused.classList.contains('option-card')) {
          focused.click();
        }
        break;
      case '1': case '2': case '3': case '4':
        e.preventDefault();
        selectOptionByIndex(parseInt(e.key) - 1);
        break;
      case 'a': case 'A':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          selectOptionByIndex(0);
        }
        break;
      case 'b': case 'B':
        e.preventDefault();
        selectOptionByIndex(1);
        break;
      case 'd': case 'D':
        e.preventDefault();
        selectOptionByIndex(3);
        break;
      case 'Escape':
        e.preventDefault();
        closeSidebar();
        break;
      case 'F11':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  }

  function navigateOptions(direction) {
    const cards = Array.from(el.optionsGrid.querySelectorAll('.option-card'));
    if (cards.length === 0) return;

    const focused = document.activeElement;
    let currentIndex = cards.indexOf(focused);

    if (currentIndex === -1) {
      cards[0].focus();
    } else {
      const newIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
      cards[newIndex].focus();
    }
  }

  function selectOptionByIndex(index) {
    const cards = el.optionsGrid.querySelectorAll('.option-card');
    if (index >= 0 && index < cards.length) {
      cards[index].click();
    }
  }

  // ─── Start ───
  document.addEventListener('DOMContentLoaded', init);

})();
