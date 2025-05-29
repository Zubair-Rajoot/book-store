const Book = require('../models/BookModel');



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
       
        res.status(500).json({ message: "Internal server error" });
        
    }
};




exports.getBooks = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 5; 
        
        const startIndex = (page - 1) * limit;
        
        const totalBooks = await Book.countDocuments();
        console.log("Total books:", totalBooks);
        const books = await Book.find().skip(startIndex).limit(limit);
        
        console.log("Books retrieved:", books);
        res.status(200).json({
            books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks
        });
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
}



exports.updateBook = async (req, res) => {
     try {
    const book  = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'book update successfully', book });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
}



exports.deleteBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'book not found' });
      }
      res.json({ message: 'book deleted successfully' });
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
};


