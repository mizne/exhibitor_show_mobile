import axios from 'axios'
import local from './localstorage.service'

class CompanyService {
  getCompanyInfo(id) {
    return axios.get(`/api/company/:${id}`, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }

  getShareDesc(id) {
    return axios.get(`/api/company/share/:${id}`)
  }
}

export default new CompanyService()
