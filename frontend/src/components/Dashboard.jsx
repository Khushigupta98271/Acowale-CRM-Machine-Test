import Analytics from './Analytics';
import FeedbackList from './FeedbackList';
import '../styles/Dashboard.css';

function Dashboard({ activeTab, setActiveTab }) {
  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-top">
          <div>
            <h1>{activeTab === 'overview' ? 'Overview' : 'Feedback Management'}</h1>
            <p className="header-subtitle">
              {activeTab === 'overview'
                ? 'Real-time summary of customer feedback'
                : 'Manage and respond to customer feedback'}
            </p>
          </div>
          <div className="header-controls">
            <button className="search-btn" title="Search">🔍</button>
            <button className="notification-btn" title="Notifications">
              🔔
              <span className="notification-badge">1</span>
            </button>
            <button className="profile-btn" title="Admin Profile">👤</button>
          </div>
        </div>

        {/* Date Filter */}
        <div className="filter-section">
          <input type="date" className="date-filter" />
          <button className="filter-btn">⚙️ Filter</button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {(activeTab === 'overview' || activeTab === 'analytics') && <Analytics />}
        {activeTab === 'feedback' && <FeedbackList />}
        {activeTab === 'categories' && (
          <div className="placeholder-content">
            <p>Categories management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
