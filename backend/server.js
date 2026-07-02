const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDatabase = require('./src/config/database');
const feedbackRoutes = require('./src/routes/feedback');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/feedback', feedbackRoutes);
app.use(errorHandler);


connectDatabase()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error('Startup failed:', error);
    process.exit(1);
  });
