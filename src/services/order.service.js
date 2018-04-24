import axios from 'axios'
import local from './localstorage.service'

class OrderService {
  getOrder(params) {
    return axios.post('/api/wechat/order', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new OrderService()
