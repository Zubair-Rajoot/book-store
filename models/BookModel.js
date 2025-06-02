const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', BookSchema);
