import axios from 'axios'
import local from './localstorage.service'

class PhoneService {
  checkSmsCode(phone, code) {
    return axios.post(
      '/api/sms/validate',
      {
        phone,
        code
      },
      {
        headers: {
          Authorization: local.getToken()
        }
      }
    )
  }

  sendSmsCode(phone) {
    return axios.post(
      '/api/sms/fetch',
      {
        phone
      },
      {
        headers: {
          Authorization: local.getToken()
        }
      }
    )
  }
}

export default new PhoneService()
