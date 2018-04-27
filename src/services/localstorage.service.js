import axios from 'axios'

class LocalStorageService {
  setUserInfo(userInfo) {
    localStorage.setItem('UserInfo', JSON.stringify(userInfo))
  }

  getUserInfo() {
    const v = localStorage.getItem('UserInfo')
    return v ? JSON.parse(v) : ''
  }

  setCustomerInfo(customerInfo) {
    localStorage.setItem('CustomerInfo', JSON.stringify(customerInfo))
  }

  getCustomerInfo() {
    const v = localStorage.getItem('CustomerInfo')
    return v ? JSON.parse(v) : ''
  }

  setInviteInfo(inviteInfo) {
    localStorage.setItem('InviteInfo', JSON.stringify(inviteInfo))
  }

  getInviteInfo() {
    const v = localStorage.getItem('InviteInfo')
    return v ? JSON.parse(v) : ''
  }

  setRedirectUrl(url) {
    localStorage.setItem('RedirectUrl', url)
  }

  getRedirectUrl() {
    return localStorage.getItem('RedirectUrl')
  }

  removeRedirectUrl() {
    localStorage.removeItem('RedirectUrl')
  }

  setToken(token) {
    localStorage.setItem('Token', token)
  }

  getToken() {
    const token = localStorage.getItem('Token')
    if (token) {
      const hasExpired = Number(this.getExpiresIn()) <= new Date().getTime()
      return hasExpired ? '' : token
    }
    return ''
  }

  setExpiresIn(expiresIn) {
    localStorage.setItem('ExpiresIn', Date.now() + Number(expiresIn) * 1000)
  }

  getExpiresIn() {
    return Number(localStorage.getItem('ExpiresIn'))
  }

  setExhibitorID(id) {
    localStorage.setItem('ExhibitorID', id)
  }

  getExhibitorID() {
    return localStorage.getItem('ExhibitorID') || ''
  }

  setExhibitionID(id) {
    localStorage.setItem('ExhibitionID', id)
  }

  getExhibitionID() {
    return localStorage.getItem('ExhibitionID') || ''
  }

  clear() {
    localStorage.clear()
  }
}

export default new LocalStorageService()
