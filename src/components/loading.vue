<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
  export default {
    name:"loading",  
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
    .loading{
        width: 150px;
        margin: 0 auto;
    }
    .loading span{
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
        border-radius: 50%;
        background: rgb(18, 232, 198);
        animation: load 1.04s ease infinite;
    }
    .loading span:last-child{
        margin-right: 0px; 
    }
    @keyframes load{
        0%{
            opacity: 1;
            transform: scale(1.3);
        }
        100%{
            opacity: 0.2;
            transform: scale(.3);
        }
    }
    .loading span:nth-child(1){
        animation-delay:0.13s;
    }
    .loading span:nth-child(2){
        animation-delay:0.26s;
    }
    .loading span:nth-child(3){
        animation-delay:0.39s;
    }
    .loading span:nth-child(4){
        animation-delay:0.52s;
    }
    .loading span:nth-child(5){
        animation-delay:0.65s;
    }
</style>