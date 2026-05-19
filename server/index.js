const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  'https://employee-performance-system-1-3y5k.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all for now, restrict after exam
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options(/(.*)/, cors()); // Pre-flight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route
app.get('/', (req, res) => res.json({ message: 'API is running' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
