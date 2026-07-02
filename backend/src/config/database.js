const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  if (!uri) {
    console.warn('MONGODB_URI is not defined. Starting without database connection. Set it to enable full CRUD support.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error("MongoDB Connection Failed:");
    console.error("Error:", error.message);
    console.error("Full Error Details:", error);
    return false;
  }
};

module.exports = connectDatabase;
