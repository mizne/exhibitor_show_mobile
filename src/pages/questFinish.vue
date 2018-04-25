<template>
    <div>
        <yd-icon name="checkoff"></yd-icon><br>
        请求成功，正在为你跳转！
    </div>
</template>

<script>
import { localstorageService, userService } from '../services'
import { objFrom } from '../utils'

export default {
  name: 'questFinish',
  data() {
    return {}
  },
  created() {
    const obj = objFrom(location.search)
    localstorageService.setToken('Bearer ' + obj.access_token)
    localstorageService.setOpenID(obj.openid)
    localstorageService.setExpiresIn(obj.expires_in)

    this.$store.commit('setToken', { token: obj.access_token })
    // 请求成功后 获取用户信息
    userService
      .getUserInfo()
      .then(({ data }) => {
        if (data.StatusCode === 200) {
          this.$store.commit('setUserInfo', { userInfo: data.Data })

          var redirectTo = localStorage.getItem('redirectTo') // 获取重定向地址
          localStorage.removeItem('redirectTo') // 清空

          if (redirectTo && redirectTo !== '') {
            this.$router.push({ path: '/' + redirectTo }) // 如果有链接直接连接到重定向
          } else {
            this.$router.push({
              path: '/compid/' + this.$store.getters.getCompId
            }) // 反之链接到首页
          }
        }
      })
      .catch(res => {
        debugger
        if (res.response.status === 401) {
          // token无效 清除localStorage
          const compId = localStorage.getItem('compId')
          localStorage.clear()
          localStorage.setItem('compId', compId)
        }
      })
  }
}
</script>

<style scoped lang="scss">
div {
  text-align: center;
  .yd-icon-checkoff {
    color: rgb(24, 187, 24);
    font-size: 40px !important;
    display: inline-block;
    margin: 100px 0 50px;
  }
}
</style>
