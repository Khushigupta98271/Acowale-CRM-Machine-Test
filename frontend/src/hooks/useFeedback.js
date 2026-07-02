import { useState, useCallback } from 'react';
import feedbackAPI from '../services/api';

const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Submit feedback
  const submitFeedback = useCallback(async (feedbackData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await feedbackAPI.submitFeedback(feedbackData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.errors || err.message || 'Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get feedback list
  const getFeedbackList = useCallback(async (page = 1, limit = 10, category = '', search = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await feedbackAPI.getFeedbackList(page, limit, category, search);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single feedback
  const getFeedbackById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await feedbackAPI.getFeedbackById(id);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get analytics
  const getAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await feedbackAPI.getAnalyticsSummary();
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset states
  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    submitFeedback,
    getFeedbackList,
    getFeedbackById,
    getAnalytics,
    resetState,
  };
};

export default useFeedback;
