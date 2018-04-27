import axios from 'axios'
import local from './localstorage.service'

class LikeService {
  hasLike(exhibitorID) {
    return Promise.resolve(null)
  }

  doLike(exhibitorID) {
    return Promise.resolve(null)
  }

  getLikers(exhibitorID) {
    return axios
      .get(`/v2/data/queryList/Promotion`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID
          }
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return res.data.result.map(e => ({
            NickName: 'testNickName'
          }))
        }

        return []
      })
  }

  getLikersCount(exhibitorID) {
    return axios
      .get(`/v2/data/queryCount/Promotion`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID
          }
        }
      })
      .then(res => {
        return res.data.result
      })
  }
}

export default new LikeService()
