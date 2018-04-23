<template>
  <div class="product">
        <div v-if="prodData">
            <span class="page">{{myindex+1}}/{{imgArr.length}}</span>
            <yd-slider :showPagination="false" :callback="myIndex" :loop="false" class="slider" >
                <yd-slider-item v-for="(item, index) in imgArr" :key="index">
                    <img :src="item">
                </yd-slider-item>
            </yd-slider>
            <p class="sliderName">{{prodData.Name}}</p>
            <div class="introduce">
                <h2>产品介绍</h2>
                <p class="test">{{prodData.Summary}}</p>
            </div>
        </div>
        <div v-else>
            <h1 class="empty">暂无产品</h1>
        </div>
        <button class="btn"><router-link :to="'/compid/'+this.compId">返回主页</router-link></button>
        
  </div>
</template>

<script>
import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
export default {
  data(){
      return {
          prodData:[],
          myindex:"",
          imgArr:[],
          show: false
      }
  },
  methods:{
      productData(){
          this.$http.get('/api/product/' + this.proId).then((doc) => {
              let state = doc.data;
              if(state.StatusCode === 200) {
                    this.imgArr = JSON.parse(state.Data.Banner.replace(/\\"'/g, "'"));
                    this.prodData = state.Data;
              }
          })
      },
      myIndex(index){
          this.myindex = index;
      }
  },
  created(){
      document.title = "产品列表详情"
      this.productData();
  },
  computed: {
    compId() {
        return this.$store.getters.getCompId;
    },
    proId() {
        return this.$router.history.current.params.id;
    }
  }
}
</script>

<style lang="scss" scoped>
    .product{
            width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: rgb(238, 238, 238);
        display: flex;
        flex-direction: column;
        .page{
                position: absolute;
                top: 11.15rem;
                right: 0.75rem;
                width: 1.575rem;
                height: 0.8rem;
                background-color: rgb(175, 175, 175);
                color: #fff;
                border-radius:20px; 
                line-height: 0.8rem;
                font-size: 0.233rem;
                text-align: center;
                z-index: 100;
            }
        .slider{
            position: relative;
            width:100%;
            height: 12.525rem;
            
            img{
                width:100%;
                height: 12.525rem;
            }
        }
        .sliderName{
            width: 100%;
            height: 2.825rem;
            line-height: 2.825rem;
            background-color: #fff;
            text-indent: 0.75rem;
            font-size: 0.925rem;
            font-weight: 500;
            color: black;
        }
        .introduce{
            width: 100%;
            background-color: #fff;
            margin-top: 0.6rem;
            h2{
                width: 17.35rem;
                height: 2.175rem;
                line-height: 2.175rem;
                text-align: center;
                border-bottom: 1px solid rgb(221, 221, 221);
                margin: auto;
            }
            .test{
                padding: 0.625rem 0.725rem;
                line-height: 1.15rem;
                font-size: 0.7rem;
                color:rgb(51,51,51);
            }
        }    
        .btn{
            outline: none;
            width: 17.25rem;
            height: 2.3rem;
            background-color: rgb(17, 142, 234);
            color: #fff;
            line-height: 2.3rem;
            text-align: center;
            font-weight: bold;
            font-size: 0.825rem;
            border: none;
            letter-spacing: 0.2rem;
            border-radius: 5px;
            margin: auto;
            margin-top: 0.9rem;

        }
    }
</style>


