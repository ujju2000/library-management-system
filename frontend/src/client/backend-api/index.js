const { BookApi } = require("./book")
const { UserApi } = require("./user")


const getFeedback = async () => {
  const res = await fetch('/v1/feedbacks' , {method : 'GET'});
  return res.json();
} 
const BackendApi = {
  book: BookApi,
  user: UserApi,
  getFeedback : getFeedback
}

module.exports = { BackendApi }
