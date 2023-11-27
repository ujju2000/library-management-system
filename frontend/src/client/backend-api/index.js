const { BookApi } = require("./book")
const { UserApi } = require("./user")


const getFeedbacks = async () => {
  const res = await fetch('/v1/feedbacks' , {method : 'GET'});
  return res.json();
} 
const getStudents = async() => {
 const res = await fetch('/v1/user', {method : 'GET'});
 return res.json();
}
const BackendApi = {
  book: BookApi,
  user: UserApi,
  getFeedbacks : getFeedbacks,
  getStudents : getStudents
}
module.exports = { BackendApi }
