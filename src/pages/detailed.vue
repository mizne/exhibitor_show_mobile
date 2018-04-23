<template>
    <div class="detailed">
        <h1>{{obtainData.Name}}</h1>
        <h2><span>{{myDate}}</span> <span>{{obtainData.Addr}}</span></h2>
        <p>{{obtainData.Summary}}</p>
    </div>
</template>
<script>
export default {
  data(){
      return {
          obtainData:"",
          myDate:''
      }
  },
  methods:{
      obtain() { //获取活动信息
        this.$http.get('/api/activity/' + this.detailId).then((doc) => {
            let state = doc.data;
            if(state.StatusCode === 200){
                this.obtainData = state.Data
                this.myDate = this.ExDate(state.Data.StartDate);
            }
        })
      },
      ExDate(da){ //格式化日期
                var arr=da.split("T");
                var arr2 =arr[0].split("-")
                var date = new Date(arr2[0],arr2[1],arr2[2])
                var month  = date.getMonth();
                var day   = date.getDate(); 
                return month+"月"+day+"日";
            }
  },
  created(){
      document.title = "活动详情"
      this.obtain();
  },
  computed: {
    detailId() {
        return this.$router.history.current.params.id;
    }
  }
}
</script>
<style lang="scss" scoped>
    .detailed{
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: rgb(238, 238, 238);
        display: flex;
        padding: 0 18px;
        flex-direction: column;
        align-items :center;
        h1{
            width: 100%;
            height: 3.40rem;
            border-bottom: 1px solid rgb(221, 221, 221);
            font-size: 16px;
            font-weight: bold;
            line-height: 3.45rem;
            color: rgb(55, 55, 55);
        }
        h2{
            color: rgb(153,153,153); 
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
        p{
            margin-top: 9px;
            width: 100%;
            line-height: 23px;
            font-size: 14px;
            color: rgb(51, 51, 51);
        }
    }
</style>


