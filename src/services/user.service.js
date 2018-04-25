import axios from 'axios'
import local from './localstorage.service'

class UserService {
  getUserInfo() {
    const token = local.getToken()
    const openid = local.getOpenID()
    console.log(openid)
    return axios.post('/v2/data/login', {
      params: {
        IfTheirdLogin: true,
        Type: '2',
        OpenId: openid,
        ExhibitionId: '5aab63fb98370439255c0df1'
      }
    })
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
