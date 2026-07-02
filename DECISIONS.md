# Technical Decisions & Reflections

## 1. Why did you choose this technology stack?

I chose the MERN ecosystem with React (Vite), Node.js, Express.js, and MongoDB because it provides a fast and efficient way to build full-stack JavaScript applications. Using JavaScript across both frontend and backend reduced context switching and accelerated development. React with Vite offered a modern development experience with fast builds and hot module replacement, while Express.js provided a lightweight and flexible backend framework. This stack also aligns well with current industry practices for building scalable web applications.

---

## 2. Why did you choose this database?

I chose MongoDB because the application data model is relatively simple and document-oriented. Feedback entries contain varying attributes and metadata, which fit naturally into MongoDB's flexible schema design. MongoDB also integrates seamlessly with Node.js through Mongoose, enabling rapid development, schema validation, and straightforward querying without requiring complex relational models.

---

## 3. Why did you structure your application this way?

The application follows a separation-of-concerns architecture:

### Backend
- **Routes**: Handle API endpoint definitions.
- **Controllers**: Contain business logic and request processing.
- **Models**: Define database schemas and data access patterns.
- **Middleware**: Manage validation, security, and error handling.

### Frontend
- **Components**: Reusable UI elements.
- **Pages**: Route-level screens.
- **Services**: Centralized API communication layer.
- **Hooks/Utilities**: Shared logic and helper functions.

This structure improves maintainability, scalability, readability, and testing. It also makes it easier to extend the application with additional features in the future.

---

## 4. What trade-offs did you make due to time constraints?

Due to time constraints, I prioritized delivering a complete and functional application over implementing advanced production-level features. Some trade-offs included:

- Basic authentication and authorization mechanisms.
- Limited automated testing coverage.
- Minimal caching and performance optimization.
- Basic analytics implementation.
- Simplified deployment and monitoring setup.
- Limited UI polish and accessibility improvements.

The primary focus was on functionality, maintainability, and meeting the assignment requirements.

---

## 5. What would you improve if you had one more week?

If I had an additional week, I would:

- Implement comprehensive unit and integration testing.
- Add JWT-based authentication and role-based access control.
- Introduce Redis caching for analytics endpoints.
- Add pagination optimization and database indexing.
- Improve error handling and monitoring using centralized logging.
- Enhance UI/UX and accessibility compliance.
- Add Docker support and CI/CD pipelines.
- Implement rate limiting with distributed storage.
- Improve analytics dashboards with richer visualizations.

---

## 6. What was the most difficult technical challenge you faced?

The most challenging aspect was ensuring seamless integration between the frontend and backend during deployment. Managing environment variables, API endpoint configuration, CORS policies, and coordinating deployments across Vercel and Render required careful debugging and configuration management. Additionally, designing a maintainable architecture while balancing development speed and scalability was an important challenge.

---

## 7. Which AI tools did you use?

I used the following AI-assisted development tools:

- ChatGPT
- GitHub Copilot
- AI-assisted code completion features available in modern IDEs

These tools were used to accelerate development, debugging, documentation, and code review.

---

## 8. Share one instance where AI helped you.

AI significantly helped during deployment troubleshooting and debugging. It assisted in identifying configuration issues related to environment variables, API routing, deployment pipelines, and frontend-backend integration, which accelerated the resolution process and reduced debugging time.

---

## 9. Share one instance where you disagreed with AI and why.

In one instance, AI suggested a quick implementation approach that introduced unnecessary complexity and reduced maintainability. Instead, I chose a more structured architecture using separate routes, controllers, and service layers because it provided better long-term maintainability and scalability despite requiring slightly more initial effort.

---

## 10. What would break first if this application suddenly had 100,000 users?

The first bottleneck would likely be the backend API and database layer due to:

- Increased database query load.
- Lack of caching mechanisms.
- Limited horizontal scaling.
- Render free-tier resource constraints.
- Analytics aggregation queries becoming expensive.

To support 100,000 users, I would introduce:
- Database indexing and query optimization.
- Redis caching.
- Load balancing.
- Horizontal scaling of backend services.
- CDN usage for static assets.
- Background job processing for analytics.

---

## 11. What is one thing in this assignment that you would improve, change, or challenge?

If I could improve one aspect of the assignment, I would introduce a more clearly defined deployment and scalability requirement. This would allow candidates to demonstrate architectural decision-making, performance optimization, monitoring, and production-readiness practices in addition to feature implementation.