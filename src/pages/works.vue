<template>
  <div class="works">
        <div v-if="myWorks.length > 0">
            <div class="worksList" v-for="(item, index) in myWorks" :key="'work' + index">
                    <img :src="imgWorks[index].Position">
                    <div class="test" >
                        <p>{{item.ExName}}</p>
                        <p>{{item.Booth}}</p>
                    </div>
            </div>
        </div>
        <div v-else>
            <h1 class="empty">暂无作品</h1>
        </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          myWorks:"",
          imgWorks:[]
      }
  },
  methods:{
      works(){
          this.$http.get('/api/compinfo/by?customerId=' + this.compId, this.headers).then((doc) => {
              let state = doc.data;
              if(state.StatusCode === 200){
                  this.myWorks = state.Data;

                  state.Data.forEach(element => {
                    this.imgWorks.push(JSON.parse(element.Banner.replace(/\\'/g, '"')));
                  });
              }
          })
      }

  },
  created(){
      document.title = "我的作品"
      this.works()
  },
  computed: {
    token() {
        return this.$store.getters.getToken;
    },
    headers() {
        return {headers: {'Authorization': this.token}};
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
        background-color: rgb(238, 238, 238);
        display: flex;
        flex-direction: column;
        .worksList{
            width: 100%;
            height: 3.975rem;
            border-top: 1px solid rgb(221, 221, 221);
            background-color: #fff;
            display: flex;
            padding: 0.95rem 0 0.95rem 0.775rem;
            img{
                width: 2.125rem;
                height: 2.125rem;
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
        .worksList:first-child{
            border-top:none;
        }
    }
    
</style>


