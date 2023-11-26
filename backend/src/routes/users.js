const router = require("express")()
const { BookModel } = require("../models/book")
const { UserModel, FeedBackModel } = require("../models/user")

const omitPassword = (user) => {
  const { password, ...rest } = user  
  return rest
}

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find({})
    return res.status(200).json({ users: users.map((user) => omitPassword(user.toJSON())) })
  } catch (err) {
    next(err)
  }
})

router.post("/borrow", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.body.isbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    if (book.borrowedBy.length === book.quantity) {
      return res.status(400).json({ error: "Book is not available" })
    }
    const user = await UserModel.findById(req.body.userId)
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (book.borrowedBy.includes(user.id)) {
      return res.status(400).json({ error: "You've already borrowed this book" })
    }
    await book.update({ borrowedBy: [...book.borrowedBy, user.id] })
    const updatedBook = await BookModel.findById(book.id)
    return res.status(200).json({
      book: {
        ...updatedBook.toJSON(),
        availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.post("/return", async (req, res, next) => {
  try {
    const book = await BookModel.findOne({ isbn: req.body.isbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    const user = await UserModel.findById(req.body.userId)
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (!book.borrowedBy.includes(user.id)) {
      return res.status(400).json({ error: "You need to borrow this book first!" })
    }
    console.log("user.id", user.id)
    console.log("book.borrowedBy", book.borrowedBy)
    console.log(
      "filtered",
      book.borrowedBy.filter((borrowedBy) => !borrowedBy.equals(user.id))
    )
    await book.update({
      borrowedBy: book.borrowedBy.filter((borrowedBy) => !borrowedBy.equals(user.id)),
    })
    const updatedBook = await BookModel.findById(book.id)
    return res.status(200).json({
      book: {
        ...updatedBook.toJSON(),
        availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get("/borrowed-books", async (req, res, next) => {
  try {
    const result = await BookModel.find({ "borrowedBy": { "$in": req.session.userId } })
    return res.status(200).json({ books: result })
  } catch (err) {
    next(err)
  }
})

router.get("/profile", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.status(200).json({ user: omitPassword(user.toJSON()) })
  } catch (err) {
    next(err)
  }
})
router.post('/register' , async(req,res,next) => {
  try {
    if(req.body.username === 'admin') {
      return res.status(404).json({error : 'Cannot login with admin username'})
    }
    const user = await UserModel.findOne({username : req.body.username});
        if(user) {
            return res.status(404).json({error : 'User alredy exists'});
        }
        else {
            const newUser = new UserModel({
                name : req.body.name,
                username : req.body.username,
                password : req.body.password,
                role : 'guest'
            })

            newUser.save();
          
          return res.status(200).json({user : omitPassword(newUser.toJSON())});
        }
         
  }
  catch(err) {
    next(err);
  }
})
router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username })
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({ error: "Invalid password" })
    }
    console.log("user.id", user.id)
    req.session.userId = user.id
    return res.status(200).json({ user: omitPassword(user.toJSON()) })
  } catch (err) {
    next(err)
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy()
  return res.status(200).json({ success: true })
})

router.post('/feedback' , (req,res,next) => {
  try {
    const newFeedback = new FeedBackModel({
      name : req.body.name,
      email : req.body.email,
      comment : req.body.comment
    })
    newFeedback.save();
    return res.status(200).json({user : 'Feedback sent successfully'});
  }

  catch(err) {
    next(err);
  }
})
module.exports = { router }
