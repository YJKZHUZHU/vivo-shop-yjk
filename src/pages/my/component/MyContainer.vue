<template>
  <div class="container profile">
      <div class="container-bj">
          <img src="/static/img/tou.jpg">
        <router-link :to="userInfo._id ? '/author': '/login'" class="profile-link">
          <div class="user-info" style="width: 100%;text-align: center">
            <p v-if="!userInfo.phone"><span>{{userInfo.name || '登录/注册'}}</span></p>
            <p><span>{{userInfo.phone || '暂无绑定手机号'}}</span></p>
          </div>
        </router-link>
      </div>
      <!--<div class="container-integral">-->
          <!--<p>-->
              <!--<span>{{jifeng}}</span>-->
              <!--<span>积分</span>-->
          <!--</p>-->
      <!--</div>-->



      <div class="container-con" id="transition">
          <router-link class="con" to="/order" id="transition">
            <div class="con-left">
              <i class="iconfont icon-dingdan"></i>
              <span>我的订单</span>
            </div>
            <div class="con-rigth">
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </router-link>
          <router-link to="/MyCollection" class="con">
                 <div class="con-left">
                  <i class="iconfont icon-collection"></i>
                  <span>我的收藏</span>
              </div>
              <div class="con-rigth">
                  <i class="iconfont icon-youjiantou"></i>
              </div>
          </router-link>

          <router-link to="/address" class="con" id="transition">
                 <div class="con-left">
                  <i class="iconfont icon-shouhuodizhi"></i>
                  <span>我的收货地址</span>
              </div>
              <div class="con-rigth">
                  <i class="iconfont icon-youjiantou"></i>
              </div>
          </router-link>

          <router-link to="/cart" class="con" id="transition">
                 <div class="con-left">
                  <i class="iconfont icon-gouwuche"></i>
                  <span>我的购物车</span>
              </div>
              <div class="con-rigth">
                  <i class="iconfont icon-youjiantou"></i>
              </div>
          </router-link>

          <!--<router-link to="/order" class="con">-->
                 <!--<div class="con-left">-->
                  <!--<i class="iconfont icon-share_icon"></i>-->
                  <!--<span>扫码分享</span>-->
              <!--</div>-->
              <!--<div class="con-rigth">-->
                  <!--<i class="iconfont icon-youjiantou"></i>-->
              <!--</div>-->
          <!--</router-link>-->
          <div style="margin-bottom: 50px">
            <!--<a target="_blank" href="https://github.com/YJKZHUZHU/vivo-shop-yjk" class="con">-->
              <!--<div class="con-left">-->
                <!--<i class="iconfont icon-bangzhuguanyuwomen"></i>-->
                <!--<span>关于我</span>-->
              <!--</div>-->
              <!--<div class="con-rigth">-->
                <!--<i class="iconfont icon-youjiantou"></i>-->
              <!--</div>-->
            <!--</a>-->
            <mt-button type="danger" style="width: 100%"  v-if="userInfo._id" @click="logout">退出登陆</mt-button>
          </div>
      </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import  {MessageBox,Toast} from  'mint-ui'
export default {
  name:"Mycontainer",
  data(){
      return{
          container:[
              {
                  img:"/static/img/111.png",
                  name:"待付款"
              },
               {
                  img:"/static/img/222.png",
                  name:"待收货"
              },
               {
                  img:"/static/img/333.png",
                  name:"待评价"
              }, {
                  img:"/static/img/444.png",
                  name:"退货/退款"
              },
          ]
      }
  },
    computed:{
      ...mapGetters(["this.$store.state.orders"]),
      ...mapState(["userInfo"]),
       jifeng(){
          var jifeng=0
         this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
         if (this.$store.state.orders[this.$store.state.userInfo.name]){
           this.$store.state.orders[this.$store.state.userInfo.name].forEach(list => {
             jifeng += parseInt(list.price)
           });
         }else {
           jifeng = 0
         }

         return jifeng;
      }
    },
  methods: {
    logout () {
      MessageBox.confirm('确认退出吗?').then(
        action => {
          // 请求退出
          this.$store.dispatch('logout')
          Toast('登出完成')
        },
        action => {
          console.log('点击了取消')
        }
      );
    }
  }
}
</script>


<style lang="stylus" scoped>
.container-order{
    width 100%
    background white
    display flex
    flex-direction column
    font-size 0.35rem
    border-bottom: 1px solid #f0f0f0;
    .container-order-1{
        width 100%
        display flex
        justify-content space-between
        .left{
            line-height: 1.5rem;
            margin-left: .5rem;
            font-size: 0.4rem;
        }
        .right {
            line-height: 1.5rem;
            margin-right: .4rem;
            font-size: 0.4rem;
        }
    }
    .container-order-2{
        width 100%
        height 1.5rem
        display flex
        justify-content center
        align-items center

        p{
            width 25%
            display flex
            flex-direction column
            margin-top .3rem

            img{
                width .8rem
                height .8rem
                margin auto
            }
            span{
                text-align center
                padding-top .3rem
            }
        }
    }
}
.t{
    background-image url('/static/img/t.png');
}

.container {
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 1.45rem;
    .container-bj {
        width: 100%;
        height: 100%;
        background: url('/static/img/bj.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 50%;
        }

        span {
            color: #ffffff;
            font-size: 0.5rem;
        }

        p {
            font-size 0.35rem;
            color: #ffffff;
        }
    }
    .container-integral{
        width 100%
        height 2rem
        background #ffffff
        display: flex;
        justify-content: center
        p{
            width 33%
            height 100%
            font-size .36rem
            line-height .6rem
            font-weight 500
            float left
            display flex
            flex-direction column
            text-align center
            justify-content: center;
        }
    }

    .container-con {
        margin-bottom 1.45rem
        display flex
        flex-direction column
        .con {
            width: 100%;
            background: #ffffff;
            border-bottom: 1px solid #f0f0f0;
            display : flex;
            align-items : center;
            justify-content : space-between
            .con-left {
                padding-left: 0.47rem;
                i {
                    font-size: 0.5rem;
                }

                span {
                    font-size: 0.37rem;
                    padding-left: 0.1rem;
                }
            }
            .con-rigth {
                line-height: 1rem;
                padding-right: 0.4rem;
            }
        }
    }
}
</style>
