const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'zubi@123';
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).json({ message: 'Invalid data. Please try again.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send('Username or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin ? 'admin' : 'user',
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
