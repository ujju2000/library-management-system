const router = require("express")()
const { BookModel, VendorModel } = require("../models/book")

router.get("/", async (req, res, next) => {
  try {
    const books = await BookModel.find({})
    return res.status(200).json({
      books: books.map((book) => ({
        ...book.toJSON(),
        availableQuantity: book.quantity - book.borrowedBy.length,
      })),
    })
  } catch (err) {
    next(err)
  }
})

router.get("/:bookIsbn", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.params.bookIsbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    return res.status(200).json({
      book: {
        ...book.toJSON(),
        availableQuantity: book.quantity - book.borrowedBy.length,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.body.isbn })
    if (book != null) {
      return res.status(400).json({ error: "Book with same ISBN already found" })
    }
    const newBook = await BookModel.create(req.body)
    return res.status(200).json({ book: newBook })
  } catch (err) {
    next(err)
  }
})

router.post('/purchase' , (req,res,next) => {
  
  try {
    if(req.body.publisherName && req.body.quantity > 0) {
      const newBooks = new VendorModel({
        name : req.body.publisherName,
        quantity : req.body.quantity,
        titleAndCategory : req.body.titleAndCategory
      })
      newBooks.save();
      return res.status(200).json({book : 'Placed Order to vendor'})
    }    
    return res.status(400).json({error : 'Enter all the values'});
  }
  catch(err) {
    next(err);
  }
})

router.patch("/:bookIsbn", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.params.bookIsbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    const { _id, isbn, ...rest } = req.body
    const updatedBook = await book.update(rest)
    return res.status(200).json({ book: updatedBook })
  } catch (err) {
    next(err)
  }
})

router.delete("/:bookIsbn", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.params.bookIsbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    await book.delete()
    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = { router }
