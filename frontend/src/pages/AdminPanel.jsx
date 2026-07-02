import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="admin-panel">
      <div className="admin-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="admin-main-content">
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </main>
  );
}

export default AdminPanel;
