# API Reference - Acowale CRM Backend

**Base URL:** `http://localhost:5000` (Development)

---

## Health Check

### GET /health
Check if the server is running.

**Response (200):**
```json
{
  "status": "ok",
  "uptime": 45.123
}
```

---

## Feedback Endpoints

### 1. Submit Feedback

**POST /api/feedback/submit**

Submit new customer feedback.

**Request Body:**
```json
{
  "email": "user@example.com",
  "category": "bug",
  "message": "The login button doesn't work",
  "rating": 3
}
```

**Parameters:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| email | String | Yes | Valid email format |
| category | String | Yes | One of: `bug`, `feature`, `performance`, `ui`, `other` |
| message | String | Yes | 5-1000 characters |
| rating | Number | No | 1-5 (integer) |

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6a46a04bb93c2db4a8b6c189",
    "email": "user@example.com",
    "category": "bug",
    "message": "The login button doesn't work",
    "rating": 3,
    "isResolved": false,
    "createdAt": "2026-07-02T17:30:51.673Z",
    "updatedAt": "2026-07-02T17:30:51.673Z",
    "__v": 0
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "A valid email is required"
    },
    {
      "field": "message",
      "message": "Message must be between 5 and 1000 characters"
    }
  ]
}
```

---

### 2. Get All Feedback

**GET /api/feedback**

Retrieve feedback with pagination, filtering, and search.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | Number | 1 | Page number for pagination |
| limit | Number | 10 | Items per page |
| category | String | - | Filter by category (bug, feature, performance, ui, other) |
| search | String | - | Search in email and message (case-insensitive) |

**Examples:**
```
GET /api/feedback                    # Get first 10 items
GET /api/feedback?page=2&limit=20   # Get page 2 with 20 items
GET /api/feedback?category=bug       # Filter by bug category
GET /api/feedback?search=login       # Search for 'login'
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a46a04bb93c2db4a8b6c189",
      "email": "user@example.com",
      "category": "bug",
      "message": "The login button doesn't work",
      "rating": 3,
      "isResolved": false,
      "createdAt": "2026-07-02T17:30:51.673Z",
      "updatedAt": "2026-07-02T17:30:51.673Z",
      "__v": 0
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### 3. Get Single Feedback

**GET /api/feedback/:id**

Retrieve a specific feedback item by ID.

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | MongoDB ObjectId |

**Example:**
```
GET /api/feedback/6a46a04bb93c2db4a8b6c189
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6a46a04bb93c2db4a8b6c189",
    "email": "user@example.com",
    "category": "bug",
    "message": "The login button doesn't work",
    "rating": 3,
    "isResolved": false,
    "createdAt": "2026-07-02T17:30:51.673Z",
    "updatedAt": "2026-07-02T17:30:51.673Z",
    "__v": 0
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Feedback not found"
}
```

---

### 4. Analytics Summary

**GET /api/feedback/analytics/summary**

Get analytics dashboard data.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalFeedback": 45,
    "categoryDistribution": {
      "bug": 12,
      "feature": 8,
      "performance": 5,
      "ui": 15,
      "other": 5
    },
    "ratingAverage": 4.2,
    "recentSubmissions": [
      {
        "_id": "6a46a04bb93c2db4a8b6c189",
        "email": "user@example.com",
        "category": "bug",
        "message": "The login button doesn't work",
        "rating": 3,
        "isResolved": false,
        "createdAt": "2026-07-02T17:30:51.673Z",
        "updatedAt": "2026-07-02T17:30:51.673Z",
        "__v": 0
      }
    ]
  }
}
```

---

## Error Handling

All errors follow this format:

**Error Response (4xx, 5xx):**
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

**Common HTTP Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation failed |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Using with Frontend

### JavaScript/Fetch Example

```javascript
// Submit feedback
const submitFeedback = async (feedbackData) => {
  const response = await fetch('http://localhost:5000/api/feedback/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackData)
  });
  return response.json();
};

// Get feedback list
const getFeedback = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:5000/api/feedback?page=${page}&limit=${limit}`
  );
  return response.json();
};

// Get analytics
const getAnalytics = async () => {
  const response = await fetch('http://localhost:5000/api/feedback/analytics/summary');
  return response.json();
};
```

### Axios Example

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Submit feedback
const submitFeedback = (data) => axios.post(`${API_BASE}/feedback/submit`, data);

// Get feedback list
const getFeedback = (page = 1, limit = 10) => 
  axios.get(`${API_BASE}/feedback`, { params: { page, limit } });

// Get analytics
const getAnalytics = () => axios.get(`${API_BASE}/feedback/analytics/summary`);
```

---

## Rate Limiting

Rate limiting is configured via environment variables:
- `RATE_LIMIT_WINDOW`: Time window in minutes (default: 15)
- `RATE_LIMIT_MAX`: Max requests per window (default: 100)

---

## CORS

CORS is enabled for all origins in development. Update in production for security.

---

## Database Schema (Reference)

**Feedback Collection:**
```javascript
{
  _id: ObjectId,
  email: String (lowercase, trimmed),
  category: String (enum),
  message: String (1-1000 chars),
  rating: Number (1-5, optional),
  isResolved: Boolean,
  adminNotes: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto),
  __v: Number (Mongoose version key)
}
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Email addresses are automatically converted to lowercase
- Messages are trimmed of whitespace
- Pagination starts at page 1
- Search is case-insensitive
- Average rating shows 0 if no ratings exist
- Recent submissions returns up to 5 latest entries
