# Acowale CRM Machine Test - Implementation Plan

**Tech Stack:** MERN (MongoDB, Express.js, React, Node.js)  
**Estimated Duration:** 6-10 hours  
**Target:** Production-ready customer feedback platform

---

## Table of Contents
1. [Phase 1: Setup & Architecture](#phase-1-setup--architecture)
2. [Phase 2: Backend Development](#phase-2-backend-development)
3. [Phase 3: Frontend Development](#phase-3-frontend-development)
4. [Phase 4: Integration & Testing](#phase-4-integration--testing)
5. [Phase 5: Deployment & Documentation](#phase-5-deployment--documentation)

---

## Phase 1: Setup & Architecture

### 1.1 Project Initialization

#### Backend Setup
- [ ] Create Node.js project with `npm init`
- [ ] Install core dependencies:
  - `express` - Web framework
  - `mongoose` - MongoDB ODM
  - `dotenv` - Environment variables
  - `cors` - Cross-origin requests
  - `helmet` - Security headers
  - `express-validator` - Input validation
  - `morgan` - HTTP request logging
  - `jsonwebtoken` - JWT authentication (bonus)
  - `express-rate-limit` - Rate limiting (bonus)
  - `jest` - Unit testing (bonus)
  - `supertest` - API testing (bonus)

#### Frontend Setup
- [ ] Create React app with `create-react-app` or `vite`
- [ ] Install core dependencies:
  - `axios` - HTTP client
  - `react-router-dom` - Routing
  - `tailwindcss` or `styled-components` - Styling
  - `react-hook-form` - Form management
  - `chart.js` or `recharts` - Dashboard charts
  - `toast-notifications` - User feedback

#### Database Setup
- [ ] MongoDB Atlas account (free tier)
- [ ] Create database and connection string
- [ ] Setup environment variables

### 1.2 Project Structure

```
acowale-crm/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Feedback.js
│   │   ├── routes/
│   │   │   └── feedback.js
│   │   ├── controllers/
│   │   │   └── feedbackController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.js
│   │   │   ├── auth.js (bonus)
│   │   │   └── rateLimit.js (bonus)
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── utils/
│   │   │   └── logger.js
│   │   └── app.js
│   ├── tests/
│   │   └── feedback.test.js (bonus)
│   ├── .env.example
│   ├── .env.local (git-ignored)
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FeedbackList.jsx
│   │   │   └── Analytics.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useFeedback.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.local
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── docker-compose.yml (bonus)
├── .github/workflows/ (bonus - CI/CD)
├── README.md
├── DECISIONS.md
└── TEACH_US.md (bonus)
```

### 1.3 Environment Configuration

**Backend `.env.example`:**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/acowale-crm
LOG_LEVEL=info
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

**Frontend `.env.local`:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## Phase 2: Backend Development

### 2.1 Database Schema (MongoDB)

#### Feedback Model
```javascript
{
  _id: ObjectId,
  email: String (required, validated),
  category: String (enum: ['bug', 'feature', 'performance', 'ui', 'other']),
  message: String (required, 1-1000 chars),
  rating: Number (1-5, optional),
  createdAt: Date (auto),
  updatedAt: Date (auto),
  isResolved: Boolean (default: false),
  adminNotes: String (optional)
}
```

### 2.2 Backend API Development

#### Core Endpoints

**1. POST /api/feedback/submit**
- Accept: email, category, message, rating (optional)
- Validation: Email format, message length, category enum
- Response: Created feedback object or validation errors
- Status Codes: 201 (success), 400 (validation), 500 (server error)

**2. GET /api/feedback**
- Query params: page, limit, category, search
- Authentication: Optional JWT (admin only for filters)
- Response: Paginated feedback list
- Implement filtering and searching

**3. GET /api/feedback/:id**
- Fetch single feedback
- Response: Feedback object or 404

**4. GET /api/analytics/summary**
- Response:
  ```json
  {
    totalFeedback: Number,
    categoryDistribution: {
      bug: Number,
      feature: Number,
      performance: Number,
      ui: Number,
      other: Number
    },
    ratingAverage: Number,
    recentSubmissions: Array[Feedback]
  }
  ```

**5. POST /api/auth/login** (Bonus)
- Accept: email, password
- Response: JWT token

#### Middleware & Features

- [ ] Input validation (express-validator)
- [ ] Error handling (centralized)
- [ ] Logging (morgan + custom logger)
- [ ] CORS configuration
- [ ] Security headers (helmet)
- [ ] Health check endpoint: `GET /health`
- [ ] Rate limiting (express-rate-limit)
- [ ] JWT authentication (optional routes)

### 2.3 Implementation Checklist

- [x] Setup Express server with middleware stack
- [x] Configure MongoDB connection with Mongoose
- [x] Implement Feedback schema and model
- [x] Create feedback controller with CRUD operations
- [x] Setup route handlers
- [x] Add validation middleware
- [x] Implement error handling
- [x] Add logging utility
- [x] Create health-check endpoint
- [x] Add rate limiting (configured)
- [ ] Setup JWT authentication (bonus)
- [ ] Write unit tests (bonus)
- [ ] Add API documentation (bonus - CREATED: API_REFERENCE.md)

---

## Phase 3: Frontend Development - COMPLETE ✅

### 3.1 Core Components (IMPLEMENTED)

#### 1. Feedback Form Page (`/`)
- Form fields:
  - Email (text input, required)
  - Category (dropdown)
  - Message (textarea, max 1000 chars)
  - Rating (star rating, optional)
- Features:
  - Client-side validation
  - Success toast notification
  - Loading state during submission
  - Clear form after submission

#### 2. Admin Dashboard (`/admin`)
- Sections:
  - Summary Cards (total count, avg rating)
  - Category Distribution Chart (pie/bar chart)
  - Recent Submissions Table
  - Search & Filter Panel
- Features:
  - Real-time data fetching
  - Filter by category
  - Search by email/message
  - Pagination
  - Responsive design

#### 3. Feedback List Component
- Display feedback in table/card format
- Show: Email, Category, Message preview, Date
- Actions: View details, Mark as resolved (bonus)

### 3.2 Implementation Checklist

- [ ] Setup React project structure
- [ ] Create layout components (Header, Footer, Sidebar)
- [ ] Build feedback form with validation
- [ ] Create dashboard page with charts
- [ ] Implement API service layer
- [ ] Add routing with React Router
- [ ] Style with Tailwind/CSS
- [ ] Add loading and error states
- [ ] Implement search/filter functionality
- [ ] Add authentication UI (bonus)
- [ ] Setup responsive design
- [ ] Add unit tests (bonus)

---

## Phase 4: Integration & Testing

### 4.1 API Integration

- [ ] Test all endpoints with Postman/Insomnia
- [ ] Verify CORS configuration
- [ ] Test error responses
- [ ] Validate request/response formats
- [ ] Test pagination
- [ ] Test filtering and searching

### 4.2 Frontend-Backend Integration

- [ ] Test feedback submission end-to-end
- [ ] Verify dashboard data loading
- [ ] Test filtering from frontend
- [ ] Check error handling on network failures
- [ ] Validate form validation

### 4.3 Unit Testing (Bonus)

**Backend:**
- [ ] Test API endpoints with supertest
- [ ] Test validation middleware
- [ ] Test database operations
- [ ] Test error handlers

**Frontend:**
- [ ] Test React components with React Testing Library
- [ ] Test form validation
- [ ] Test API service calls

### 4.4 Manual Testing Checklist

- [ ] Submit feedback with all categories
- [ ] Submit invalid data (should show errors)
- [ ] View dashboard analytics
- [ ] Filter feedback by category
- [ ] Search feedback
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test error handling (network down, server error)

---

## Phase 5: Deployment & Documentation

### 5.1 Deployment Strategy

#### Backend Deployment (Choose One)
- **Option 1: Heroku** (Recommended for simplicity)
  - Free tier available
  - Easy Git integration
  - Built-in environment variables
  - Steps: Create Heroku app → Connect GitHub → Deploy
  
- **Option 2: Railway**
  - Modern alternative
  - Easy configuration
  - Pay-as-you-go pricing
  
- **Option 3: AWS (EC2 + RDS)**
  - Production-grade
  - More configuration
  - Free tier: 12 months

- **Option 4: DigitalOcean App Platform**
  - Simple deployment
  - Fixed pricing
  - Good documentation

#### Frontend Deployment (Choose One)
- **Option 1: Vercel** (Recommended for React)
  - Free tier
  - Automatic deploys on GitHub push
  - Built-in CI/CD
  
- **Option 2: Netlify**
  - Simple deployment
  - Free tier
  - Good performance
  
- **Option 3: GitHub Pages**
  - Free
  - Good for static sites
  - Limited backend support

#### Database Deployment
- MongoDB Atlas (Cloud)
  - Free tier: 512MB
  - Easy setup
  - No infrastructure management

### 5.2 Pre-Deployment Checklist

**Backend:**
- [ ] Test all endpoints in production mode
- [ ] Set environment variables correctly
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Configure CORS for production URL
- [ ] Enable security headers
- [ ] Setup logging/monitoring
- [ ] Create health-check endpoint
- [ ] Test rate limiting
- [ ] Verify error handling

**Frontend:**
- [ ] Build for production
- [ ] Test build locally
- [ ] Update API URL for production
- [ ] Optimize images
- [ ] Check bundle size
- [ ] Test in production environment
- [ ] Setup error tracking (bonus)

### 5.3 Documentation

#### Required Files:

**1. README.md**
- Project description
- Features
- Technology stack
- Setup instructions
- How to run locally
- API endpoints overview
- Deployment steps
- Contributing guidelines

**2. DECISIONS.md**
- Why MERN stack? (Express for REST API, Node for non-blocking I/O, MongoDB for flexibility, React for UI)
- Why MongoDB? (Schema flexibility, easy scaling, Atlas cloud)
- Why this architecture? (Separation of concerns, MVC pattern, scalability)
- Trade-offs made (time constraints vs completeness)
- Improvements with more time
- Technical challenges faced
- AI tools used
- AI collaboration examples
- Scale considerations (100k users)
- What to change/improve

**3. TEACH_US.md** (Bonus)
- Share 1 idea/pattern/practice (< 500 words)
- Examples: Microservices, event-driven architecture, testing strategies, DevOps practices

### 5.4 Deployment Steps

**Backend:**
```bash
# 1. Prepare repository
git init
git add .
git commit -m "Initial commit"

# 2. Create Heroku app
heroku create acowale-crm-api

# 3. Set environment variables
heroku config:set MONGODB_URI=<your-uri>
heroku config:set NODE_ENV=production

# 4. Deploy
git push heroku main

# 5. Verify
heroku logs --tail
curl https://acowale-crm-api.herokuapp.com/health
```

**Frontend:**
```bash
# 1. Build
npm run build

# 2. Deploy to Vercel/Netlify
vercel --prod
# or
netlify deploy --prod
```

### 5.5 Post-Deployment

- [ ] Test all endpoints on live URL
- [ ] Setup monitoring/alerts
- [ ] Configure domain (optional)
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Backup strategy
- [ ] Update README with live URL

---

## Timeline Estimate

| Phase | Duration | Details |
|-------|----------|---------|
| Phase 1 (Setup) | 1-1.5 hours | Project structure, dependencies, config |
| Phase 2 (Backend) | 2-2.5 hours | APIs, database, validation |
| Phase 3 (Frontend) | 2-2.5 hours | Components, forms, dashboard |
| Phase 4 (Testing) | 1 hour | Integration, manual testing |
| Phase 5 (Deploy & Docs) | 1-1.5 hours | Deployment, README, DECISIONS.md |
| **Total** | **6-10 hours** | Buffer for debugging, refinement |

---

## Bonus Features (If Time Permits)

1. **Authentication**
   - JWT-based login for admin panel
   - Protected routes
   - Role-based access control

2. **Unit Testing**
   - Backend: Jest + Supertest
   - Frontend: React Testing Library
   - Aim for 70%+ coverage

3. **Monitoring & Observability**
   - Application error tracking (Sentry)
   - Performance monitoring
   - Logging aggregation

4. **Rate Limiting**
   - Per-IP rate limiting
   - Per-user rate limiting

5. **CI/CD Pipeline**
   - GitHub Actions
   - Automated tests on push
   - Automatic deployment

6. **Advanced Features**
   - Pagination in dashboard
   - Advanced filtering
   - Bulk actions
   - Export to CSV
   - Email notifications

---

## Success Criteria

- ✅ Application is publicly accessible
- ✅ Feedback form works end-to-end
- ✅ Admin dashboard displays analytics
- ✅ Code is clean and maintainable
- ✅ Proper error handling
- ✅ Environment variables configured
- ✅ README with clear instructions
- ✅ DECISIONS.md fully answered
- ✅ Deployment documented
- ✅ Production-ready considerations implemented

---

## Notes

- Use `.gitignore` to exclude node_modules, .env files, and build directories
- Keep API responses consistent with error messages
- Implement proper HTTP status codes
- Write descriptive commit messages
- Test locally before deployment
- Use meaningful variable and function names
- Add comments for complex logic

