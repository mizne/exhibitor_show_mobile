<template>
  <div>
    <div class="swiper-inner" v-if="product">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in product" :key="'swiper'+ index">
            <div class="slide-content">
                <router-link :to="'/productList/'+item.Id">
                  <img :src="JSON.parse(item.Banner)[0]">
                </router-link>
            </div>
            <div class="txt u-txt_gradient">{{item.Name}}</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:"card-3d",
      props:['product'],    
    data() {
      return {
        swiperOption: {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
            rotate: 0,
            stretch: 100,
            depth: 500,
            modifier: 1,
            slideShadows : false
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .swiper-inner {
        width: 100%;
        height: 180px;
    }
    .slide-content{
        width: 225px;
        height: 150px;
        padding: 15px;
        background: #fff;
        box-shadow: 0px 0px 20px 0px rgba(8, 8, 8, 0.2);
        border-radius: 2.5px;
        position: relative;
        img{
            max-height: 100%;
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            padding: 15px;
        }
    }
    .swiper-slide {
        width: 225px;
        height: 220px;
        text-align: center;
        .txt{
            color: #07dfeb;
            height: 30px;
            line-height: 30px;
        }
    }
</style>