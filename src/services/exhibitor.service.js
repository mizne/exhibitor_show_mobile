import axios from 'axios'
import local from './localstorage.service'

class ExhibitorService {
  createExhibitor(params) {
    return axios.post('/api/exhibitor', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new ExhibitorService()
