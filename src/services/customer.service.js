import axios from 'axios'
import local from './localstorage.service'

class CustomerService {
  createCustomer(params) {
    return axios.post('/api/customer', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }

  updateCustomer(params) {
    return axios.put('/api/customer', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new CustomerService()
