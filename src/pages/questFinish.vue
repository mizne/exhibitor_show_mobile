<template>
    <div>
        <yd-icon name="checkoff"></yd-icon><br>
        请求成功，正在为你跳转！
    </div>
</template>

<script>
import { localstorageService, userService, lookerService } from '../services'
import { objFrom } from '../utils'

export default {
  name: 'questFinish',
  created() {
    const obj = objFrom(location.search)
    localstorageService.setToken(obj.access_token)
    localstorageService.setExpiresIn(obj.expires_in)

    var redirectTo = localstorageService.getRedirectUrl() // 获取重定向地址
    localstorageService.removeRedirectUrl() // 清空

    if (redirectTo && redirectTo !== '') {
      this.$router.push({ path: '/' + redirectTo }) // 如果有链接直接连接到重定向
    } else {
      this.$router.push({
        path:
          '/company' +
          `?companyId=${localstorageService.getExhibitorID()}exhibitionId=${localstorageService.getExhibitionID()}`
      }) // 反之链接到首页
    }
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
