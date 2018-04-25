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

  setExpiresIn(expiresIn) {
    localStorage.setItem('ExpiresIn', Date.now() + Number(expiresIn) * 1000)
  }

  getExpiresIn() {
    return Number(localStorage.getItem('ExpiresIn'))
  }

  setOpenID(openid) {
    localStorage.setItem('OpenID', openid)
  }

  getOpenID() {
    return localStorage.getItem('OpenID') || ''
  }
}

export default new LocalStorageService()
