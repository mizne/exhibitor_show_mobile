<template>
    <div class="detailed">
        <h1>{{activity.Name}}</h1>
        <h2><span>{{activity.ShowDate}}</span> <span>{{activity.Addr}}</span></h2>
        <p>{{activity.Summary}}</p>
    </div>
</template>
<script>
import { activityService } from '../services'

export default {
  data() {
    return {
      activity: {}
    }
  },
  methods: {
    fetchActivityDetail() {
      //获取活动信息
      activityService.getAcitivityDetail(this.detailId).then(activity => {
        this.activity = activity
      })
    }
  },
  created() {
    document.title = '活动详情'
    this.fetchActivityDetail()
  },
  computed: {
    detailId() {
      return this.$router.history.current.params.id
    }
  }
}
</script>
<style lang="scss" scoped>
.detailed {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: rgb(238, 238, 238);
  display: flex;
  padding: 0 18px;
  flex-direction: column;
  align-items: center;
  h1 {
    width: 100%;
    height: 3.4rem;
    border-bottom: 1px solid rgb(221, 221, 221);
    font-size: 16px;
    font-weight: bold;
    line-height: 3.45rem;
    color: rgb(55, 55, 55);
  }
  h2 {
    color: rgb(153, 153, 153);
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  p {
    margin-top: 9px;
    width: 100%;
    line-height: 23px;
    font-size: 14px;
    color: rgb(51, 51, 51);
  }
}
</style>


