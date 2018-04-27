import axios from 'axios'
import local from './localstorage.service'

class LookerService {
  doLooker(exhibitorID) {
    const exhibitionID = local.getExhibitionID()
    return axios.post('/v2/data/insert/VisitInfo', {
      params: {
        ExhibitionId: exhibitionID,
        ExhibitorId: exhibitorID
      }
    })
  }

  getLookers(exhibitorID, pageIndex = 1, pageSize = 5) {
    const exhibitionID = local.getExhibitionID()
    return axios
      .get(`/v2/data/queryList/VisitInfo`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID,
            ExhibitionId: exhibitionID
          }
        }
      })
      .then(res => {
        debugger
        if (res.data.resCode === 0) {
          return res.data.result.map(e => ({
            HeadImgUrl: 'testHeadImgUrl'
          }))
        }

        return []
      })
  }

  getLookersCount(exhibitorID) {
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

export default new LookerService()
