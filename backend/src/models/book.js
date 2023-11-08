const { model, Schema } = require("mongoose")

const BookModel = model(
  "books",
  new Schema({
    name: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
    priceHistory: { type: Array, required: true, default: [] },
    quantityHistory: { type: Array, required: true, default: [] },
  })
)
const VendorModel = model('vendor' , new Schema ({
    name : {type : String , required: true},
    quantity : {type : String , required : true},
    titleAndCategory: {type : String}
})
)
module.exports = { BookModel , VendorModel}
