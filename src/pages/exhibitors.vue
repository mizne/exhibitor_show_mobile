<template>
  <div class="goods-box">
      <img src="../assets/img/goodsRegistered/logo.gif" alt="logo">
      <h1>{{customer.CompName}}</h1>
      <p>您已为展商秀的注册用户，请登录zhanshangxiu.com,完善您的信息并完成制作</p>
      <div class="text">
          <input type="text">
          <input type="text">
          <input type="text">
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        customer() {
            return this.$store.getters.getCustomerInfo;
        }
    }
}
</script>
<style lang="scss" scoped>
 .goods-box{
     position: absolute;
     bottom: 0;
     width: 100%;
     min-height: 100%;
     background-color: rgb(245,245,245);
     padding: 32px 36px 0 1.85rem;
     display: flex;
     flex-direction: column;
     align-items:center;
     img{
         width: 30%;
         height: 30%;
     }
    h1{
        font-size:20px;
        font-weight: bold; 
        margin-top: 21px;
    }
    p{
        font-size: 14px;
        line-height: 24px;
        margin-top: 28px;
        word-break: break-all;
        color: rgb(51, 51, 51);
    }
    .text{
        width: 12.925rem;
        height: 1.5rem;
        margin: 0 auto;
        text-align: center;
        margin-top: 16px;
        input{
            outline: none;
            border: none;
            width: 4rem;
            height: 1.5rem;
            border-bottom: 2px solid rgb(221,221,221);
            background-color:rgb(245,245,245) ;
        }
    }
 }   
</style>
