import axios from 'axios'
import local from './localstorage.service'

class HelpService {
  getHelpers(exhibitorID, pageIndex = 1, pageSize = 5) {
    return axios
      .post(`/v2/data/queryList/VisitInfo`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID,
            IsThumbUp: 'true'
          }
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return res.data.result.map(e => ({
            HeadImgUrl: 'testHeadImgUrl',
            NickName: 'testNickName'
          }))
        }

        return []
      })
  }

  getHelpersCount(exhibitorID) {
    return axios
      .post(`/v2/data/queryCount/VisitInfo`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID,
            IsThumbUp: 'true'
          }
        }
      })
      .then(res => {
        return res.data.result
      })
  }
}

export default new HelpService()
