import axios from 'axios'
import * as moment from 'moment'
import local from './localstorage.service'

class ExhibitionService {
  getExhibitions() {
    const token = local.getToken()
    return axios.get('/api/exhibition', { headers: { Authorization: token } })
  }

  fetchExhibitionInfo(exhibitionID) {
    return axios
      .post('/v2/data/query/Exhibition', {
        params: {
          recordId: exhibitionID
        }
      })
      .then(res => {
        return {
          ExName: res.data.result.ExName,
          ExStartDate: res.data.result.StartTime,
          ExEndDate: moment(res.data.result.EndTime, 'YYYY/MM/DD').format(
            'MM/DD'
          ),
          ExAddr: res.data.result.Place
        }
      })
  }
}

export default new ExhibitionService()
