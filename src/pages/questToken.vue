<template>
    <div>
        <img src="../assets/img/loading.gif" alt="加载中..."><br>
        正在为你链接登录...
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'questToken',
  created() {
    this.questLogin()
  },
  methods: {
    questLogin() {
      var returnUri = 'http://localhost/questFinish'
      var uri = this.addQueryString(
        'http://auth.xiaovbao.cn/oauth/authorize?provider=wechat-wap',
        {
          client_id: '',
          redirect_uri: returnUri,
          response_type: 'token'
        }
      )
      window.location.href = uri
    },
    addQueryString(uri, parameters) {
      var delimiter = uri.indexOf('?') == -1 ? '?' : '&'
      for (var parameterName in parameters) {
        var parameterValue = parameters[parameterName]
        uri +=
          delimiter +
          encodeURIComponent(parameterName) +
          '=' +
          encodeURIComponent(parameterValue)
        delimiter = '&'
      }
      return uri
    }
  }
}
</script>

<style scoped lang="scss">
div {
  text-align: center;
  img {
    display: inline-block;
    margin: 100px 0 50px;
  }
}
</style>
