import axios from 'axios'
import apiHeader from './ApiHeader';

const apiUser = axios.create({
  baseURL: "http://localhost:3000/api/auth"
})

export default {
  postSignup(dataSignup) {
    return apiUser.post('/signup', dataSignup, apiHeader(false))
  },
  postLogin(dataLogin) {
    return apiUser.post('/login', dataLogin, apiHeader(false))
  },
  deleteUser() {
    return apiUser.delete('/delete', apiHeader())
  }
}