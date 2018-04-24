import axios from 'axios'
import local from './localstorage.service'

class ExhibitionService {
  getExhibitions() {
    const token = local.getToken()
    return axios.get('/api/exhibition', { headers: { Authorization: token } })
  }
}

export default new ExhibitionService()
