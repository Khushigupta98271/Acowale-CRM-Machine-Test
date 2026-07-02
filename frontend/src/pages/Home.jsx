import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import '../styles/Home.css';

function Home() {
  return (
    <main className="home-page">
      <div className="home-container">
        <div className="form-section">
          <div className="user-badge">👤 USER SIDE</div>
          <p className="user-subtitle">Anyone can submit feedback in seconds.</p>
          <FeedbackForm />
        </div>

        <div className="list-section">
          <div className="admin-badge">🔐 ADMIN SIDE</div>
          <p className="admin-subtitle">Powerful insights to understand and act on feedback.</p>
          <FeedbackList />
        </div>
      </div>
    </main>
  );
}

export default Home;
