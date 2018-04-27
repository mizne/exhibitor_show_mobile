<template>
  <div class="goods-box">
      <div class="imgBox" v-if="user.Other">
        <img :src="user.Other.Logo" alt="logo">
      </div>
      <h1 v-if="user.Other">{{user.CompName}}</h1>
      <p>您已为展商秀的注册用户，请登录zhanshangxiu.com,完善您的信息并完成制作</p>
      <div class="text">
          <input type="text">
          <input type="text">
          <input type="text">
      </div>
      <router-link :to="'/compid/' + (myCompId === '' ? compId : myCompId)"><span class="look-more">查看作品</span></router-link>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUserinfo
    },
    myCompId() {
      return this.$store.state.myCompId
    },
    compId() {
      return this.$store.state.getCompId
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.look-more {
  display: inline-block;
  margin-top: 60px;
  font-size: 16px;
  color: #0190fe;
  font-weight: 600;
}
.goods-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgb(245, 245, 245);
  padding: 3rem 1.85rem 0 1.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .imgBox {
    width: 84px;
    height: 84px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 84px;
      height: 84px;
    }
  }

  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 30px;
  }
  p {
    font-size: 13px;
    line-height: 24px;
    margin-top: 30px;
    word-break: break-all;
    color: rgb(51, 51, 51);
  }
  .text {
    width: 12.925rem;
    height: 1.5rem;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    input {
      outline: none;
      border: none;
      width: 4rem;
      height: 1.5rem;
      border-bottom: 2px solid rgb(221, 221, 221);
      background-color: rgb(245, 245, 245);
    }
  }
}
</style>
