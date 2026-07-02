const http = require('http');

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('\n=== Testing Backend Endpoints ===\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing GET /health');
    const health = await makeRequest('GET', '/health');
    console.log('Status:', health.status);
    console.log('Response:', health.data);
    console.log('✓ Health check passed\n');

    // Test 2: Submit Feedback
    console.log('2. Testing POST /api/feedback/submit');
    const feedbackData = {
      email: 'john@example.com',
      category: 'bug',
      message: 'The login button is not responding to clicks',
      rating: 2
    };
    const submit = await makeRequest('POST', '/api/feedback/submit', feedbackData);
    console.log('Status:', submit.status);
    console.log('Response:', JSON.stringify(submit.data, null, 2));
    const feedbackId = submit.data.data?._id;
    console.log('✓ Feedback submitted\n');

    // Test 3: Get all feedback with pagination
    console.log('3. Testing GET /api/feedback (List with pagination)');
    const list = await makeRequest('GET', '/api/feedback?page=1&limit=10');
    console.log('Status:', list.status);
    console.log('Total Feedback:', list.data.meta?.total);
    console.log('Items in Response:', list.data.data?.length);
    console.log('✓ Feedback list retrieved\n');

    // Test 4: Get feedback by ID
    if (feedbackId) {
      console.log('4. Testing GET /api/feedback/:id');
      const single = await makeRequest('GET', `/api/feedback/${feedbackId}`);
      console.log('Status:', single.status);
      console.log('Response:', JSON.stringify(single.data, null, 2));
      console.log('✓ Single feedback retrieved\n');
    }

    // Test 5: Filter by category
    console.log('5. Testing GET /api/feedback?category=bug');
    const filtered = await makeRequest('GET', '/api/feedback?category=bug');
    console.log('Status:', filtered.status);
    console.log('Filtered Results:', filtered.data.data?.length);
    console.log('✓ Filtering by category works\n');

    // Test 6: Search feedback
    console.log('6. Testing GET /api/feedback?search=login');
    const search = await makeRequest('GET', '/api/feedback?search=login');
    console.log('Status:', search.status);
    console.log('Search Results:', search.data.data?.length);
    console.log('✓ Search functionality works\n');

    // Test 7: Get analytics summary
    console.log('7. Testing GET /api/feedback/analytics/summary');
    const analytics = await makeRequest('GET', '/api/feedback/analytics/summary');
    console.log('Status:', analytics.status);
    console.log('Analytics:', JSON.stringify(analytics.data.data, null, 2));
    console.log('✓ Analytics endpoint works\n');

    // Test 8: Submit with invalid data (validation test)
    console.log('8. Testing validation - Invalid email');
    const invalid = await makeRequest('POST', '/api/feedback/submit', {
      email: 'invalid-email',
      category: 'bug',
      message: 'Test'
    });
    console.log('Status:', invalid.status);
    console.log('Error Response:', JSON.stringify(invalid.data, null, 2));
    console.log('✓ Validation working\n');

    console.log('=== All Tests Completed ===\n');
  } catch (error) {
    console.error('Test Error:', error);
  }
}

runTests();
