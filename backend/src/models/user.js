const { model, Schema } = require("mongoose")

const UserModel = model(
  "users",
  new Schema({
    name : {type : String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  })
)

const FeedBackModel =  model(
  "feedback", 
  new Schema({
    name : {type : String, required : true},
    email :{type : String , required : true},
    comment : {type : String} 
  })
)

module.exports = { UserModel , FeedBackModel }
