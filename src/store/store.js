import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
  state: {
    access_token: '', // 请求token
    compId: '', // 邀请函id
    userInfo: '', // 用户信息
    customerInfo: '', // 展会信息
    jsConfig: '',
    invite: '', // 邀请函所有信息 包括展会 banner...
    myCompId: '' // 新增作品的compId
  },
  getters: {
    getToken: state => {
      // 判断本地是否含有token 是否过期
      const token = localStorage.getItem('access_token')
      const expires_in = localStorage.getItem('expires_in')
      if (!token || token !== '' || expires_in > Date.now()) {
        return state.access_token !== '' ? state.access_token : token
      } else {
        return ''
      }
      // const token = 'Bearer JyNh3LN1Roz2cvOyjA8uC2eYa-V3U3BNaAwAe9zKkiHbvnoX8CCa9w9gee5NjxOT_vALtrFmJwLZe2elekqY0w1oXfwfIfW0aMGM9ygNMSFIYRIoNfkXLQqGkyZ8dZEzF13JWAv1O383Jp5HFrGjzGDzSP9gEyD7s75NjtLvjCA5YNxqn7G08JPRBjlCEsBn4zg5c22yUNAUztRdxL8wrTsUpvbup5VQDEkTxjh_ws1AHmmdghJYu86sxqjlXJnpZ3Fey1KsU1uf74mgiemMdhWUt2ZOe9cNQMb9YrpEC9L1tpmS70PRgRJwkvnKA614lnFI9zOt5ryw5naAYKHgFWRVWs-sH7PZMShzhOCBgpHRWhxU';
      // return token;
    },
    getCompId: state => {
      // 判断本地是否含有compId
      const hasCompId = localStorage.getItem('compId')
      if (state.compId === '' && hasCompId && hasCompId !== '') {
        return hasCompId
      }
      return state.compId
    },
    getUserinfo: state => {
      // 获取用户id
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (state.userInfo === '' && userInfo && userInfo !== '') {
        return userInfo
      }
      return state.userInfo
    },
    getCustomerInfo: state => {
      // 获取用户id
      const customerInfo = JSON.parse(localStorage.getItem('customerInfo'))
      if (state.customerInfo === '' && customerInfo && customerInfo !== '') {
        return customerInfo
      }
      return state.customerInfo
    },
    getIsConfirm: state => {
      if (state.userInfo !== '' && state.userInfo.hasOwnProperty('IsConfirm')) {
        return state.userInfo.IsConfirm
      } else {
        return ''
      }
    },
    getJsConfig: state => {
      if (state.jsConfig !== '' && state.jsConfig) {
        return state.jsConfig
      } else {
        return ''
      }
    },
    getInvite: state => {
      const inviteInfo = JSON.parse(localStorage.getItem('invite'))
      if (state.invite !== '' && inviteInfo && inviteInfo !== '') {
        return state.invite
      } else {
        return inviteInfo
      }
    }
  },
  mutations: {
    setMyCompId(state, str) {
      state.myCompId = str.myCompId
    },
    setToken(state, str) {
      state.access_token = 'Bearer ' + str.token
    },
    setCompId(state, str) {
      // 判断本地是否含有compId
      const hasCompId = localStorage.getItem('compId')
      if (str.compId === hasCompId && hasCompId && hasCompId !== '') {
        state.compId = hasCompId
      } else {
        // localStorage.clear();
        localStorage.setItem('compId', str.compId)
        state.compId = str.compId
      }
    },
    setJsConfig(state, str) {
      // 微信config 配置
      state.jsConfig = str.jsConfig
    },
    setUserInfo(state, data) {
      // 判断本地是否含有compId
      const userInfo = localStorage.getItem('userInfo')
      if (data.userInfo === '' && userInfo && userInfo !== '') {
        state.userInfo = userInfo
      } else {
        state.userInfo = data.userInfo
      }
    },
    setCustomerInfo(state, data) {
      // 判断本地是否含有compId
      const customerInfo = localStorage.getItem('customerInfo')
      if (data.customerInfo === '' && customerInfo && customerInfo !== '') {
        state.customerInfo = customerInfo
      } else {
        state.customerInfo = data.customerInfo
      }
    },
    setInvite(state, data) {
      // 判断本地是否含有compId
      const Invite = localStorage.getItem('Invite')
      if (data.invite === '' && Invite && Invite !== '') {
        state.invite = Invite
      } else {
        state.invite = data.invite
      }
    }
  }
})
