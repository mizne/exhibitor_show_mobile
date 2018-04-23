<template>
  <div class="help">
      <div class="test">
          感谢您的助力，期待与您相约{{invite.ExName}}！所有助力金将以微信红包形式随机发放给我司展台的到访观众，{{date}}记得来我展台试试运气哦！
      </div>
      <button class="btn1" v-on:click="buildivinte()">我也要做一张</button>
      <button class="btn2" v-on:click="backHome()">返回</button>
  </div>
</template>
<script>
export default {
  created() {
    document.title = "助力成功";
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserinfo;
    },
    date() {
      const date = this.invite;
      const start = new Date(date.ExStartDate);
      const end = new Date(date.ExEndDate);
      return (start.getMonth() + 1) + '月' + start.getDate() + '日 ~ ' + (end.getMonth() + 1) + '月' + end.getDate() + '日';
    },
    compId() {
      return this.$store.getters.getCompId;
    },
    invite() {
      return this.$store.getters.getInvite;
    }
  },
  methods: {
    backHome() {
      this.$router.push({path: '/compid/' + this.compId});
    },
    buildivinte() {
      this.$router.push({path: '/company_info'});
    }
  }
};
</script>
<style lang="scss" scoped>
.help {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &::after {
    position: absolute;
    top: 0px;
    content: "";
    display: block;
    border-top: 4px solid rgb(17, 142, 234);
    border-bottom: 4px solid rgb(17, 142, 234);
    border-radius: 5px;
    width: 92%;
    top: 15px;
    z-index: 0;
  }
  .test {
    position: relative;
    margin-top: 20px;
    padding: 30px 18px 35px;
    line-height: 22px;
    background-color: #fff;
    width: 88%;
    z-index: 100;
    font-size: 14px;
    color: rgb(51, 51, 51);
  }
  button {
    width: 92%;
    height: 7.5%;
    outline: none;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    letter-spacing:2px;
    font-size: 18px;
  }
  .btn1 {
    margin-top: 10%;
    background-color: rgb(17, 142, 234);
    color: #fff;
  }
  .btn2{
      margin-top: 16px;  
      border: 1px solid  rgb(17, 142, 234);
      color:  rgb(17, 142, 234);
  }
}
</style>
