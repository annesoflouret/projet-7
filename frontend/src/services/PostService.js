import axios from 'axios'
import apiHeader from './ApiHeader';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
})

export default {
  getPosts() {
    return apiClient.get('/posts', apiHeader())
  },
  postPost(formdata) {
    return apiClient.post('/posts', formdata, apiHeader())
  },
  putDepublishPost(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 0 }, apiHeader())
  },
  putPublishPost(id) {
    return apiClient.put('/posts/' + id + "/publish", { published: 1 }, apiHeader())
  },
  getPostComments(id) {
    return apiClient.get('/posts/' + id + "/comments", apiHeader())
  },
  postCreateComment(id, contentComment) {
    return apiClient.post('/posts/' + id + "/comments", contentComment, apiHeader())
  },
  putDepublishComment(id) {
    return apiClient.put('/posts/' + id + "/comments/publish", { published: 0 }, apiHeader())
  },
  putPublishComment(id) {
    return apiClient.put('/posts/' + id + "/comments/publish", { published: 1 }, apiHeader())
  }
}