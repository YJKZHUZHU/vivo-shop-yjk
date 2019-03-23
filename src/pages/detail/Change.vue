<template>
  <div class="change">
      <Change-header title="手机以旧换新"></Change-header>
      <div class="change-box">
        <div class="change-img" v-for="list in change">
          <img :src="list.changeImg">
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import ChangeHeader from '../Detail/component/DetailHeader'
export default {
  name:"change",
  data(){
      return{
          change:[]
      }
  },
  components:{
      ChangeHeader
  },
  created(){
      var _this=this
      axios.get("/api/change").then(function(res){
        console.log(res)
        if (res.data.success){
          _this.change=res.data.change
        }

      })
  }
}
</script>


<style lang="stylus" scoped>
    .change-box
        padding-top 1.45rem
    .change-img
        width 100%
        height 17rem
        img
            width 100%

</style>
