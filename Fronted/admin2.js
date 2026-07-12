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
