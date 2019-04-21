<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/home">
        <i class="iconfont icon-zuojiantou"></i>
      </router-link>
    </div>
    <div class="header-in">{{title}}</div>
    <div class="header-rigth"></div>
  </div>
</template>

<script>
  export default {
    props: [ 'title' ],
    created: function() {
      console.log('This is a shopping cart')
    }
  }
</script>
<style lang="stylus" scoped>
  .header
    width 100%
    height 1.5rem
    background white
    position fixed
    z-index 1
    .header-left
      width 10%
      height 100%
      float left
      i
        font-size .6rem
        line-height 1.45rem
        text-align center
        display block
    .header-in
      width 80%
      height 100%
      float left
      text-align: center
      font-size: 0.45rem
      line-height: 1.45rem
    .header-right
      width 10%
      height 100%
      float left

</style>
