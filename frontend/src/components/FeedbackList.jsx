import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFeedback from '../hooks/useFeedback';
import feedbackAPI from '../services/api';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import '../styles/FeedbackList.css';

const SUMMARY_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const navigate = useNavigate();
  const { getFeedbackList, loading, error } = useFeedback();

  // Fetch summary data
  useEffect(() => {
    const fetchSummary = async () => {
      setSummaryLoading(true);
      try {
        const result = await feedbackAPI.getAnalyticsSummary();
        setSummary(result.data);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      } finally {
        setSummaryLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // Fetch feedback on mount and when filters change
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const result = await getFeedbackList(page, limit, category, search);
        setFeedbackList(result.data || []);
        setMeta(result.meta || {});
      } catch (err) {
        console.error('Failed to fetch feedback:', err);
      }
    };

    fetchFeedback();
  }, [page, category, search, limit, getFeedbackList]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get category badge color
  const getCategoryColor = (cat) => {
    const colors = {
      bug: '#ef4444',
      feature: '#3b82f6',
      performance: '#f59e0b',
      ui: '#8b5cf6',
      other: '#6b7280',
    };
    return colors[cat] || '#6b7280';
  };

  // Get rating stars
  const getStars = (rating) => {
    if (!rating) return '—';
    return '⭐'.repeat(rating);
  };

  return (
    <div className="feedback-list-container">
      <div className="feedback-list-header">
        <h2>Customer Feedback</h2>
        <p className="subtitle">Browse and manage customer feedback</p>
      </div>

      {/* Summary section */}
      {summary && (
        <div className="feedback-summary">
          <div className="feedback-summary-card">
            <p className="summary-label">Total Feedback</p>
            <p className="summary-value">{summary.totalFeedback}</p>
          </div>
          <div className="feedback-summary-card feedback-chart-card">
            <p className="summary-label">Category Distribution</p>
            <div className="summary-pie">
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={Object.entries(summary.categoryDistribution).map(
                      ([name, value]) => ({ name, value })
                    )}
                    dataKey="value"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                  >
                    {Object.entries(summary.categoryDistribution).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={SUMMARY_COLORS[index % SUMMARY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} feedback`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="admin-route-btn" onClick={() => navigate('/admin')}>
            View Admin Dashboard
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="search-feedback">Search</label>
          <input
            id="search-feedback"
            type="text"
            placeholder="Search by email or message..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="performance">Performance Issue</option>
            <option value="ui">UI/UX Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && <div className="loading">Loading feedback...</div>}

      {/* Error state */}
      {error && <div className="error-message">Failed to load feedback</div>}

      {/* Feedback list */}
      {!loading && feedbackList.length > 0 ? (
        <>
          <div className="feedback-items">
            {feedbackList.map((item) => (
              <div key={item._id} className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-info">
                    <span
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(item.category) }}
                    >
                      {item.category}
                    </span>
                    <span className="rating">{getStars(item.rating)}</span>
                  </div>
                  <span className="date">{formatDate(item.createdAt)}</span>
                </div>

                <div className="feedback-content">
                  <p className="email">
                    <strong>From:</strong> {item.email}
                  </p>
                  <p className="message">
                    {expandedId === item._id
                      ? item.message
                      : `${item.message.substring(0, 100)}...`}
                  </p>
                </div>

                <button
                  className="expand-btn"
                  onClick={() =>
                    setExpandedId(expandedId === item._id ? null : item._id)
                  }
                >
                  {expandedId === item._id ? 'Show Less' : 'Show More'}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {meta.totalPages && meta.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="page-btn"
              >
                Previous
              </button>

              <span className="page-info">
                Page {page} of {meta.totalPages} (Total: {meta.total})
              </span>

              <button
                onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
                disabled={page === meta.totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="no-feedback">
            <p>No feedback found. Be the first to share!</p>
          </div>
        )
      )}
    </div>
  );
}

export default FeedbackList;
