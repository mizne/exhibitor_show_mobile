import axios from 'axios'
import local from './localstorage.service'

class HelpService {
  getHelpsCount(id) {
    return axios.get(`/api/help:${id}`, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new HelpService()
