import axios from 'axios'
import local from './localstorage.service'

class LikeService {
  getLikesCount(id) {
    return axios.get(`/api/like:${id}`, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new LikeService()
