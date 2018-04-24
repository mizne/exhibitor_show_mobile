import axios from 'axios'
import local from './localstorage.service'

class WechatService {
  getJsConfig(...args) {
    return axios.get(...args)
  }

  getJsConfigShare(url) {
    return axios.post('/api/wechat/config/share', { url })
  }

  getUnifiedOrder(params) {
    return axios.post('/api/wechat/unifiedorder', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }
}

export default new WechatService()
