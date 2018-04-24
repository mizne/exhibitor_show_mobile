import axios from 'axios'

class LocalStorageService {
  setUserInfo(userInfo) {
    localStorage.setItem('UserInfo', JSON.stringify(userInfo))
  }

  getUserInfo() {
    const v = localStorage.getItem('UserInfo')
    return v ? JSON.parse(v) : ''
  }

  setRedirectUrl(url) {
    localStorage.setItem('RedirectUrl', url)
  }

  getRedirectUrl() {
    return localStorage.getItem('RedirectUrl')
  }

  setToken(token) {
    localStorage.setItem('Token', token)
  }

  getToken() {
    return localStorage.getItem('Token')
  }
}

export default new LocalStorageService()
