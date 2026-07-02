const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res, next) => {
  try {
    const { email, category, message, rating } = req.body;
    const feedback = await Feedback.create({ email, category, message, rating });
    return res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const category = req.query.category;
    const search = req.query.search;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { email: new RegExp(search, 'i') },
        { message: new RegExp(search, 'i') },
      ];
    }

    const total = await Feedback.countDocuments(filter);
    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: feedback,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    return res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};

exports.getAnalyticsSummary = async (req, res, next) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const categories = ['bug', 'feature', 'performance', 'ui', 'other'];
    const categoryDistribution = {};

    for (const category of categories) {
      categoryDistribution[category] = await Feedback.countDocuments({ category });
    }

    const ratingStats = await Feedback.aggregate([
      { $match: { rating: { $exists: true } } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);

    const recentSubmissions = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        totalFeedback,
        categoryDistribution,
        ratingAverage: ratingStats[0]?.averageRating || 0,
        recentSubmissions,
      },
    });
  } catch (error) {
    next(error);
  }
};
