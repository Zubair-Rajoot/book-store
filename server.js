const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/BookRoute');



const app = express();
connectDB();


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/book',  bookRoutes)




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
