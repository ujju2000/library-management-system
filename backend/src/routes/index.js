const apiV1 = require("express")()
const { FeedBackModel, UserModel } = require("../models/user")
const { router: bookRouter } = require("./book")
const { router: userRouter } = require("./users")

apiV1.use("/book", bookRouter)
apiV1.use("/user", userRouter)

apiV1.get('/feedbacks' , async (req,res,next) => {
    try {
        const feedbacks = await FeedBackModel.find({})
        return res.status(200).json(feedbacks);
    }
    catch(err) {
        next(err);
    }
})

module.exports = { apiV1 } 
