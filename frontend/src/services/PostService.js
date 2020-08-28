import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPosts() {
    return apiClient.get('/posts')
  },
  /*getPost(id) {

  }*/
}

