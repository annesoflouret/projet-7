import axios from 'axios'

const apiUser = axios.create({
  baseURL: "http://localhost:3000/api/auth"
})

const apiAuth = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


export default {
  postSignup(dataSignup) {
    return apiUser.post('/signup', dataSignup)
  },
  postLogin(dataLogin) {
    console.log(dataLogin);
    return apiUser.post('/login', dataLogin)
  },

  deleteUser() {
    return apiAuth.delete('/delete')
  }
}