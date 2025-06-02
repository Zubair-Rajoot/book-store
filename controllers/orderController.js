const Order = require('../models/orderSchema');
const User = require('../models/userModel');
const Book = require('../models/BookModel');

exports.createOrder = async (req, res) => {
  try {
    const { userId, bookId, borrowFrom, borrowTo } = req.body;

    if (!userId || !bookId || !borrowFrom || !borrowTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const book = await Book.findById(bookId);
    console.log('Book found:', book);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrder = await Order.create({
      user: userId,
      book: bookId,
      borrowFrom: new Date(borrowFrom),
      borrowTo: new Date(borrowTo),
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;

    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .skip(startIndex)
      .limit(limit)
      .populate('user', 'name email')
      .populate('book', 'title');

    res.status(200).json({
      orders,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};
