import axios from 'axios'
import local from './localstorage.service'

class ActivityService {
  getActivity(id) {
    return axios.get(`/api/activity/${id}`)
  }
}

export default new ActivityService()
