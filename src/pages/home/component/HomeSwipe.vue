<template>
  <div class="home-swiper">
        <mt-swipe>
          <mt-swipe-item v-for="(list,index) in swiper" :key="index">
            <img :src="list.img">
          </mt-swipe-item>
        </mt-swipe>
  </div>
</template>

<script>
export default {
  name:"HomeSwipe",
  data(){
    return{
      swiper:[
        {
          img:"https://shopstatic.vivo.com.cn/vivoshop/commodity/20181229/2018122919374150925_original.jpg"
        },
        {
          img:"https://shopstatic.vivo.com.cn/vivoshop/commodity/20190120/20190120003259192949_original.jpg"
        },
        {
          img:"https://shopstatic.vivo.com.cn/vivoshop/commodity/20190121/20190121174353662731_original.jpg"
        },
        {
          img:"https://shopstatic.vivo.com.cn/vivoshop/commodity/20190120/20190120003014110304_original.jpg"
        }
      ]
    }
  }
}
</script>


<style lang="stylus" scoped>
    .home-swiper
        height 4.93rem;
        margin-top 1px;
        img
            width 100%;
            height 6.5rem
</style>