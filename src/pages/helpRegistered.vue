<template>
    <div class="goods-box">
      <img :src="userInfo.HeadImgUrl" :alt="userInfo.NickName">
        <p>{{userInfo.NickName}}</p>

        <div class="registered" style="margin-top: 1.15rem;">
          <yd-cell-group>
              <yd-cell-item>
                  <span slot="left">姓名</span>
                  <yd-input slot="right" v-model="form.Name" :debug="true" placeholder="请输入你的姓名" required></yd-input>
              </yd-cell-item>

              <yd-cell-item>
                  <span slot="left">手机</span>
                  <yd-input slot="right" ref="mobReg" v-model="form.Mob" placeholder="请输入手机" regex="mobile" required></yd-input>
              </yd-cell-item>

              <yd-cell-item class="form-codeNume">
                  <span slot="left">验证码</span>
                  <input type="text" ref="codeNum" slot="right" placeholder="请输入验证码" required max="6" v-model="codeNum">
                  <yd-sendcode slot="right" v-model="codeTimer" @click.native="sendCode" bgcolor="rgba(0, 0, 0, 0)" color="#0190fe"></yd-sendcode>
              </yd-cell-item>
          </yd-cell-group>
        </div>

        <div class="registered">
          <yd-cell-group>
              <yd-cell-item>
                  <span slot="left">公司</span>
                  <yd-input slot="right" v-model="form.CompName" :debug="true" placeholder="请输入公司名称" required></yd-input>
              </yd-cell-item>

              <yd-cell-item>
                  <span slot="left">职务</span>
                  <yd-input slot="right" v-model="form.JobTitle" placeholder="请输入职务" required></yd-input>
              </yd-cell-item>


              <yd-cell-item arrow>
                  <span slot="left">城市</span>
                  <input slot="right" type="text" @click.stop="addrShow = true" v-model="addr" required readonly placeholder="请选择所在城市">
              </yd-cell-item>
          </yd-cell-group>
        </div>
        <div class="padd-box btn-weight" v-on:click="submitValue()">
            <yd-button size="large" bgcolor="#0190fe" color="#FFF">提 交</yd-button>
        </div>
        <!-- 城市选择 -->
        <yd-cityselect v-model="addrShow" :callback="citySelect" :items="district"></yd-cityselect>
    </div>
</template>

<script>
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.px/cell'
import District from 'ydui-district/dist/jd_province_city_area_id'
import { localstorageService } from '../services'

export default {
  data() {
    return {
      // 表单
      form: {
        Name: '',
        Mob: '',
        CompName: '',
        // 城市选择
        JobTitle: '',
        Province: '',
        City: ''
      },
      mobReg: '',
      codeNum: '',
      district: District,
      addrShow: false,
      codeTxt: '请输入手机验证码',
      codeTimer: false,
      formError: '',
      mesValid: false
    }
  },
  methods: {
    sendCode() {
      if (this.form.Mob.trim() === '') {
        this.$dialog.toast({
          mes: '手机号码不能为空',
          icon: 'error',
          timeout: 1000
        })
        return
      }
      this.$dialog.loading.open('发送中...')
      this.$http
        .post(
          '/api/basic/validate/sms/send',
          { phone: this.form.Mob },
          this.headers
        )
        .then(data => {
          this.codeTimer = true
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1000
          })
        })
        .catch(err => {
          this.codeTimer = false
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: '发送失败，请重新点击发送',
            icon: 'success',
            timeout: 1000
          })
        })
    },
    citySelect(ret) {
      this.form.Province = ret.itemName1
      this.form.City = ret.itemName2 + ' ' + ret.itemName3
    },
    submitValue() {
      let values = Object.values(this.form).includes('') // 判断value 是否含有空值 为布尔值
      if (values) {
        this.$dialog.toast({
          mes: '验证未通过，请确认输入',
          timeout: 1000
        })
        return
      }
      if (this.codeNum.trim() === '') {
        this.$dialog.toast({
          mes: '验证不能为空',
          icon: 'error',
          timeout: 1000
        })
        return
      }
      const body = {
        phone: this.form.Mob,
        code: this.codeNum
      }
      this.$http.post('/api/basic/validate/sms/check', body).then(data => {
        if (data.data.Data.result) {
          if (!values && this.$refs.mobReg.valid) {
            const body = {
              SetValues: {
                ...this.form,
                Id: this.userInfo.Id,
                IsConfirm: true
              }
            }
            console.log(body, this.token)
            this.$http
              .put('/api/userinfo', body, this.headers)
              .then(({ data }) => {
                if (data.StatusCode === 200 && data.Data.result) {
                  const userInfo = Object.assign({}, this.userInfo, this.form)
                  localstorageService.setUserInfo(userInfo)
                  this.$store.commit('setUserInfo', { userInfo: userInfo })
                  this.$router.push({ path: '/helpPay' })
                }
              })
          }
        } else {
          this.$dialog.toast({
            mes: '手机号码验证未通过',
            icon: 'error',
            timeout: 1000
          })
        }
      })
    }
  },
  created() {
    document.title = '注册'
    if (this.token === '') {
      // 如果没有token 则请求token 并重定向到 原链接
      this.$router.push({ path: '/questToken' })
      localstorageService.setRedirectUrl('help')
    }
    if (this.userInfo.IsConfirm) {
      this.$router.push({ path: '/helpPay' })
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserinfo
    },
    token() {
      return this.$store.getters.getToken
    },
    headers() {
      return {
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json'
        }
      }
    },
    addr() {
      return this.form.Province + this.form.City
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-box {
  width: 100%;
  min-height: 100%;
  background-color: rgb(245, 245, 245);
  padding-top: 1.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 4.125rem;
    height: 4.125rem;
    border-radius: 50%;
  }
  & > p {
    line-height: 1.5em;
  }
  .registered {
    width: 100%;
    border-top: 1px solid rgb(229, 229, 229);
    .test {
      position: absolute;
      left: 1rem;
      top: -1rem;
      font-size: 0.25rem;
      color: red;
    }
    p {
      width: 100%;
      height: 2.2rem;
      line-height: 2.2rem;
      font-size: 0.75rem;
      text-indent: 6px;
      .yd-cell-item {
        margin-top: 10px !important;
      }
      input {
        outline: none;
        border: none;
        width: 15rem;
        height: 100%;
        float: right;
        font-size: 0.75rem;
        color: rgb(153, 153, 153);
      }
    }
    .bor {
      border-top: 1px solid rgb(229, 229, 229);
      border-bottom: 1px solid rgb(229, 229, 229);
      box-sizing: border-box;
    }
    .pos {
      position: relative;
      a {
        position: absolute;
        right: 0.775rem;
        font-size: 0.6rem;
        color: rgb(88, 170, 254);
        img {
          width: 0.45rem;
          height: 0.725rem;
          margin-top: 0.7rem;
        }
      }
    }
  }
  .btn {
    width: 17.25rem;
    height: 2.3rem;
    background-color: rgb(17, 142, 234);
    color: #fff;
    line-height: 2.3rem;
    text-align: center;
    font-weight: bold;
    font-size: 0.825rem;
    border: none;
    letter-spacing: 0.25rem;
    border-radius: 5px;
    margin-top: 1.575rem;
  }
}
</style>

