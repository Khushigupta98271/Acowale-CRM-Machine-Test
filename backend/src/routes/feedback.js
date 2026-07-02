const express = require('express');
const { body } = require('express-validator');
const {
  submitFeedback,
  getFeedbackList,
  getFeedbackById,
  getAnalyticsSummary,
} = require('../controllers/feedbackController');
const validateRequest = require('../middleware/validation');

const router = express.Router();

router.post(
  '/submit',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('category')
      .isIn(['bug', 'feature', 'performance', 'ui', 'other'])
      .withMessage('Category is required'),
    body('message')
      .isLength({ min: 5, max: 1000 })
      .withMessage('Message must be between 5 and 1000 characters'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
  ],
  validateRequest,
  submitFeedback
);

router.get('/', getFeedbackList);
router.get('/:id', getFeedbackById);
router.get('/analytics/summary', getAnalyticsSummary);

module.exports = router;
