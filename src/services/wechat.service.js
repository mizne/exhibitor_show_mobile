import axios from 'axios'
import local from './localstorage.service'

class WechatService {
  getJsConfig() {
    return axios.get('/oauth/wechat-jsconfig').then(res => res.data)
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
