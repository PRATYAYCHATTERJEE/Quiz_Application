/**
 * QuizVerse - Centralized API Client
 * Handles all backend communication with error handling and auth headers
 */

// =========================================
// API Configuration
// Change this to your Render.com backend URL for production
// =========================================
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://quizverse-backend.onrender.com/api'; // Update with your Render URL

window.API_BASE_URL = API_BASE_URL;

// =========================================
// Core Fetch Wrapper
// =========================================

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/admin/login')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Build headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach JWT token if available
  const token = localStorage.getItem('quizverse_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Handle unauthorized (token expired)
    if (response.status === 401 && window.location.pathname.includes('dashboard')) {
      localStorage.removeItem('quizverse_token');
      localStorage.removeItem('quizverse_admin');
      window.location.href = 'login.html';
      return;
    }

    if (!response.ok) {
      throw new APIError(data.message || 'Request failed', response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) throw error;
    
    // Network or connection error
    if (!navigator.onLine) {
      throw new APIError('No internet connection. Please check your network.', 0);
    }
    
    throw new APIError('Unable to connect to server. Please try again.', 0);
  }
}

/**
 * Custom API Error class
 */
class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

window.APIError = APIError;

// =========================================
// Admin API
// =========================================
const AdminAPI = {
  login: (email, password) =>
    apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    apiRequest('/admin/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getProfile: () => apiRequest('/admin/profile'),

  getDashboard: () => apiRequest('/admin/dashboard'),

  exportParticipants: () => {
    const token = localStorage.getItem('quizverse_token');
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/admin/export/participants`;
    link.download = 'participants.csv';
    // Add auth header via URL param workaround (or use fetch+blob)
    fetch(`${API_BASE_URL}/admin/export/participants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
  },
};

// =========================================
// Question API
// =========================================
const QuestionAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/questions${query ? '?' + query : ''}`);
  },

  getById: (id) => apiRequest(`/questions/${id}`),

  getCategories: () => apiRequest('/questions/categories'),

  create: (data) =>
    apiRequest('/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/questions/${id}`, { method: 'DELETE' }),

  toggle: (id) =>
    apiRequest(`/questions/${id}/toggle`, { method: 'PATCH' }),
};

// =========================================
// Quiz API
// =========================================
const QuizAPI = {
  getActive: () => apiRequest('/quiz/active'),

  getAll: () => apiRequest('/quiz'),

  create: (data) =>
    apiRequest('/quiz', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  publish: (id) =>
    apiRequest(`/quiz/${id}/publish`, { method: 'PUT' }),

  close: (id) =>
    apiRequest(`/quiz/${id}/close`, { method: 'PUT' }),

  delete: (id) =>
    apiRequest(`/quiz/${id}`, { method: 'DELETE' }),

  submit: (data) =>
    apiRequest('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// =========================================
// Participant API
// =========================================
const ParticipantAPI = {
  join: (name, email) =>
    apiRequest('/participant/join', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    }),

  getResult: (id) => apiRequest(`/participant/${id}`),
};

// =========================================
// Leaderboard API
// =========================================
const LeaderboardAPI = {
  get: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/leaderboard${query ? '?' + query : ''}`);
  },

  getStats: () => apiRequest('/leaderboard/stats'),

  exportCSV: () => {
    const token = localStorage.getItem('quizverse_token');
    fetch(`${API_BASE_URL}/leaderboard/export`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'leaderboard.csv';
        link.click();
        URL.revokeObjectURL(url);
      });
  },
};

// =========================================
// Health Check
// =========================================
const checkAPIHealth = () => apiRequest('/health');

// Export to global scope
window.AdminAPI = AdminAPI;
window.QuestionAPI = QuestionAPI;
window.QuizAPI = QuizAPI;
window.ParticipantAPI = ParticipantAPI;
window.LeaderboardAPI = LeaderboardAPI;
window.checkAPIHealth = checkAPIHealth;
