import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import useFeedback from '../hooks/useFeedback';
import '../styles/Analytics.css';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const { getAnalytics, loading, error } = useFeedback();

  // Fetch analytics on mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getAnalytics();
        setAnalytics(result.data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };

    fetchAnalytics();
  }, [getAnalytics]);

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;

  if (!analytics) {
    return <div className="analytics-error">Failed to load analytics data</div>;
  }

  // Prepare category distribution data for pie chart
  const categoryData = Object.entries(analytics.categoryDistribution).map(
    ([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    })
  );

  // Prepare data for bar chart (just category distribution)
  const barData = categoryData;

  // Format rating average
  const ratingAverage = analytics.ratingAverage?.toFixed(1) || 0;

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <p className="subtitle">Feedback insights and statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <p className="card-label">Total Feedback</p>
            <p className="card-value">{analytics.totalFeedback}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">⭐</div>
          <div className="card-content">
            <p className="card-label">Average Rating</p>
            <p className="card-value">{ratingAverage} / 5.0</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🐛</div>
          <div className="card-content">
            <p className="card-label">Bug Reports</p>
            <p className="card-value">{analytics.categoryDistribution.bug}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">✨</div>
          <div className="card-content">
            <p className="card-label">Feature Requests</p>
            <p className="card-value">{analytics.categoryDistribution.feature}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Pie Chart */}
        <div className="chart-wrapper">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-wrapper">
          <h3>Feedback by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="recent-submissions">
        <h3>Recent Submissions</h3>
        <div className="submissions-list">
          {analytics.recentSubmissions && analytics.recentSubmissions.length > 0 ? (
            analytics.recentSubmissions.map((submission) => (
              <div key={submission._id} className="submission-item">
                <div className="submission-meta">
                  <span className="email">{submission.email}</span>
                  <span className="category" style={{
                    backgroundColor: getCategoryColor(submission.category),
                  }}>
                    {submission.category}
                  </span>
                </div>
                <p className="message">{submission.message}</p>
                <span className="date">
                  {new Date(submission.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
          ) : (
            <p className="no-data">No recent submissions</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get category color
function getCategoryColor(category) {
  const colors = {
    bug: '#ef4444',
    feature: '#3b82f6',
    performance: '#f59e0b',
    ui: '#8b5cf6',
    other: '#6b7280',
  };
  return colors[category] || '#6b7280';
}

export default Analytics;
