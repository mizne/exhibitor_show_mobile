<template>
    <div class="goods-box"> 
      <img src="../assets/img/registered/headImg.gif" alt="logo">
        <p class="tile">GLSA</p>
        <div class="registered">
            <p><input type="text" placeholder="请输入您的手机号/邮箱"></p>
            <p class="bor"><input type="text" placeholder="验证码"> <img :src="myValidation.Image" @click="validation"></p>
            <p class="pos"><input type="text" placeholder="短信验证码"><a href="javascript:;">获取验证码</a></p>
        </div>
        <button class="btn">登录</button>
    </div>
</template>

<script>
export default {
  data(){
      return{
          myValidation:""
      }
  },
  methods:{
      validation(){ //验证码
          this.$http.get('/api/basic/validate/image').then((doc) => {
              let vali = doc.data;
              if(vali.StatusCode === 200){
                  this.myValidation = vali.Data.imageCode;
              }
          })
      }
  },
  created(){
      this.validation();
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
     padding-top: 1.625rem;
     display: flex;
     flex-direction: column;
     align-items:center;
     .tile{
         margin-top: 0.75rem;
     }
     img{
         width: 4.125rem;
         height: 4.125rem;
     }
     .registered{
         margin-top: 1.15rem;
         width: 100%;
        p{
             width: 17.25rem;
             height: 2.2rem;
             line-height: 2.2rem;
             font-size: 0.75rem;
             margin: auto;
             margin-bottom: 0.3rem;
             
             input{
                outline: none;
                border: none;
                width: 100%;
                height: 100%;
                float: right;
                font-size: 0.75rem;
                color:rgb(153,153,153);
                text-indent: 0.8rem;
                border-radius: 5px;
                border: 1px solid rgb(221, 221, 221);
            }
         }
   
         .pos{
             position: relative;
             a{
                 position: absolute;
                 right: 0.775rem;
                 font-size: 0.6rem;
                 color: rgb(106,127,166);
                 img{
                     width: 0.45rem;
                     height: 0.725rem; 
                     margin-top: 0.70rem;
                 }
             }
         }
         .bor{
             position: relative;
             img{
                 position: absolute;
                 width: 3.425rem;
                 height: 1.5rem;
                 right: 0.4rem;
                 top:0.4rem;
             }
         }
     }
     .btn{
             width: 17.25rem;
             height: 2.3rem;
             background-color: rgb(17, 142, 234);
             color: #fff;
             line-height: 2.3rem;
             text-align: center;
             font-weight: bold;
             font-size: 0.825rem;
             border: none;
             border-radius: 5px;
             letter-spacing:0.25rem;
             margin-top: 1.575rem;
         }
    
    
 }   
</style>
