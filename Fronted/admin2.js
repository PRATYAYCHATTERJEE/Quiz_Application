document.addEventListener('DOMContentLoaded', () => {
  const pageTitle = document.getElementById('page-title');
  const pageContent = document.getElementById('page-content');
  const navItems = Array.from(document.querySelectorAll('.nav-item[data-page]'));

  const pageTitles = {
    dashboard: 'Dashboard',
    participants: 'Participants',
    questions: 'Questions',
    'create-question': 'Create Question',
    leaderboard: 'Leaderboard',
    analytics: 'Analytics',
    settings: 'Settings'
  };

  const pageTemplates = {
    dashboard: document.getElementById('template-dashboard'),
    participants: document.getElementById('template-participants'),
    questions: document.getElementById('template-questions'),
    'create-question': document.getElementById('template-create-question'),
    leaderboard: document.getElementById('template-leaderboard'),
    analytics: document.getElementById('template-analytics'),
    settings: document.getElementById('template-settings')
  };

  const normalizePage = (value) => {
    if (typeof value !== 'string') {
      return 'dashboard';
    }

    const trimmedValue = value.trim();
    return trimmedValue || 'dashboard';
  };

  const setActiveNavItem = (page) => {
    if (!navItems.length) {
      return;
    }

    navItems.forEach((item) => {
      const isActive = item.getAttribute('data-page') === page;
      item.classList.toggle('active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  };

  const attachQuestionFormHandlers = () => {
    const form = document.getElementById('addQuestionForm');
    if (!form) return;

    const uploadArea = document.getElementById('uploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const finishBtn = document.getElementById('finishBtn');

    const errorElements = {
      questionDesc: document.getElementById('questionDescError'),
      optionA: document.getElementById('optionAError'),
      optionB: document.getElementById('optionBError'),
      optionC: document.getElementById('optionCError'),
      optionD: document.getElementById('optionDError'),
      correctAnswer: document.getElementById('correctAnswerError'),
      category: document.getElementById('categoryError'),
      difficulty: document.getElementById('difficultyError'),
      marks: document.getElementById('marksError')
    };

    const clearErrors = () => {
      Object.values(errorElements).forEach((el) => {
        if (el) el.textContent = '';
      });
    };

    const validateForm = () => {
      clearErrors();
      let isValid = true;

      const questionDesc = document.getElementById('questionDesc').value.trim();
      if (!questionDesc) {
        if (errorElements.questionDesc) {
          errorElements.questionDesc.textContent = 'Question description is required.';
        }
        isValid = false;
      }

      const optionA = document.getElementById('optionA').value.trim();
      if (!optionA) {
        if (errorElements.optionA) {
          errorElements.optionA.textContent = 'Option A is required.';
        }
        isValid = false;
      }

      const optionB = document.getElementById('optionB').value.trim();
      if (!optionB) {
        if (errorElements.optionB) {
          errorElements.optionB.textContent = 'Option B is required.';
        }
        isValid = false;
      }

      const optionC = document.getElementById('optionC').value.trim();
      if (!optionC) {
        if (errorElements.optionC) {
          errorElements.optionC.textContent = 'Option C is required.';
        }
        isValid = false;
      }

      const optionD = document.getElementById('optionD').value.trim();
      if (!optionD) {
        if (errorElements.optionD) {
          errorElements.optionD.textContent = 'Option D is required.';
        }
        isValid = false;
      }

      const correctAnswer = document.getElementById('correctAnswer').value;
      if (!correctAnswer) {
        if (errorElements.correctAnswer) {
          errorElements.correctAnswer.textContent = 'Please select a correct answer.';
        }
        isValid = false;
      }

      const category = document.getElementById('category').value;
      if (!category) {
        if (errorElements.category) {
          errorElements.category.textContent = 'Please select a category.';
        }
        isValid = false;
      }

      const difficulty = document.getElementById('difficulty').value;
      if (!difficulty) {
        if (errorElements.difficulty) {
          errorElements.difficulty.textContent = 'Please select a difficulty level.';
        }
        isValid = false;
      }

      const marks = parseInt(document.getElementById('marks').value, 10);
      if (!marks || marks <= 0) {
        if (errorElements.marks) {
          errorElements.marks.textContent = 'Marks must be greater than zero.';
        }
        isValid = false;
      }

      return isValid;
    };

    // Image upload handling
    if (uploadArea && imageUpload) {
      uploadArea.addEventListener('click', () => imageUpload.click());

      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'rgba(124, 92, 255, 0.16)';
      });

      uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.background = 'rgba(124, 92, 255, 0.06)';
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'rgba(124, 92, 255, 0.06)';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          imageUpload.files = files;
          handleImageUpload();
        }
      });

      imageUpload.addEventListener('change', handleImageUpload);
    }

    function handleImageUpload() {
      const file = imageUpload.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
          imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    }

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const questionData = {
        description: document.getElementById('questionDesc').value,
        optionA: document.getElementById('optionA').value,
        optionB: document.getElementById('optionB').value,
        optionC: document.getElementById('optionC').value,
        optionD: document.getElementById('optionD').value,
        correctAnswer: document.getElementById('correctAnswer').value,
        category: document.getElementById('category').value,
        difficulty: document.getElementById('difficulty').value,
        marks: document.getElementById('marks').value,
        explanation: document.getElementById('explanation').value,
        image: imageUpload.files.length > 0 ? imageUpload.files[0].name : null
      };

      console.log('Question added:', questionData);
      alert('Question added successfully! You can add more questions or click "Finish & Continue".');

      // Reset form
      form.reset();
      imagePreview.classList.add('hidden');
      clearErrors();
    });

    // Finish & Continue button
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        console.log('Redirecting to review quiz page...');
        window.location.href = 'review-quiz.html';
      });
    }
  };

  const renderPage = (page) => {
    const safePage = normalizePage(page);

    if (pageTitle) {
      pageTitle.textContent = pageTitles[safePage] || 'Dashboard';
    }

    document.title = `QuizVerse | ${pageTitles[safePage] || 'Dashboard'}`;

    if (pageContent) {
      pageContent.innerHTML = '';

      const template = pageTemplates[safePage];
      if (template && template.content) {
        const fragment = template.content.cloneNode(true);
        pageContent.appendChild(fragment);

        // Attach form handlers after template is rendered
        if (safePage === 'create-question') {
          setTimeout(() => attachQuestionFormHandlers(), 0);
        }
      } else {
        pageContent.innerHTML = '<div class="panel"><p>Content is unavailable for this page.</p></div>';
      }
    }

    setActiveNavItem(safePage);

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${safePage}`);
    }
  };

  const getInitialPage = () => {
    const hashValue = window.location.hash.replace('#', '');
    return normalizePage(hashValue || 'dashboard');
  };

  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedPage = normalizePage(item.getAttribute('data-page'));
      renderPage(selectedPage);
    });
  });

  window.addEventListener('hashchange', () => {
    renderPage(getInitialPage());
  });

  renderPage(getInitialPage());
});
