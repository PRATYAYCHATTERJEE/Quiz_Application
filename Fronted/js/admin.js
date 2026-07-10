/**
 * QuizVerse - Admin Dashboard JavaScript
 * Interactive SPA controls, Charts, CRUD, and Mock Database
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize general UI systems
  ParticleSystem.init('particle-canvas');
  LoadingScreen.hide(800);

  // =========================================
  // Mock Database
  // =========================================
  const MOCK_DB = {
    admin: {
      name: 'Elena Rostova',
      email: 'admin@quizverse.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
      role: 'Super Administrator'
    },
    
    questions: [
      {
        id: 'q-1',
        text: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correct: 1, // Stack
        category: 'Data Structures',
        difficulty: 'easy',
        marks: 10,
        explanation: 'A stack is a linear data structure in which elements can be inserted or deleted only from one end, called the top, following LIFO.'
      },
      {
        id: 'q-2',
        text: 'What is the time complexity of searching in a Balanced Binary Search Tree?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correct: 2, // O(log n)
        category: 'Algorithms',
        difficulty: 'medium',
        marks: 15,
        explanation: 'In a balanced BST (like AVL or Red-Black trees), the height of the tree is bounded by log n, meaning search operations take O(log n) time.'
      },
      {
        id: 'q-3',
        text: 'Which protocol operates at the Application Layer of the OSI Model?',
        options: ['TCP', 'IP', 'HTTP', 'UDP'],
        correct: 3, // HTTP
        category: 'Networking',
        difficulty: 'easy',
        marks: 10,
        explanation: 'HTTP (Hypertext Transfer Protocol) is an application layer protocol used for transmitting hypermedia documents.'
      },
      {
        id: 'q-4',
        text: 'In database management, what does ACID stand for?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integration, Design',
          'Association, Collection, Indexing, Delivery',
          'Atomicity, Concurrency, Isolation, Distribution'
        ],
        correct: 0, // Atomicity...
        category: 'Databases',
        difficulty: 'medium',
        marks: 15,
        explanation: 'ACID represents key database transaction properties: Atomicity (all or nothing), Consistency (valid state), Isolation (independent transactions), and Durability (persistence).'
      },
      {
        id: 'q-5',
        text: 'Which JavaScript mechanism allows variables to be accessed before their declaration in code?',
        options: ['Hoisting', 'Closures', 'Bubbling', 'Shadowing'],
        correct: 0, // Hoisting
        category: 'JavaScript',
        difficulty: 'medium',
        marks: 10,
        explanation: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of the current scope before code execution.'
      },
      {
        id: 'q-6',
        text: 'What is the primary purpose of the Docker Engine?',
        options: ['Code Versioning', 'Container Virtualization', 'Database Caching', 'DNS Routing'],
        correct: 1, // Container Virtualization
        category: 'DevOps',
        difficulty: 'hard',
        marks: 20,
        explanation: 'Docker engine is the core containerization technology that packages, runs, and distributes software applications in isolated containers.'
      }
    ],

    participants: [
      { rank: 1, name: 'Nova Prime', email: 'nova.prime@galaxy.io', score: 98, correct: 9, wrong: 1, accuracy: 90, time: 245, status: 'completed' },
      { rank: 2, name: 'Cortex.AI', email: 'cortex@cyber.net', score: 95, correct: 9, wrong: 1, accuracy: 90, time: 280, status: 'completed' },
      { rank: 3, name: 'Cipher Hacker', email: 'cipher@darknet.org', score: 92, correct: 9, wrong: 1, accuracy: 90, time: 310, status: 'completed' },
      { rank: 4, name: 'Neo Anderson', email: 'neo@matrix.sys', score: 88, correct: 8, wrong: 2, accuracy: 80, time: 190, status: 'completed' },
      { rank: 5, name: 'Trinity V', email: 'trinity@zion.org', score: 85, correct: 8, wrong: 2, accuracy: 80, time: 220, status: 'completed' },
      { rank: 6, name: 'Alex Mercer', email: 'mercer@gentek.com', score: 80, correct: 8, wrong: 2, accuracy: 80, time: 340, status: 'completed' },
      { rank: 7, name: 'Zack Fair', email: 'zack@soldier.shinra', score: 75, correct: 7, wrong: 3, accuracy: 70, time: 275, status: 'completed' },
      { rank: 8, name: 'Selene Moon', email: 'selene@underworld.org', score: 70, correct: 7, wrong: 3, accuracy: 70, time: 360, status: 'completed' },
      { rank: 9, name: 'Marcus Fenix', email: 'fenix@cog.mil', score: 65, correct: 6, wrong: 4, accuracy: 60, time: 420, status: 'completed' },
      { rank: 10, name: 'Aria T\'Loak', email: 'aria@omega.station', score: 60, correct: 6, wrong: 4, accuracy: 60, time: 405, status: 'completed' },
      { rank: 11, name: 'Lara Croft', email: 'lara@croftmanor.co.uk', score: 55, correct: 5, wrong: 5, accuracy: 50, time: 380, status: 'completed' },
      { rank: 12, name: 'Gordon Freeman', email: 'freeman@blackmesa.org', score: 0, correct: 0, wrong: 0, accuracy: 0, time: 45, status: 'active' },
      { rank: 13, name: 'Jill Valentine', email: 'jill@stars.rpd', score: 0, correct: 0, wrong: 0, accuracy: 0, time: 10, status: 'active' }
    ],

    categories: ['Data Structures', 'Algorithms', 'Networking', 'Databases', 'JavaScript', 'DevOps']
  };

  // =========================================
  // SPA Page Routing System
  // =========================================
  const state = {
    currentTab: 'dashboard',
    participants: {
      search: '',
      statusFilter: 'all',
      sortBy: 'rank',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 5
    },
    questions: {
      search: '',
      categoryFilter: 'all',
      difficultyFilter: 'all'
    },
    leaderboard: {
      search: '',
      accuracyFilter: 'all'
    },
    activeEditQuestionId: null,
    activeDeleteQuestionId: null,
    activeDeleteParticipantEmail: null,
    tempUploadedImage: null
  };

  // Switch sections
  function switchView(tabName) {
    if (tabName === 'logout') {
      LoadingScreen.show();
      Toast.info('Logging out of QuizVerse...', '👋 Logout');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
      return;
    }

    const currentSection = document.getElementById(`${state.currentTab}-section`);
    const targetSection = document.getElementById(`${tabName}-section`);

    if (!targetSection) return;

    // Sidebar Active Item highlights
    document.querySelectorAll('.menu-item').forEach(el => {
      if (el.getAttribute('data-tab') === tabName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Mobile Navigation Highlights
    document.querySelectorAll('.mobile-nav-item').forEach(el => {
      if (el.getAttribute('data-tab') === tabName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Animate transition using GSAP if loaded, otherwise direct class swap
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      
      if (currentSection) {
        tl.to(currentSection, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          onComplete: () => {
            currentSection.style.display = 'none';
          }
        });
      }

      tl.set(targetSection, { display: 'block', opacity: 0, y: 10 })
        .to(targetSection, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out'
        });
    } else {
      if (currentSection) currentSection.style.display = 'none';
      targetSection.style.display = 'block';
    }

    state.currentTab = tabName;
    
    // Trigger tab-specific loaders/renderers
    onTabLoaded(tabName);
  }

  function onTabLoaded(tabName) {
    // Scroll content to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    switch (tabName) {
      case 'dashboard':
        renderDashboardStats();
        initDashboardCharts();
        break;
      case 'participants':
        renderParticipantsTable();
        break;
      case 'questions':
        renderQuestionsGrid();
        populateCategoriesFilterDropdown();
        break;
      case 'create-question':
        resetCreateQuestionForm();
        break;
      case 'leaderboard':
        renderLeaderboard();
        break;
      case 'analytics':
        initAnalyticsCharts();
        renderAnalyticsStats();
        break;
      case 'settings':
        renderSettingsProfile();
        break;
    }
  }

  // Bind sidebars and navigation links
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = el.getAttribute('data-tab');
      switchView(tabName);
      
      // Close mobile sidebar on navigation
      document.getElementById('sidebar').classList.remove('mobile-open');
    });
  });

  // Hamburger Toggle Menu
  const burgerMenuBtn = document.getElementById('burger-menu-btn');
  if (burgerMenuBtn) {
    burgerMenuBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('mobile-open');
    });
  }

  // =========================================
  // Rendering Views
  // =========================================

  // ---- Tab: Dashboard Overview ----
  let dashboardChartInstance = null;

  function renderDashboardStats() {
    const totalParticipants = MOCK_DB.participants.length;
    const totalQuestions = MOCK_DB.questions.length;
    const activeParticipants = MOCK_DB.participants.filter(p => p.status === 'active').length;
    const scores = MOCK_DB.participants.filter(p => p.status === 'completed').map(p => p.score);
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const maxScore = scores.length ? Math.max(...scores) : 0;
    const todayCount = MOCK_DB.participants.length - 3; // Mock today's signup count

    animateStatCounter('dash-total-participants', totalParticipants, '+');
    animateStatCounter('dash-total-questions', totalQuestions);
    animateStatCounter('dash-active-quiz', activeParticipants);
    animateStatCounter('dash-avg-score', avgScore, '%');
    animateStatCounter('dash-highest-score', maxScore, '%');
    animateStatCounter('dash-today-participants', todayCount, '+');
  }

  function animateStatCounter(elementId, targetValue, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (typeof CounterAnimation !== 'undefined') {
      CounterAnimation.animate(el, targetValue, 1200, '', suffix);
    } else {
      el.textContent = targetValue + suffix;
    }
  }

  function initDashboardCharts() {
    const canvas = document.getElementById('dashboard-overview-chart');
    if (!canvas) return;

    if (dashboardChartInstance) {
      dashboardChartInstance.destroy();
    }

    // Chart.js initialization
    const ctx = canvas.getContext('2d');
    dashboardChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'],
        datasets: [{
          label: 'Active Participants',
          data: [12, 45, 78, 55, 90, 110, 85],
          borderColor: '#00E5FF',
          backgroundColor: 'rgba(0, 229, 255, 0.08)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#00E5FF',
          pointHoverRadius: 6
        }, {
          label: 'Quizzes Completed',
          data: [5, 20, 50, 42, 68, 85, 72],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#8B5CF6',
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: 'rgba(255, 255, 255, 0.7)', font: { family: 'Outfit', size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Outfit', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Outfit', size: 10 } }
          }
        }
      }
    });
  }

  // ---- Tab: Participants Table ----
  function renderParticipantsTable() {
    const tableBody = document.getElementById('participants-table-body');
    if (!tableBody) return;

    // Filter logic
    let list = [...MOCK_DB.participants];
    
    // Search Filter
    if (state.participants.search) {
      const q = state.participants.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
    }

    // Status Filter
    if (state.participants.statusFilter !== 'all') {
      list = list.filter(p => p.status === state.participants.statusFilter);
    }

    // Sorting logic
    list.sort((a, b) => {
      let valA = a[state.participants.sortBy];
      let valB = b[state.participants.sortBy];
      
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return state.participants.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return state.participants.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination logic
    const totalItems = list.length;
    const totalPages = Math.ceil(totalItems / state.participants.itemsPerPage);
    const startIdx = (state.participants.currentPage - 1) * state.participants.itemsPerPage;
    const paginatedList = list.slice(startIdx, startIdx + state.participants.itemsPerPage);

    // Update Pagination controls info
    const infoText = document.getElementById('participants-pagination-info');
    if (infoText) {
      const endCount = Math.min(startIdx + state.participants.itemsPerPage, totalItems);
      infoText.textContent = totalItems > 0 
        ? `Showing ${startIdx + 1} to ${endCount} of ${totalItems} participants`
        : 'No participants found';
    }

    const prevBtn = document.getElementById('participants-prev-btn');
    const nextBtn = document.getElementById('participants-next-btn');
    if (prevBtn) prevBtn.disabled = state.participants.currentPage === 1;
    if (nextBtn) nextBtn.disabled = state.participants.currentPage >= totalPages || totalPages === 0;

    // HTML Output
    tableBody.innerHTML = '';
    
    if (paginatedList.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: var(--space-8); color: var(--color-text-muted);">
            <i class="fas fa-search" style="font-size: 24px; margin-bottom: 8px;"></i>
            <p>No matching participants found.</p>
          </td>
        </tr>
      `;
      return;
    }

    paginatedList.forEach(p => {
      const initials = p.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="rank-badge ${p.rank <= 3 ? 'rank-' + p.rank : 'rank-normal'}">${p.rank}</span></td>
        <td>
          <div class="user-identity">
            <div class="user-avatar">${initials}</div>
            <div class="user-details">
              <span class="user-name">${p.name}</span>
              <span class="user-email">${p.email}</span>
            </div>
          </div>
        </td>
        <td><span style="font-family: var(--font-mono); font-weight: 700;">${p.score}%</span></td>
        <td style="color: var(--color-success); font-weight: 600;">${p.correct}</td>
        <td style="color: var(--color-error); font-weight: 600;">${p.wrong}</td>
        <td>
          <div style="display:flex;align-items:center;gap:6px;">
            <div style="width:50px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">
              <div style="width:${p.accuracy}%;height:100%;background:linear-gradient(90deg, #8B5CF6, #00E5FF);"></div>
            </div>
            <span>${p.accuracy}%</span>
          </div>
        </td>
        <td style="font-family: var(--font-mono);">${Format.time(p.time)}</td>
        <td><span class="badge-status ${p.status}">${p.status}</span></td>
        <td>
          <div class="actions-cell">
            <button class="action-btn btn-view" title="View Score Summary" data-email="${p.email}"><i class="fas fa-eye"></i></button>
            <button class="action-btn btn-delete" title="Remove Record" data-email="${p.email}"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      `;

      // Event handlers inside table cells
      tr.querySelector('.btn-view').addEventListener('click', () => openScoreDetailsModal(p));
      tr.querySelector('.btn-delete').addEventListener('click', () => {
        state.activeDeleteParticipantEmail = p.email;
        openModal('delete-participant-modal');
      });

      tableBody.appendChild(tr);
    });
  }

  // Setup filters & sorting on participants
  const partSearchInput = document.getElementById('part-search-input');
  if (partSearchInput) {
    partSearchInput.addEventListener('input', (e) => {
      state.participants.search = e.target.value;
      state.participants.currentPage = 1;
      renderParticipantsTable();
    });
  }

  const partFilterStatus = document.getElementById('part-filter-status');
  if (partFilterStatus) {
    partFilterStatus.addEventListener('change', (e) => {
      state.participants.statusFilter = e.target.value;
      state.participants.currentPage = 1;
      renderParticipantsTable();
    });
  }

  const partSortSelect = document.getElementById('part-sort-select');
  if (partSortSelect) {
    partSortSelect.addEventListener('change', (e) => {
      state.participants.sortBy = e.target.value;
      renderParticipantsTable();
    });
  }

  document.getElementById('participants-prev-btn')?.addEventListener('click', () => {
    if (state.participants.currentPage > 1) {
      state.participants.currentPage--;
      renderParticipantsTable();
    }
  });

  document.getElementById('participants-next-btn')?.addEventListener('click', () => {
    state.participants.currentPage++;
    renderParticipantsTable();
  });

  document.getElementById('btn-export-participants-csv')?.addEventListener('click', () => {
    Toast.success('Generating and downloading CSV file...', '📊 Export CSV');
    downloadParticipantsCSV();
  });

  // Export CSV download simulator
  function downloadParticipantsCSV() {
    let csv = 'Rank,Name,Email,Score,Correct,Wrong,Accuracy,Time Taken,Status\n';
    MOCK_DB.participants.forEach(p => {
      csv += `${p.rank},"${p.name}","${p.email}",${p.score},${p.correct},${p.wrong},${p.accuracy},"${Format.time(p.time)}","${p.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'quizverse_participants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ---- Tab: Questions Manager ----
  function renderQuestionsGrid() {
    const grid = document.getElementById('questions-grid-container');
    if (!grid) return;

    let list = [...MOCK_DB.questions];

    // Search filter
    if (state.questions.search) {
      const q = state.questions.search.toLowerCase();
      list = list.filter(item => item.text.toLowerCase().includes(q));
    }

    // Category filter
    if (state.questions.categoryFilter !== 'all') {
      list = list.filter(item => item.category === state.questions.categoryFilter);
    }

    // Difficulty filter
    if (state.questions.difficultyFilter !== 'all') {
      list = list.filter(item => item.difficulty === state.questions.difficultyFilter);
    }

    grid.innerHTML = '';

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: var(--space-12); color: var(--color-text-muted);">
          <i class="fas fa-folder-open" style="font-size: 36px; margin-bottom: 12px; color: rgba(255,255,255,0.15)"></i>
          <p style="font-size: var(--text-base); font-weight: 600;">No questions found matching the criteria.</p>
          <button class="btn btn-primary shimmer-btn" style="margin-top: var(--space-4);" id="btn-reset-filters">Reset Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        state.questions.search = '';
        state.questions.categoryFilter = 'all';
        state.questions.difficultyFilter = 'all';
        const searchInput = document.getElementById('question-search-input');
        if (searchInput) searchInput.value = '';
        const catFilter = document.getElementById('question-filter-category');
        if (catFilter) catFilter.value = 'all';
        const diffFilter = document.getElementById('question-filter-difficulty');
        if (diffFilter) diffFilter.value = 'all';
        renderQuestionsGrid();
      });
      return;
    }

    list.forEach(q => {
      const card = document.createElement('div');
      card.className = 'glass-card question-card';
      
      const optionLetters = ['A', 'B', 'C', 'D'];
      let optionsHTML = '';
      q.options.forEach((opt, idx) => {
        const isCorrect = idx === q.correct;
        optionsHTML += `
          <div class="option-pill ${isCorrect ? 'correct' : ''}">
            <span class="option-letter">${optionLetters[idx]}</span>
            <span>${opt}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="question-card-header">
          <div class="question-meta">
            <span class="tag-difficulty ${q.difficulty}">${q.difficulty}</span>
            <span class="tag-category">${q.category}</span>
          </div>
          <span class="tag-marks">${q.marks} Pts</span>
        </div>
        <p class="question-text">${q.text}</p>
        <div class="question-options-list">
          ${optionsHTML}
        </div>
        <div class="question-card-footer">
          <div style="display:flex;gap:4px;">
            <button class="action-btn btn-view btn-preview-q" title="Preview Mode"><i class="fas fa-play"></i></button>
            <button class="action-btn btn-duplicate btn-dup-q" title="Duplicate Question"><i class="fas fa-copy"></i></button>
          </div>
          <div style="display:flex;gap:4px;">
            <button class="action-btn btn-edit btn-edit-q" title="Edit Question"><i class="fas fa-edit"></i></button>
            <button class="action-btn btn-delete btn-del-q" title="Delete Question"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      `;

      // Event handlers
      card.querySelector('.btn-preview-q').addEventListener('click', () => openPreviewModal(q));
      card.querySelector('.btn-dup-q').addEventListener('click', () => duplicateQuestion(q.id));
      card.querySelector('.btn-edit-q').addEventListener('click', () => openEditQuestionModal(q));
      card.querySelector('.btn-del-q').addEventListener('click', () => {
        state.activeDeleteQuestionId = q.id;
        openModal('delete-question-modal');
      });

      grid.appendChild(card);
    });
  }

  // Handle Question Filters
  const qSearchInput = document.getElementById('question-search-input');
  if (qSearchInput) {
    qSearchInput.addEventListener('input', (e) => {
      state.questions.search = e.target.value;
      renderQuestionsGrid();
    });
  }

  const qFilterCategory = document.getElementById('question-filter-category');
  if (qFilterCategory) {
    qFilterCategory.addEventListener('change', (e) => {
      state.questions.categoryFilter = e.target.value;
      renderQuestionsGrid();
    });
  }

  const qFilterDifficulty = document.getElementById('question-filter-difficulty');
  if (qFilterDifficulty) {
    qFilterDifficulty.addEventListener('change', (e) => {
      state.questions.difficultyFilter = e.target.value;
      renderQuestionsGrid();
    });
  }

  function populateCategoriesFilterDropdown() {
    const dropdown = document.getElementById('question-filter-category');
    if (!dropdown) return;

    // Preserving "All Categories"
    dropdown.innerHTML = '<option value="all">All Categories</option>';
    MOCK_DB.categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      dropdown.appendChild(opt);
    });
  }

  // ---- Tab: Leaderboard Overview ----
  function renderLeaderboard() {
    // Render top 3 Podium winners
    const winners = MOCK_DB.participants.slice(0, 3);
    const goldName = document.getElementById('podium-gold-name');
    const goldScore = document.getElementById('podium-gold-score');
    const goldAcc = document.getElementById('podium-gold-accuracy');
    const goldInit = document.getElementById('podium-gold-avatar-init');
    if (goldName && goldScore && goldAcc && goldInit && winners[0]) {
      goldName.textContent = winners[0].name;
      goldScore.textContent = `${winners[0].score}%`;
      goldAcc.textContent = `Accuracy: ${winners[0].accuracy}%`;
      goldInit.textContent = Format.initials(winners[0].name);
    }

    const silverName = document.getElementById('podium-silver-name');
    const silverScore = document.getElementById('podium-silver-score');
    const silverAcc = document.getElementById('podium-silver-accuracy');
    const silverInit = document.getElementById('podium-silver-avatar-init');
    if (silverName && silverScore && silverAcc && silverInit && winners[1]) {
      silverName.textContent = winners[1].name;
      silverScore.textContent = `${winners[1].score}%`;
      silverAcc.textContent = `Accuracy: ${winners[1].accuracy}%`;
      silverInit.textContent = Format.initials(winners[1].name);
    }

    const bronzeName = document.getElementById('podium-bronze-name');
    const bronzeScore = document.getElementById('podium-bronze-score');
    const bronzeAcc = document.getElementById('podium-bronze-accuracy');
    const bronzeInit = document.getElementById('podium-bronze-avatar-init');
    if (bronzeName && bronzeScore && bronzeAcc && bronzeInit && winners[2]) {
      bronzeName.textContent = winners[2].name;
      bronzeScore.textContent = `${winners[2].score}%`;
      bronzeAcc.textContent = `Accuracy: ${winners[2].accuracy}%`;
      bronzeInit.textContent = Format.initials(winners[2].name);
    }

    // Render remaining players list
    const tbody = document.getElementById('leaderboard-table-body');
    if (!tbody) return;

    let remainingList = MOCK_DB.participants.slice(3);

    // Apply Search
    if (state.leaderboard.search) {
      const q = state.leaderboard.search.toLowerCase();
      remainingList = remainingList.filter(p => p.name.toLowerCase().includes(q));
    }

    // Apply accuracy filter
    if (state.leaderboard.accuracyFilter !== 'all') {
      const accRange = parseInt(state.leaderboard.accuracyFilter);
      remainingList = remainingList.filter(p => p.accuracy >= accRange);
    }

    tbody.innerHTML = '';

    if (remainingList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: var(--space-8); color: var(--color-text-muted);">
            No records found.
          </td>
        </tr>
      `;
      return;
    }

    remainingList.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="rank-badge rank-normal">${p.rank}</span></td>
        <td style="font-weight:600;">${p.name}</td>
        <td><span style="font-family: var(--font-mono); font-weight:700;">${p.score}%</span></td>
        <td style="color: var(--color-success); font-weight: 600;">${p.correct}</td>
        <td style="color: var(--color-error); font-weight: 600;">${p.wrong}</td>
        <td>${p.accuracy}%</td>
        <td style="font-family: var(--font-mono);">${Format.time(p.time)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Bind leaderboard filters
  document.getElementById('lead-search-input')?.addEventListener('input', (e) => {
    state.leaderboard.search = e.target.value;
    renderLeaderboard();
  });

  document.getElementById('lead-filter-accuracy')?.addEventListener('change', (e) => {
    state.leaderboard.accuracyFilter = e.target.value;
    renderLeaderboard();
  });

  document.getElementById('lead-btn-pdf')?.addEventListener('click', () => {
    Toast.success('Creating and downloading Leaderboard report PDF...', '📄 PDF Generated');
  });

  document.getElementById('lead-btn-csv')?.addEventListener('click', () => {
    Toast.success('Leaderboard table exported to CSV.', '📊 Export CSV');
    downloadLeaderboardCSV();
  });

  function downloadLeaderboardCSV() {
    let csv = 'Rank,Name,Score,Correct Answers,Wrong Answers,Accuracy %,Time (sec)\n';
    MOCK_DB.participants.forEach(p => {
      csv += `${p.rank},"${p.name}",${p.score},${p.correct},${p.wrong},${p.accuracy},${p.time}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'quizverse_leaderboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ---- Tab: Analytics Views ----
  let chartInstances = {};

  function initAnalyticsCharts() {
    const canvasBar = document.getElementById('chart-score-dist');
    const canvasPie = document.getElementById('chart-categories-perf');
    const canvasLine = document.getElementById('chart-participation-trend');
    const canvasArea = document.getElementById('chart-accuracy-rate');

    if (!canvasBar || !canvasPie || !canvasLine || !canvasArea) return;

    // Clean old chart instances to avoid redraw bugs
    Object.keys(chartInstances).forEach(key => {
      if (chartInstances[key]) chartInstances[key].destroy();
    });

    // Score Distribution Chart (Bar Chart)
    chartInstances.bar = new Chart(canvasBar.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
        datasets: [{
          label: 'Number of Students',
          data: [0, 1, 2, 4, 6],
          backgroundColor: ['#FF4D6D', '#F59E0B', '#3B82F6', '#8B5CF6', '#00E5FF'],
          borderRadius: 6,
          borderWidth: 0
        }]
      },
      options: getCommonChartOptions()
    });

    // Categories Performance Chart (Pie Chart)
    chartInstances.pie = new Chart(canvasPie.getContext('2d'), {
      type: 'pie',
      data: {
        labels: MOCK_DB.categories,
        datasets: [{
          data: [85, 78, 92, 64, 88, 70],
          backgroundColor: ['#00E5FF', '#8B5CF6', '#FF4D6D', '#3B82F6', '#10B981', '#F59E0B'],
          borderWidth: 1,
          borderColor: 'rgba(5, 8, 22, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: 'rgba(255,255,255,0.7)', font: { family: 'Outfit', size: 10 } }
          }
        }
      }
    });

    // Participation Trend Chart (Line Chart)
    chartInstances.line = new Chart(canvasLine.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Completed Runs',
          data: [15, 30, 25, 45, 55, 80, 120],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }]
      },
      options: getCommonChartOptions()
    });

    // Accuracy Rate Chart (Area Chart)
    chartInstances.area = new Chart(canvasArea.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
        datasets: [{
          label: 'Accuracy %',
          data: [72, 75, 70, 82, 85, 89],
          borderColor: '#00E5FF',
          backgroundColor: 'rgba(0, 229, 255, 0.2)',
          fill: true,
          tension: 0.1,
          borderWidth: 2
        }]
      },
      options: getCommonChartOptions()
    });
  }

  function getCommonChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { family: 'Outfit', size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { family: 'Outfit', size: 10 } }
        }
      }
    };
  }

  function renderAnalyticsStats() {
    const scores = MOCK_DB.participants.filter(p => p.status === 'completed').map(p => p.score);
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    
    document.getElementById('analytics-avg-score').textContent = `${avgScore}%`;
    document.getElementById('analytics-most-diff').textContent = 'Q6 (DevOps Docker Engine)';
    document.getElementById('analytics-most-corr').textContent = 'Q1 (Data Structure Stacks)';
    document.getElementById('analytics-participation-trend').textContent = '+45% Weekly Increase';
    document.getElementById('analytics-category-performance').textContent = 'Data Structures (85% Avg)';
  }

  // ---- Tab: Settings Manager ----
  function renderSettingsProfile() {
    const nameInput = document.getElementById('settings-name-input');
    const emailInput = document.getElementById('settings-email-input');
    const avatarImg = document.getElementById('settings-avatar-preview');
    
    if (nameInput) nameInput.value = MOCK_DB.admin.name;
    if (emailInput) emailInput.value = MOCK_DB.admin.email;
    if (avatarImg) avatarImg.src = MOCK_DB.admin.avatar;
  }

  // Save Settings actions
  document.getElementById('settings-profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('settings-name-input').value;
    const email = document.getElementById('settings-email-input').value;

    if (!name || !email) {
      Toast.error('Please fill in all profile fields.', 'Error');
      return;
    }

    MOCK_DB.admin.name = name;
    MOCK_DB.admin.email = email;
    if (state.tempUploadedImage) {
      MOCK_DB.admin.avatar = state.tempUploadedImage;
    }

    // Refresh navbar displays
    updateTopNavbarProfile();
    Toast.success('Admin Profile saved successfully!', 'Settings Saved');
  });

  document.getElementById('settings-security-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('settings-current-pass').value;
    const newPass = document.getElementById('settings-new-pass').value;
    const confirmPass = document.getElementById('settings-confirm-pass').value;

    if (!currentPass || !newPass || !confirmPass) {
      Toast.error('Please fill in all password fields.', 'Security Error');
      return;
    }

    if (newPass !== confirmPass) {
      Toast.error('New Password and Confirm Password do not match.', 'Security Error');
      return;
    }

    Toast.success('Administrator Password has been updated.', 'Password Changed');
    e.target.reset();
  });

  // Photo uploading mockup
  document.getElementById('btn-upload-avatar')?.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.tempUploadedImage = event.target.result;
          document.getElementById('settings-avatar-preview').src = event.target.result;
          Toast.info('Click "Save Changes" to finalize profile image.');
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  });

  document.getElementById('btn-reset-avatar')?.addEventListener('click', () => {
    state.tempUploadedImage = null;
    document.getElementById('settings-avatar-preview').src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop';
    Toast.info('Profile picture reset to default template.');
  });

  // Settings Tab toggling (Vertical inside page layout)
  document.querySelectorAll('.settings-nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const panelId = el.getAttribute('data-panel');
      
      document.querySelectorAll('.settings-nav-item').forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.remove('active'));

      el.classList.add('active');
      const panel = document.getElementById(`settings-panel-${panelId}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Theme Toggler Switch Logic
  const themeSwitch = document.getElementById('theme-toggle-switch');
  if (themeSwitch) {
    themeSwitch.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('light-theme');
        Toast.info('Switched to Cyber-Light Mode');
      } else {
        document.body.classList.remove('light-theme');
        Toast.info('Switched to Deep-Space Dark Mode');
      }
    });
  }

  function updateTopNavbarProfile() {
    const navName = document.getElementById('nav-admin-name');
    const navAvatar = document.getElementById('nav-admin-avatar');
    
    if (navName) navName.textContent = MOCK_DB.admin.name;
    if (navAvatar) navAvatar.src = MOCK_DB.admin.avatar;
  }

  // =========================================
  // Question CRUD Operations
  // =========================================

  // ---- Form Reset ----
  function resetCreateQuestionForm() {
    const form = document.getElementById('create-question-form');
    if (form) form.reset();
    
    state.tempUploadedImage = null;
    const imgWrapper = document.getElementById('img-upload-wrapper');
    const imgPreview = document.getElementById('img-upload-preview');
    const previewContainer = document.getElementById('img-preview-container');
    
    if (imgWrapper) imgWrapper.style.display = 'flex';
    if (previewContainer) previewContainer.style.display = 'none';
    if (imgPreview) imgPreview.src = '';
  }

  // Setup form buttons
  document.getElementById('btn-create-reset')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetCreateQuestionForm();
    Toast.info('Form inputs reset successfully.');
  });

  // Image Upload Area in create question form
  const imgUploadWrapper = document.getElementById('img-upload-wrapper');
  if (imgUploadWrapper) {
    imgUploadWrapper.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.tempUploadedImage = event.target.result;
            
            // Show preview
            document.getElementById('img-upload-preview').src = event.target.result;
            document.getElementById('img-preview-container').style.display = 'block';
            imgUploadWrapper.style.display = 'none';
          };
          reader.readAsDataURL(file);
        }
      });
      fileInput.click();
    });
  }

  document.getElementById('btn-remove-img-preview')?.addEventListener('click', () => {
    state.tempUploadedImage = null;
    document.getElementById('img-preview-container').style.display = 'none';
    imgUploadWrapper.style.display = 'flex';
  });

  // Publish / Save Question Form
  document.getElementById('create-question-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Fetch values
    const text = document.getElementById('q-text').value;
    const optA = document.getElementById('q-opt-a').value;
    const optB = document.getElementById('q-opt-b').value;
    const optC = document.getElementById('q-opt-c').value;
    const optD = document.getElementById('q-opt-d').value;
    const correct = parseInt(document.getElementById('q-correct').value);
    const category = document.getElementById('q-category').value;
    const difficulty = document.getElementById('q-difficulty').value;
    const marks = parseInt(document.getElementById('q-marks').value);
    const explanation = document.getElementById('q-explanation').value;

    if (!text || !optA || !optB || !optC || !optD || isNaN(correct) || !category || !difficulty || isNaN(marks)) {
      Toast.error('Please fill in all mandatory fields.', 'Validation Error');
      return;
    }

    const newQuestion = {
      id: 'q-' + (MOCK_DB.questions.length + 1) + '-' + Math.round(Math.random() * 100),
      text,
      options: [optA, optB, optC, optD],
      correct,
      category,
      difficulty,
      marks,
      explanation,
      image: state.tempUploadedImage
    };

    MOCK_DB.questions.unshift(newQuestion); // Prepend to show at top
    
    // Add custom category if not in database
    if (!MOCK_DB.categories.includes(category)) {
      MOCK_DB.categories.push(category);
    }

    Toast.success('New question created and published successfully!', '🚀 Question Live');
    switchView('questions');
  });

  // Preview form contents
  document.getElementById('btn-create-preview')?.addEventListener('click', (e) => {
    e.preventDefault();

    const text = document.getElementById('q-text').value || 'Question text placeholder';
    const optA = document.getElementById('q-opt-a').value || 'Option A';
    const optB = document.getElementById('q-opt-b').value || 'Option B';
    const optC = document.getElementById('q-opt-c').value || 'Option C';
    const optD = document.getElementById('q-opt-d').value || 'Option D';
    const correct = parseInt(document.getElementById('q-correct').value) || 0;
    
    const mockQuestion = {
      text,
      options: [optA, optB, optC, optD],
      correct,
      image: state.tempUploadedImage
    };

    openPreviewModal(mockQuestion);
  });

  // Duplicate Question Action
  function duplicateQuestion(id) {
    const targetIdx = MOCK_DB.questions.findIndex(q => q.id === id);
    if (targetIdx === -1) return;

    const original = MOCK_DB.questions[targetIdx];
    const duplicated = {
      ...original,
      id: 'q-' + (MOCK_DB.questions.length + 1) + '-' + Math.round(Math.random() * 100),
      text: original.text + ' (Copy)'
    };

    // Insert next to original
    MOCK_DB.questions.splice(targetIdx + 1, 0, duplicated);
    Toast.success('Question duplicated successfully.', '📋 Copied');
    renderQuestionsGrid();
  }

  // Edit Question Modal Setup & Save
  function openEditQuestionModal(q) {
    state.activeEditQuestionId = q.id;

    document.getElementById('edit-q-text').value = q.text;
    document.getElementById('edit-q-opt-a').value = q.options[0];
    document.getElementById('edit-q-opt-b').value = q.options[1];
    document.getElementById('edit-q-opt-c').value = q.options[2];
    document.getElementById('edit-q-opt-d').value = q.options[3];
    document.getElementById('edit-q-correct').value = q.correct;
    document.getElementById('edit-q-category').value = q.category;
    document.getElementById('edit-q-difficulty').value = q.difficulty;
    document.getElementById('edit-q-marks').value = q.marks;
    document.getElementById('edit-q-explanation').value = q.explanation || '';

    // Handle Edit Image Preview
    const previewContainer = document.getElementById('edit-img-preview-container');
    const imageUploadWrapper = document.getElementById('edit-img-upload-wrapper');
    const previewImage = document.getElementById('edit-img-upload-preview');

    if (q.image) {
      state.tempUploadedImage = q.image;
      previewImage.src = q.image;
      previewContainer.style.display = 'block';
      imageUploadWrapper.style.display = 'none';
    } else {
      state.tempUploadedImage = null;
      previewContainer.style.display = 'none';
      imageUploadWrapper.style.display = 'flex';
    }

    openModal('edit-question-modal');
  }

  // Edit Modal Event Listeners
  const editImgUploadWrapper = document.getElementById('edit-img-upload-wrapper');
  if (editImgUploadWrapper) {
    editImgUploadWrapper.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.tempUploadedImage = event.target.result;
            
            // Show preview
            document.getElementById('edit-img-upload-preview').src = event.target.result;
            document.getElementById('edit-img-preview-container').style.display = 'block';
            editImgUploadWrapper.style.display = 'none';
          };
          reader.readAsDataURL(file);
        }
      });
      fileInput.click();
    });
  }

  document.getElementById('edit-btn-remove-img-preview')?.addEventListener('click', () => {
    state.tempUploadedImage = null;
    document.getElementById('edit-img-preview-container').style.display = 'none';
    editImgUploadWrapper.style.display = 'flex';
  });

  document.getElementById('edit-question-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!state.activeEditQuestionId) return;

    const qIndex = MOCK_DB.questions.findIndex(q => q.id === state.activeEditQuestionId);
    if (qIndex === -1) return;

    // Fetch values
    const text = document.getElementById('edit-q-text').value;
    const optA = document.getElementById('edit-q-opt-a').value;
    const optB = document.getElementById('edit-q-opt-b').value;
    const optC = document.getElementById('edit-q-opt-c').value;
    const optD = document.getElementById('edit-q-opt-d').value;
    const correct = parseInt(document.getElementById('edit-q-correct').value);
    const category = document.getElementById('edit-q-category').value;
    const difficulty = document.getElementById('edit-q-difficulty').value;
    const marks = parseInt(document.getElementById('edit-q-marks').value);
    const explanation = document.getElementById('edit-q-explanation').value;

    if (!text || !optA || !optB || !optC || !optD || isNaN(correct) || !category || !difficulty || isNaN(marks)) {
      Toast.error('Please fill in all mandatory fields.', 'Validation Error');
      return;
    }

    MOCK_DB.questions[qIndex] = {
      id: state.activeEditQuestionId,
      text,
      options: [optA, optB, optC, optD],
      correct,
      category,
      difficulty,
      marks,
      explanation,
      image: state.tempUploadedImage
    };

    if (!MOCK_DB.categories.includes(category)) {
      MOCK_DB.categories.push(category);
    }

    Toast.success('Question updated successfully!', 'Saved');
    closeModal('edit-question-modal');
    renderQuestionsGrid();
  });

  // Add Category Dialog Action
  document.getElementById('btn-add-cat-submit')?.addEventListener('click', () => {
    const input = document.getElementById('new-category-input');
    const val = input.value.trim();

    if (!val) {
      Toast.error('Category name cannot be empty.');
      return;
    }

    if (MOCK_DB.categories.some(cat => cat.toLowerCase() === val.toLowerCase())) {
      Toast.warning('Category already exists.');
      return;
    }

    MOCK_DB.categories.push(val);
    input.value = '';
    
    // Refresh question filter drop-downs
    populateCategoriesFilterDropdown();
    Toast.success(`Category "${val}" added successfully.`, 'Success');
    closeModal('add-category-modal');
  });

  // =========================================
  // Modals Controller
  // =========================================
  function openModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  function closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  // Bind close buttons in overlays
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      // Close modal if user clicks the dark background outside modal-box
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });

    overlay.querySelectorAll('.modal-close-btn, .btn-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    });
  });

  // Participant Deletion Modal confirms
  document.getElementById('btn-confirm-delete-participant')?.addEventListener('click', () => {
    const email = state.activeDeleteParticipantEmail;
    if (!email) return;

    MOCK_DB.participants = MOCK_DB.participants.filter(p => p.email !== email);
    // Re-index ranks
    MOCK_DB.participants.forEach((p, idx) => {
      p.rank = idx + 1;
    });

    Toast.success('Participant record deleted successfully.', '🗑️ Deleted');
    closeModal('delete-participant-modal');
    renderParticipantsTable();
  });

  // Question Deletion Modal confirms
  document.getElementById('btn-confirm-delete-question')?.addEventListener('click', () => {
    const id = state.activeDeleteQuestionId;
    if (!id) return;

    MOCK_DB.questions = MOCK_DB.questions.filter(q => q.id !== id);
    Toast.success('Question deleted successfully.', '🗑️ Deleted');
    closeModal('delete-question-modal');
    renderQuestionsGrid();
  });

  // Score Details Modal
  function openScoreDetailsModal(p) {
    document.getElementById('modal-score-name').textContent = p.name;
    document.getElementById('modal-score-email').textContent = p.email;
    document.getElementById('modal-score-correct').textContent = p.correct;
    document.getElementById('modal-score-wrong').textContent = p.wrong;
    document.getElementById('modal-score-time').textContent = Format.time(p.time);
    
    // Render progress circle inside the details box
    const circleContainer = document.getElementById('modal-score-circle');
    if (circleContainer) {
      if (p.status === 'completed') {
        renderCircularProgress(circleContainer, p.score, '#00E5FF', 120, 8);
      } else {
        circleContainer.innerHTML = `
          <div style="width:120px;height:120px;border-radius:50%;border:4px dashed rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--color-warning);">
            <i class="fas fa-spinner fa-spin" style="font-size:32px;"></i>
          </div>
        `;
      }
    }

    openModal('participant-details-modal');
  }

  // Question Live Preview Modal
  function openPreviewModal(q) {
    const modal = document.getElementById('question-preview-modal');
    if (!modal) return;

    document.getElementById('preview-modal-text').textContent = q.text;
    
    // Image Handling
    const imgEl = document.getElementById('preview-modal-image');
    if (q.image) {
      imgEl.src = q.image;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
      imgEl.src = '';
    }

    // Options rendering
    const container = document.getElementById('preview-modal-options');
    container.innerHTML = '';
    const optionLetters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, idx) => {
      const optItem = document.createElement('div');
      optItem.className = 'preview-option-item';
      optItem.innerHTML = `
        <span class="option-letter" style="background:rgba(255,255,255,0.08);width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;transition:all 0.2s;">${optionLetters[idx]}</span>
        <span>${opt}</span>
      `;
      
      // Event listener to allow selection
      optItem.addEventListener('click', () => {
        container.querySelectorAll('.preview-option-item').forEach(item => item.classList.remove('selected'));
        optItem.classList.add('selected');
        
        // Show correct / wrong indicators
        if (idx === q.correct) {
          Toast.success('Correct Answer! 🎉', 'Feedback');
          if (typeof Confetti !== 'undefined') Confetti.launch(2000);
        } else {
          Toast.error('Incorrect. Keep trying!', 'Feedback');
        }
      });

      container.appendChild(optItem);
    });

    openModal('question-preview-modal');
  }

  // Trigger default profile setup
  updateTopNavbarProfile();

  // Load the default page (Dashboard)
  switchView('dashboard');
});
