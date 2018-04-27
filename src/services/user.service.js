import axios from 'axios'
import local from './localstorage.service'

class UserService {
  getUserInfo() {
    const exhibitionId = local.getExhibitionID()
    return axios
      .post(`/v2/data/GetUserInfo`, {
        params: {
          Type: '2',
          ExhibitionId: exhibitionId,
          ServiceType: 'ExhibitorShow'
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return res.data.result
        }
        return Promise.reject(new Error(res.data.resMsg))
      })
  }

  updateUserInfo(params) {
    return axios.put('/api/userinfo', params)
  }
}

export default new UserService()
