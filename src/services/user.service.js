import axios from 'axios'
import local from './localstorage.service'

class UserService {
  getUserInfo() {
    const token = local.getToken()
    return axios.get('/api/userinfo', { headers: { Authorization: token } })
  }

  updateUserInfo(params) {
    return axios.put('/api/userinfo', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new UserService()
