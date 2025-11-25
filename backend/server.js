import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConfig.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();
connectDB()
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});