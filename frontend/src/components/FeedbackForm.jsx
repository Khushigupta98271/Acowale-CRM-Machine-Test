import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFeedback from '../hooks/useFeedback';
import '../styles/FeedbackForm.css';

function FeedbackForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      category: 'bug',
      message: '',
      rating: 5,
    },
  });

  const { submitFeedback, loading, error, success, resetState } = useFeedback();
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    resetState();
    try {
      await submitFeedback(data);
      showToast('Feedback submitted successfully!', 'success');
      reset();
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const errorMsg = err.errors.map(e => `${e.field}: ${e.message}`).join(', ');
        showToast(errorMsg, 'error');
      } else {
        showToast(err.message || 'Failed to submit feedback', 'error');
      }
    }
  };

  // Auto-hide error after form submission attempt
  useEffect(() => {
    if (success) {
      showToast('Feedback submitted successfully!', 'success');
    }
  }, [success]);

  return (
    <div className="feedback-form-container">
      <div className="feedback-form">
        {/* Header */}
        <div className="form-header">
          <div className="brand-header">
            <span className="brand-icon">💬</span>
            <span className="brand-name">Acowale Feedback</span>
            <a href="/admin" className="admin-link" title="Go to admin panel">→</a>
          </div>
        </div>

        {/* Hero Content */}
        <div className="form-hero">
          <div className="hero-illustration">✨⭐🚀⭐✨</div>
          <h1 className="form-title">We value your feedback <span className="sparkle">✨</span></h1>
          <p className="form-subtitle">Help us improve by sharing your experience.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className={errors.category ? 'error' : ''}
            >
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="performance">Performance Issue</option>
              <option value="ui">UI/UX Feedback</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <span className="error-text">{errors.category.message}</span>}
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              placeholder="Please describe your feedback in detail (5-1000 characters)"
              rows="6"
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 5,
                  message: 'Message must be at least 5 characters',
                },
                maxLength: {
                  value: 1000,
                  message: 'Message cannot exceed 1000 characters',
                },
              })}
              className={errors.message ? 'error' : ''}
            />
            <span className="char-count">
              {/* Character count will be added here if needed */}
            </span>
            {errors.message && <span className="error-text">{errors.message.message}</span>}
          </div>

          {/* Rating Field */}
          <div className="form-group">
            <label htmlFor="rating">Rating (Optional)</label>
            <div className="rating-select">
              <select id="rating" {...register('rating')} defaultValue="5">
                <option value="">Not rated</option>
                <option value="1">⭐ 1 - Poor</option>
                <option value="2">⭐⭐ 2 - Fair</option>
                <option value="3">⭐⭐⭐ 3 - Good</option>
                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Submitting...' : '✓ Submit Feedback'}
          </button>

          {/* Security Note */}
          <p className="security-note">
            <span className="lock-icon">🔒</span>
            Your feedback is secure and anonymous.
          </p>
        </form>

        {/* Show Feedback Link */}
        <div className="show-feedback-section">
          <a href="#feedback-list" className="show-feedback-link">
            Show feedback
          </a>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <p>Thank you for helping us improve! ❤️</p>
          <p className="copyright">© 2024 Acowale. All rights reserved.</p>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackForm;
