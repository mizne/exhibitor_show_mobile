<template>
    <div style="padding-bottom: 50px;">
        <div class="card-border z-2">
            <div class="card-bg">
                <img src="../assets/img/invite/bg-1.jpg">
            </div>
            <div class="content">
                <img src="../assets/img/invite/bg-txt.png">
                <div class="card-swipe" :class="{'active-swipe':banner}">
                    <swiper :options="swiperOption" v-if="banner">
                        <swiper-slide v-if="banner.Design"><img :src="banner.Design" alt="展位效果图" width="100%" height="100%"></swiper-slide>
                        <swiper-slide v-if="banner.Position"><img :src="banner.Position" alt="展位位置图" width="100%" height="100%"></swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <div class="m-avatar"><img :src="inviteData.Logo"></div>
                </div>
                <div class="card-info">
                    <h2 class="u-txt_gradient">{{inviteData.CompName}}</h2>
                    <p class="title">诚邀您为我助力并莅临展台</p>
                    <span class="u-btn btn-linaer addr"><i class="icon iconfont icon-dot"></i>{{inviteData.Booth}}</span>
                    <p class="sub-title">{{inviteData.ExName}}</p>
                    <p class="date">{{inviteData.ExStartDate}} ~ {{inviteData.ExEndDate}} {{inviteData.ExAddr}}</p>
                </div>
            </div>
        </div>
        <div class="card card-intro">
            <div class="card-bg">
                <img src="../assets/img/invite/bg-2.jpg">
            </div>
            <div class="content">
                <div class="intro-img">
                    <img src="../assets/img/invite/bg-title.jpg" :alt="inviteData.ShortName">
                </div>
                <p>{{inviteData.Introduction}}</p>
            </div>
        </div>
        <div class="card-carousel" v-if="!!productList.length">
            <div class="card-bg"  >
                <img src="../assets/img/invite/bg-3.jpg">
            </div>
            <div class="content" >
                <router-link :to="'/productAll'">
                    <p class="title">全部产品</p>
                </router-link>
                <Card3d :product="productList"></Card3d>
            </div>
        </div>
        <div class="card card-activity" v-if="!!activityList.length"><!--  活动 -->
            <div class="card-bg">
                <img src="../assets/img/invite/bg-4.jpg">
            </div>
            <div class="card-list-box">
                <router-link v-for="(activity, index) in activityList" :key="'activity' + index" :to="'/detailed/' + activity.Id">
                    <div class="card-list">
                        <span class="u-circle">
                            <i class="icon iconfont" :class="{'icon-start': index % 2 === 0, 'icon-ball': index % 2 === 1}" ></i>
                        </span>
                        <div class="card-list_item">
                            <h4>{{activity.Name}}</h4>
                            <div class="list-info">{{activity.StartDate}} ~ {{activity.EndDate}}</div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="m-loadmore" v-bind:class="{ load: loadingActivity }"  v-if="activityList.length !== activityTotalCount">
                <span class="default" v-on:click="myloadMore('loadingActivity')" @click="loadMoreActivity" v-if="neddLoadMoreActivities">更多</span>
                <loading></loading>
            </div>
        </div>
        <div class="card-border" v-if="helpList.length"> <!-- 助力 -->
            <div class="card-bg">
                <img src="../assets/img/invite/bg-5.jpg">
            </div>
            <div class="card-head-box" >
                <h4 class="u-txt_gradient">共{{helpTotalCount}}人助力</h4>
                <div class="card-head_container">
                    <div class="card-head-list" v-for="(help, index) in helpList" :key="'help' + index">
                        <img :src="help.HeadImgUrl">
                        <p>{{help.NickName}}</p>
                    </div>
                </div>
            </div>
            <div class="m-loadmore" v-bind:class="{ load: loadingHelp }" v-if="helpList.length !== helpTotalCount">
                <span class="default" v-on:click="myloadMore('loadingHelp')" v-if="needLoadMoreHelp" @click="loadMoreHelp">更多</span>
                <loading></loading>
            </div>
        </div>
        <div class="card-head2" v-if="!!lookers.length"> <!--围观-->
            <div class="card-bg">
                <img src="../assets/img/invite/bg-6.jpg">
            </div>
            <div class="card-head-box" >
                <h4 class="u-txt_gradient" style="margin-top:10px;">共{{lookerTotalCount}}人围观</h4>
                <div class="card-head_container" v-if="lookers">
                    <div class="card-head-list2" v-for="(item, index) in lookers" :key="'peo' + index">
                        <img :src="item.HeadImgUrl" >
                    </div>
                </div>
            </div>
            <div class="m-loadmore" v-bind:class="{ load: loadingLooker }" v-if="lookers.length>9">
                <span class="default" v-on:click="myloadMore('loadingLooker')" v-if="needLoadMoreLooker" @click="loadMoreLookers">更多</span>
                <loading></loading>
            </div>
        </div>
        <div class="card-like"> <!-- 点赞 -->
            <div class="u-heart">
                <div class="dot-box">
                    <img src="../assets/img/invite/dot-1.png">
                    <img src="../assets/img/invite/dot-1.png">
                    <img src="../assets/img/invite/dot-1.png">
                </div>
                <div class="three-circle"><img src="../assets/img/invite/circle-3.png"></div>
                <div class="two-circle"><img src="../assets/img/invite/circle-2.png"></div>
                <div class="one-circle"><img src="../assets/img/invite/circle-1-1.png"></div>
                <div class="myheart" v-on:click="doLike()">
                    <img v-if="!hasLike" src="../assets/img/invite/myheart.png"><!-- 心 -->
                    <img v-if="hasLike" src="../assets/img/invite/myheart-like.png"><!-- 心 -->
                </div>
            </div>
            <div class="many-like u-txt_gradient">共{{likeTotalCount}}个人点赞</div>
            <div class="who-like">
            <span v-for="(like, index) in likeList" :key="'zan' + index">{{like.NickName}}</span>
            </div>
        </div>

        <div class="support" v-on:click="helpHe()"><span class="u-txt_gradient">支持TA</span></div>

    </div>
</template>

<script>
import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { mapSate } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import CardBorder from '../components/card-border.vue'
import loading from '../components/loading.vue'
import Card3d from '../components/card-3d.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  localstorageService,
  wechatService,
  userService,
  productService,
  exhibitorService,
  exhibitionService,
  activityService,
  helpService,
  likeService,
  lookerService
} from '../services'
import { objFrom } from '../utils'

export default {
  name: 'invite',
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },

      activityList: [],
      activityPageIndex: 1,
      activityTotalCount: 0,
      loadingActivity: false,
      neddLoadMoreActivities: true,

      helpList: [],
      helpPageIndex: 1,
      helpTotalCount: 0,
      loadingHelp: false,
      needLoadMoreHelp: true,

      lookers: [],
      lookerPageIndex: 1,
      lookerTotalCount: 0,
      loadingLooker: false,
      needLoadMoreLooker: true,

      inviteData: '',
      banner: '',
      productList: [],

      hasLike: false,
      likeList: [],
      likeTotalCount: 0
    }
  },
  components: {
    CardBorder,
    swiper,
    swiperSlide,
    Card3d,
    loading
  },
  computed: {
    IsConfirm() {
      // 获取助力用户是否注册
      return this.$store.getters.getIsConfirm
    },
    wxConfig() {
      // 获取助力用户是否注册
      return this.$store.getters.getJsConfig
    }
  },
  created() {
    const obj = objFrom(location.search)
    localstorageService.setExhibitorID(obj.companyId)
    localstorageService.setExhibitionID(obj.exhibitionId)

    const token = localstorageService.getToken()
    if (!token) {
      return this.$router.push({ path: '/questToken' })
    }
    this.invite().then(() => {
      this.msgConfig() // 获取wx config
    })
  },
  updated() {
    document.title = this.inviteData.CompName
  },
  methods: {
    msgConfig() {
      const paramsUrl = location.origin + location.pathname
      const url = {
        url: paramsUrl
      }
      wechatService.getJsConfig().then(res => {
        this.$store.commit('setJsConfig', { jsConfig: res.data })
        wx.config({
          ...res.data,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
      })

      this.shareMsg()
    },
    async buildPro() {
      // 制作
      const isLogin = await this.isLogin()
      if (!isLogin) {
        return
      }
      // this.$http
      //   .get('/api/access/customer', { headers: { Authorization: this.token } })
      //   .then(({ data }) => {
      //     if (data.StatusCode === 200) {
      //       // 如果有数据 则跳转到已注册页面
      //       if (data.Data) {
      //         localstorageService.setCustomerInfo(data.Data)
      //         this.$store.commit('setCustomerInfo', { customerInfo: data.Data })

      //         this.$router.push({ path: '/company_info' })
      //       }
      //     }
      //   })
    },
    helpHe() {
      // 助力
      if (this.token === '') {
        // 如果没有token 则请求token 并重定向到 原链接
        this.$router.push({ path: '/questToken' })
      }
      if (this.IsConfirm) {
        // 如果验证过手机 怎直接跳到支付
        this.$router.push({ path: '/helpPay' })
      } else {
        // 反之去注册页面
        this.$router.push({ path: '/help' })
      }
    },
    isLogin() {
      return new Promise((resolve, reject) => {
        // 获取用户信息
        userService
          .getUserInfo()
          .then(data => {
            //点赞状态
            localstorageService.setUserInfo(data)
            this.$store.commit('setUserInfo', { userInfo: data })
            resolve(true)
          })
          .catch(err => {
            this.$router.push({ path: '/questToken' })
            reject(false)
          })
      })
    },
    async invite() {
      const isLogin = await this.isLogin()
      if (!isLogin) {
        return
      }

      // 获取是否点赞
      this.checkHasLike()
      // 添加围观
      this.doLooker()

      // 获取展商、展会信息
      Promise.all([
        exhibitorService.fetchExhibitorInfo(
          localstorageService.getExhibitorID()
        ),
        exhibitionService.fetchExhibitionInfo(
          localstorageService.getExhibitionID()
        )
      ]).then(([exhibitor, exhibition]) => {
        this.inviteData = Object.assign({}, exhibitor, exhibition)
        localstorageService.setInviteInfo(this.inviteData)
      })

      // 获取产品
      productService
        .getProductList(localstorageService.getExhibitorID())
        .then(data => {
          this.productList = data
        })

      // 获取活动
      activityService
        .getActivities(localstorageService.getExhibitorID())
        .then(activities => {
          this.activityList = activities
        })

      // 获取活动总数
      activityService
        .getActivitiesCount(localstorageService.getExhibitorID())
        .then(count => {
          this.activityTotalCount = count
        })

      // // 获取助力
      helpService
        .getHelpers(localstorageService.getExhibitorID())
        .then(helpers => {
          this.helpList = helpers
        })

      helpService
        .getHelpersCount(localstorageService.getExhibitorID())
        .then(count => {
          this.helpTotalCount = count
        })

      // // // 获取所有点赞
      // likeService
      //   .getLikers(localstorageService.getExhibitorID())
      //   .then(likers => {
      //     this.likeList = likers
      //   })

      // likeService
      //   .getLikersCount(localstorageService.getExhibitorID())
      //   .then(count => {
      //     this.likeTotalCount = count
      //   })

      // // // 获取所有点赞
      // lookerService
      //   .getLookers(localstorageService.getExhibitorID())
      //   .then(lookers => {
      //     this.lookers = lookers
      //   })

      // lookerService
      //   .getLookersCount(localstorageService.getExhibitorID())
      //   .then(count => {
      //     this.lookerTotalCount = count
      //   })
    },
    myloadMore: function(event) {
      //活动
      this[event] = !this[event]
    },
    loadMoreActivity() {
      //加载活动
      activityService
        .getActivities(
          localstorageService.getExhibitorID(),
          ++this.activityPageIndex
        )
        .then(activities => {
          this.activityList.push(...activities)
          if (this.activityList.length === this.activityTotalCount) {
            this.neddLoadMoreActivities = false
          }
          this.loadingActivity = false
        })
    },
    loadMoreHelp() {
      //加载助力
      helpService
        .getHelpers(localstorageService.getExhibitorID(), ++this.helpPageIndex)
        .then(helpers => {
          this.helpList.push(...helpers)
          if (this.helpList.length === this.helpTotalCount) {
            this.neddLoadMoreHelp = false
          }
          this.loadingHelp = false
        })
    },
    loadMoreLookers() {
      // 加载围观
      lookerService
        .getLookers(
          localstorageService.getExhibitorID(),
          ++this.lookerPageIndex
        )
        .then(lookers => {
          this.lookers.push(...lookers)
          if (this.lookers.length === this.lookerTotalCount) {
            this.needLoadMoreLooker = false
          }
          this.loadingLooker = false
        })
    },

    async doLike() {
      if (this.hasLike) {
        this.$dialog.toast({
          mes: '你已经点过赞了！',
          timeout: 1200
        })
      } else {
        // 获取是否点赞
        likeService
          .doLike(localstorageService.getExhibitorID())
          .then(() => {
            this.hasLike = true
          })
          .catch(() => {
            this.$dialog.toast({
              mes: '服务器繁忙，请尝试重新点赞！',
              timeout: 1200
            })
            this.hasLike = false
          })
      }
    },
    checkHasLike() {
      // 获取是否点赞
      likeService
        .hasLike(localstorageService.getExhibitorID())
        .then(hasLike => {
          this.hasLike = hasLike
        })
    },
    doLooker() {
      lookerService.doLooker(localstorageService.getExhibitorID())
    },
    shareMsg() {
      wx.ready(function() {
        wx.onMenuShareAppMessage({
          title: this.inviteData.CompName,
          desc: this.inviteData.Introduction,
          link: location.origin + '/compid/' + this.compId,
          imgUrl: this.inviteData.Logo,
          success: function(res) {}
        })
        wx.onMenuShareTimeline({
          title: this.inviteData.CompName,
          desc: this.inviteData.Introduction,
          link: location.origin + '/compid/' + this.compId,
          imgUrl: this.inviteData.Logo,
          success: function(res) {}
        })
        wx.hideMenuItems({
          menuList: [
            'menuItem:copyUrl',
            'menuItem:originPage',
            'menuItem:openWithQQBrowser',
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:share:brand',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook',
            'menuItem:share:QZone'
          ],
          success: function(res) {
            //console.log(JSON.stringify(res));
          },
          fail: function(res) {
            //console.log(JSON.stringify(res));
          }
        })
      })

      wx.error(function(res) {
        wx.hideOptionMenu()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  color: #fd0303;
}
.pop-up {
  width: 100%;
  .pop-title {
    text-align: right;
    border: 1px solid #ddd;
    line-height: 35px;
    padding: 0 17px;
  }
  .pop-content {
    padding: 0 17px;
    .u-btn {
      margin-bottom: 10px;
    }
    .pop-btn_item {
      width: 50px;
      text-align: center;
      margin: 20px 30px 10px;
      p {
        line-height: 2em;
        width: 60px;
        margin-top: 10px;
      }
      .u-circle {
        box-shadow: 1px 1.732px 6px 0px rgba(8, 8, 8, 0.2);
        color: #fff;
        width: 60px;
        height: 60px;
        i.iconfont {
          line-height: 60px;
          font-size: 40px;
        }
      }
      &:nth-child(odd) {
        .u-circle {
          background: #12e8c6;
        }
      }
      &:nth-child(even) {
        .u-circle {
          background: #01daff;
        }
      }
    }
    .pop-btn-box {
      display: flex;
      justify-content: center;
    }
  }
}
.m-loadmore,
.card-head-box,
.card-head2 {
  position: relative;
  z-index: 2;
}
.card-head2 {
  padding: 20px 18px;
  .card-head-box {
    padding-bottom: 5px;
  }
}
.card-list-box {
  padding: 0 0 5px;
  & > a:nth-child(odd) {
    .u-circle {
      background: #12e8c6;
    }
  }
  & > a:nth-child(even) {
    .u-circle {
      background: #01daff;
    }
  }
  & > a:first-child {
    .card-list {
      padding-bottom: 10px !important;
    }
  }
  & > a:last-child {
    .card-list {
      padding-bottom: 15px;
    }
  }
}
.card-list {
  padding-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  color: #fff;
  .card-list_item {
    width: calc(100% - 50px);
    padding-left: 10px;
    h4 {
      font-size: 16px;
      font-weight: 600;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .list-info {
      font-size: 12px;
    }
  }
  .u-circle {
    position: relative;
    top: 2px;
  }
}
.card-carousel {
  padding: 20px 18px;
  border-bottom: 1px solid #07dfeb;
  position: relative;
  .title {
    text-align: right;
    color: #fff;
    margin-bottom: 10px;
  }
  .content {
    position: relative;
    z-index: 2;
    img {
      width: 100%;
    }
  }
  &:before {
    z-index: 3;
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #07dfeb;
  }
  &:after {
    z-index: 3;
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #2b394c;
  }
}
.card {
  position: relative;
  min-height: 250px;
  padding: 20px 18px;
  border-bottom: 1px solid #07dfeb;
  &.card-activity {
    min-height: auto;
  }
}
.card-intro {
  .content {
    display: flex;
    padding: 20px 18px 10px;
    position: relative;
    z-index: 2;
    color: #fff;
    p {
      width: 65%;
      padding-left: 10px;
      text-align: justify;
      line-height: 1.5;
    }
    .intro-img {
      width: 35%;
      img {
        width: 100%;
      }
    }
  }
}
.card-border {
  padding: 20px 18px;
  border-bottom: 1px solid #07dfeb;
  position: relative;
  &.z-2 {
    &:after {
      border-top-color: #262e3e;
    }
  }
  &:before {
    z-index: 3;
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #07dfeb;
  }
  &:after {
    z-index: 3;
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #3a4045;
  }
  .content {
    min-height: 410px;
    position: relative;
    z-index: 2;
    img {
      width: 100%;
    }
  }
}
.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  border-bottom: 1px solid #07dfeb;
  img {
    width: 100%;
    height: 100%;
  }
}
.active-swipe {
  border: 1px solid #07dfeb;
}
.card-swipe {
  margin: 40px 10% 0;
  // border: 1px solid #07dfeb;
  border-radius: 5px;
  min-height: 50px;
  // height: 186px;
  position: relative;
  .swiper-slide {
    height: 186px;
    overflow: hidden;
    border-radius: 5px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    left: 36%;
  }
  .m-avatar {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    z-index: 3;
  }
}
.card-info {
  text-align: center;
  margin: 21px 0px 25px;
  h2 {
    color: #07dfeb;
    font-size: 1.6em;
    line-height: 2;
  }
  .title {
    color: #fff;
    font-size: 1.14em;
    line-height: 2;
  }
  .addr {
    color: #fff;
    font-size: 1.14em;
    margin: 1em 10%;
    i.iconfont {
      font-size: 18;
      font-weight: bold;
      display: inline-block;
      padding-right: 5px;
      transform: scale(1.2);
    }
  }
  .sub-title {
    color: #fff;
    line-height: 2;
  }
  .date {
    color: rgba(#fff, 0.6);
  }
}
.card-head-box {
  h4 {
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
  }
}
.card-head_container {
  display: flex;
  padding: 0 5%;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
.card-head-list {
  width: 20%;
  text-align: center;
  height: 80px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  color: #fff;
  line-height: 1.5em;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.card-head-list2 {
  width: 10%;
  text-align: center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
}
.card-like {
  background: #262f40;
  padding: 20px 18px;
  .u-heart {
    margin-bottom: 20px;
  }
  .u-heart,
  .who-like {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    color: #fff;
    span {
      padding: 0 5px;
      line-height: 25px;
    }
  }
  .who-like {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0 14px;
    &:empty {
      padding: 0;
      margin-bottom: 10px;
    }
  }

  .many-like {
    text-align: center;
    width: 100%;
  }
  .m-loadmore {
    padding-bottom: 0;
  }
}
.support {
  color: #07dfeb;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 18px;
  background: #2c3a54;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  line-height: 50px;
  text-align: center;
  width: 100%;
  z-index: 100;
}
</style>
