const Book = require('../models/BookModel');


//create a book 
exports.createBook = async (req, res) => {
    try {
        const book = await Book.create({
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
    });

    console.log("Book created:", book);
    res.status(201).json({
        message: "Book created successfully",
        book
    });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};



//get all books 
exports.getBooks = async (req, res) => {
    try {
        //   console.log('Fetching tasks for userId:', req.user?._id); 
        // const books = await Book.find({ userId: req.user._id });
         const books = await Book.find();
        console.log("Books :", books);
        res.status(200).json(books);
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//update book 
exports.updateBook = async (req, res) => {
     try {
    const book  = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'book update successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


//delete book
exports.deleteBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'book not found' });
      }
      res.json({ message: 'book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book :', error);
      res.status(500).json({ message: 'Server error' });
    }
};


