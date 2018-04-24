import axios from 'axios'
import local from './localstorage.service'

class LookerService {
  getLookers(id) {
    return axios.get(`/api/looker/${id}`)
  }

  createLooker(companyId) {
    return axios.post(
      '/api/looker',
      {
        companyId
      },
      {
        headers: {
          Authorization: local.getToken()
        }
      }
    )
  }
}

export default new LookerService()
