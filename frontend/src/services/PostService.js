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
  getPostComments(id) {
    return apiClient.get('/posts/' + id + "/comments")
  },
  postPost(formdata) {
    return apiClient.post('/posts', formdata)
  },
  postCreateComment(id, contentComment) {
    return apiClient.post('/posts/' + id + "/comments", contentComment)
  },
  putDepublishComment(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 0 })
  },
  putPublishComment(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 1 })
  },
  putDepublishPost(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 0 })
  },
  putPublishPost(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 1 })

  }

}




