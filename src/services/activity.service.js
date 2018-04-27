import axios from 'axios'
import * as moment from 'moment'
import local from './localstorage.service'

class ActivityService {
  getActivities(exhibitorID, pageIndex = 1, pageSize = 10) {
    return axios
      .post(`/v2/data/queryList/Promotion`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID
          }
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return res.data.result.map(e => ({
            StartDate: moment(e.StartTime, 'YYYY-MM-DD HH:mm:ss').format(
              'MM-DD HH:mm'
            ),
            EndDate: moment(e.EndTime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
            Name: e.name,
            Id: e.RecordId
          }))
        }

        return []
      })
  }

  getAcitivityDetail(activityID) {
    return axios
      .post(`/v2/data/query/Promotion`, {
        params: {
          recordId: activityID
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return {
            Name: res.data.result.name,
            Addr: res.data.result.Place,
            ShowDate: `${moment(
              res.data.result.StartTime,
              'YYYY-MM-DD HH:mm:ss'
            ).format('MM-DD HH:mm')} - ${moment(
              res.data.result.EndTime,
              'YYYY-MM-DD HH:mm:ss'
            ).format('HH:mm')}`,
            Summary: res.data.result.Banner
          }
        }

        return {}
      })
  }

  getActivitiesCount(exhibitorID) {
    return axios
      .post(`/v2/data/queryCount/Promotion`, {
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

export default new ActivityService()
