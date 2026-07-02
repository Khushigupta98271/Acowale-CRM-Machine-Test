import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Logo/Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">📊</div>
        <h2>Acodash</h2>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-menu">
        <a
          href="#overview"
          className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('overview');
          }}
        >
          <span className="menu-icon">📋</span>
          <span>Overview</span>
        </a>

        <a
          href="#feedback"
          className={`menu-item ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('feedback');
          }}
        >
          <span className="menu-icon">💬</span>
          <span>Feedback</span>
        </a>

        <a
          href="#categories"
          className={`menu-item ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('categories');
          }}
        >
          <span className="menu-icon">📁</span>
          <span>Categories</span>
        </a>

        <a
          href="#analytics"
          className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('analytics');
          }}
        >
          <span className="menu-icon">📈</span>
          <span>Analytics</span>
        </a>

        <a
          href="#users"
          className="menu-item"
          onClick={(e) => e.preventDefault()}
        >
          <span className="menu-icon">👥</span>
          <span>Users</span>
        </a>

        <a
          href="#settings"
          className="menu-item"
          onClick={(e) => e.preventDefault()}
        >
          <span className="menu-icon">⚙️</span>
          <span>Settings</span>
        </a>

        <a
          href="#integrations"
          className="menu-item"
          onClick={(e) => e.preventDefault()}
        >
          <span className="menu-icon">🔗</span>
          <span>Integrations</span>
        </a>
      </nav>

      {/* Footer with User Profile */}
      <div className="sidebar-footer">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Feedback Form
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
