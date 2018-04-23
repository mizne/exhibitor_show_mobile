<template>
  <div class="works">
        <div v-if="myPros.length > 0">
                    <router-link  v-for="(item, index) in myPros" :key="'pro' + index" :to="'/productList/'+item.Id">
                        <div class="worksList">
                            <img :src="item.imgs">
                            <div class="test" >
                                <p>{{item.name}}</p>
                                <p>{{item.summary}}</p>
                            </div>
                        </div>
                    </router-link>
        </div>
        <div v-else>
            <h1 class="empty">暂无产品</h1>
        </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          myPros:"",
          myPros:[]
      }
  },
  methods:{
      works(){
          const body = {"CompId": this.compId};
          this.$http.post('/api/product/page', body).then((doc) => {
              let state = doc.data;
              if(state.StatusCode === 200){
                  state.Data.List.forEach(element => {
                    this.myPros.push({
                        Id: element.Id,
                        name: element.Name,
                        summary: element.Summary,
                        imgs: JSON.parse(element.Banner.replace(/\\"'/g, "'"))[0]
                    });
                  });
              }
          })
      }

  },
  created(){
      document.title = "产品列表"
      this.works()
  },
  computed: {
    token() {
        return this.$store.getters.getToken;
    },
    compId() {
        return this.$store.getters.getCompId;
    }
  }
}
</script>
<style lang="scss" scoped>
    .works{
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .worksList{
            width: 100%;
            height: 4.6rem;
            border-bottom: 1px solid rgb(221, 221, 221);
            background-color: #fff;
            display: flex;
            padding: 0.95rem 0 0.95rem 0.775rem;
            img{
                width: 4rem;
                height: 2.6667rem;
                background: #ccc;
            }
            .test{
                margin-left: 0.5rem;
                p{
                    line-height: 1.15rem;
                }
                p:first-child{
                    font-size: 0.75rem;
                }
                p:last-child{
                    font-size: 0.575rem;
                    color: rgb(153, 153, 153);
                }
            }
        }
    }
    
</style>


