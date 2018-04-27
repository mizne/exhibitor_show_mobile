import axios from 'axios'
import local from './localstorage.service'

class ExhibitorService {
  createExhibitor(params) {
    return axios.post('/api/exhibitor', params, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }

  fetchExhibitorInfo(exhibitorID) {
    return axios
      .post('/v2/data/query/Exhibitor', {
        params: {
          recordId: exhibitorID
        }
      })
      .then(res => {
        return {
          CompName: res.data.result.CompanyName,
          Logo: res.data.result.Logo,
          Booth: res.data.result.BoothNo,
          ShortName: res.data.result.ShortName,
          Introduction: res.data.result.Introduction
        }
      })
  }
}

export default new ExhibitorService()
