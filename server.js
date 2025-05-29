const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/BookRoute');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');



const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/book',  bookRoutes);
app.use('/api/order', orderRoutes);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
