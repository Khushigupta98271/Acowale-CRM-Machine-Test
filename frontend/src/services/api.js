import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Methods
const feedbackAPI = {
  // Submit new feedback
  submitFeedback: async (data) => {
    try {
      const response = await apiClient.post('/feedback/submit', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all feedback with pagination and filters
  getFeedback: async (params = {}) => {
    try {
      const response = await apiClient.get('/feedback', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single feedback by ID
  getFeedbackById: async (id) => {
    try {
      const response = await apiClient.get(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get analytics summary
  getAnalyticsSummary: async () => {
    try {
      const response = await apiClient.get('/feedback/analytics/summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get feedback with filtering and pagination
  getFeedbackList: async (page = 1, limit = 10, category = '', search = '') => {
    const params = { page, limit };
    if (category) params.category = category;
    if (search) params.search = search;
    return feedbackAPI.getFeedback(params);
  },
};

export default feedbackAPI;
