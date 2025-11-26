import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './db/dbConfig.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Global Error Handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});