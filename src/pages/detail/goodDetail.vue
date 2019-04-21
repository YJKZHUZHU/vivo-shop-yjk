<template>
<div class="goodDetail" id="transitionName">
    <Detail-Header title="商品详情"></Detail-Header>
      <div class="goodDetailList">
            <ul style="background: white;">
                <li v-for="(goodDetail,index) in goodDetails" :key="index">
                    <div class="goodDetaiSwipe">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="(list, index) in goodDetail.homeSwipe" :key="index">
                                <img :src="list.swipe" alt="图片">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <div class="goodDetailMain">

                        <div class="goodDetailName">{{goodDetail.homeName}}</div>
                        <div style="text-align: justify;font-size: 0.348rem;">
                            <span style="margin-left:-.2rem;color:#FF4B3D;">【{{goodDetail.homeBright}}】</span>
                            {{goodDetail.homeTitle}}
                        </div>
                        <div class="goodDetailColor">{{goodDetail.color}}</div>
                        <div class="goodDetailPaid">￥{{goodDetail.homePrice}}</div>
                        <!--<div class="gooDetailNumber"><span style="color: red">商品编号：</span>{{goodDetail.number}}</div>-->
                    </div>
                    <div class="goodDetailValue">
                        <div class="_Value">购买数量：</div>
                        <div class="_cartNumber" style="margin-left: 2rem;">
                            <a href="javascript:;" @click="jian(index)" class="goodDetailReduce">-</a>
                            <input type="text"   v-model="goodDetail.homeValue" readonly="readonly"/>
                            <a href="javascript:;" @click="jia(index)" class="goodDetailAdd">+</a>
                        </div>
                    </div>
                    <!--<Detail-Layer></Detail-Layer>-->
                    <div class="goodDetailBox">
                        <mt-navbar v-model="selected" >
                            <mt-tab-item id="tab-container1">图文详情</mt-tab-item>
                            <!--<mt-tab-item id="tab-container2">参数</mt-tab-item>-->
                        </mt-navbar>
                        <mt-tab-container v-model="selected" swipeable>
                            <mt-tab-container-item id="tab-container1">
                               <div class="goodDetailImg">
                                   <p v-for="(Image, index) in goodDetail.Images" :key="index">
                                       <img v-bind:src="Image.one" alt="详情图片">
                                    </p>
                                </div>
                            </mt-tab-container-item>
                            <mt-tab-container-item id="tab-container2">
                                <div class="peizhi" v-html="goodDetail.homePeizhi"></div>
                            </mt-tab-container-item>
                        </mt-tab-container>
                    </div>
                    <div class="goodDetailFooter">
                        <div class="left">
                          <router-link to="/cart">
                            <div class="cart">
                                <div class="cartlength">{{cartlength}}</div>
                                <img src="https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/detail/icon-shopcart@2x_201db07.png" >
                                <span>购物车</span>
                            </div>
                          </router-link>
                          <!--<router-link to="/MyCollection">-->
                            <div class="collection" >
                                <div class="collection-box" @click="addCollection(goodDetail)"  >
                                    <i class="iconfont icon-collection" v-if="!goodDetail.isExit"></i>
                                    <i class="iconfont icon-shoucangxuanzhong1" style="color:red" v-else-if="goodDetail.isExit"></i>
                                    <span>收藏</span>
                                </div>

                            </div>
                          <!--</router-link>-->
                            <!--<div class="shop">-->
                                <!--<img src="https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/detail/icon-concat@2x_3442018.png" >-->
                                <!--&lt;!&ndash; <i class="iconfont icon-xuanzekuangxuanzhong" v-show="!$store.state.collection"></i>-->
                                <!--<i class="iconfont icon-xuanzekuangxuanzhong" v-show="$store.state.collection" style="color:red"></i> &ndash;&gt;-->
                                <!--<span>店铺</span>-->
                            <!--</div>-->
                        </div>
                        <div class="rigth">
                            <div class="add">
                                <a href="javascript:void(0);" @click="add(goodDetail)">加入购物车</a>
                            </div>
                            <div class="purchase">
                                <a href="javascript:void(0);" @click="pay(goodDetail.id,goodDetail.homeValue)">提交订单</a>
                            </div>
                        </div>

                    </div>

                </li>
            </ul>
      </div>
  </div>
</template>

<script >
import { Toast,MessageBox,Navbar,TabItem,TabContainer,TabContainerItem } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
import DetailHeader from "./component/DetailHeader";
// import DetailLayer from "./component/DetailLayer";
import axios from "axios";
export default {
  name: "goodDetail",
  data() {
    return {
      active: "1",
      goodDetailHeader: "商品详情",
      selected: "tab-container1",
      goodDetails: [],
      cartlength: 0
    };
  },
  components: {
    DetailHeader,
    // DetailLayer
  },
  computed: {
    paid: function() {
      var paid = 0;
      for (var i in this.goodDetails) {
        paid += this.goodDetails[i].value * this.goodDetails[i].price;
      }
      return paid;
    }
  },
  computed: {
    ...mapGetters(
        ["this.$store.state.carts"],
        ["this.$store.state.todos"],
        ["this.$store.state.collection"],
        ["this.$store.state.ces"]
    )
  },
  mounted() {
    this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
    if (this.$store.state.carts[this.$store.state.userInfo.name] != undefined) {
      this.cartlength = this.$store.state.carts[this.$store.state.userInfo.name].length;
    }
  },
  created() {
    var _this = this;
    var id = this.$route.query.id;
    axios.get("/api/goodDetail").then(res => {
      if (res.data.code == 200) {
        for (var i = 0; i < res.data.data.length;i++){
          if (res.data.data[i].id == id ) {
            _this.goodDetails.push(res.data.data[i]);
          }
        }
        _this.$store.state.userInfo.name= _this.$store.state.userInfo.name ? _this.$store.state.userInfo.name : _this.$store.state.userInfo.phone
        if(JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name]){
          JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name] = JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name] || []
          if(JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name].length> 0 || localStorage.getItem('collections')[_this.$store.state.userInfo.name] != null){
            for(var i in  JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name]) {
              for(var j in _this.goodDetails){
                if(_this.goodDetails[j].id == JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name][i].id){
                  _this.goodDetails[j].isExit = JSON.parse(localStorage.getItem('collections'))[_this.$store.state.userInfo.name][i].isExit
                }else {
                  console.log(1)
                }
              }
            }
          }
        }
      }
    });
  },

  methods: {
    timeFormatting(){
      var date = new Date();
      var fh1 = "-";
      var fh2 = ":";
      var fh3 = "   ";
      var year = date.getFullYear(); // 年
      var month = date.getMonth() + 1; // 月
      var day = date.getDate(); // 日
      var hour = date.getHours(); // 时
      var minutes = date.getMinutes(); // 分

      //三元运算了解下！
      month = month < 10 ? ('0' + month) : month;
      day = day < 10 ? ('0' + day) : day;
      hour = hour < 10 ? ('0' + hour) : hour;
      minutes = minutes < 10 ? ('0' + minutes) : minutes;

      return year + fh1 + month + fh1 + day + fh3 + hour + fh2 + minutes;
    },
    addCollection(index) {
      var currrentTime = this.timeFormatting()
      this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
      this.$store.state.collections[this.$store.state.userInfo.name] = this.$store.state.collections[this.$store.state.userInfo.name] || []
      var isExit = this.$store.state.collections[this.$store.state.userInfo.name].find(data => {
        return data.id == index.id;
      });
      if (typeof(isExit) == 'undefined') {
        index.isExit = true
        var data={
          id:index.id,
          img:index.homeImg,
          name:index.homeName,
          price:index.homePrice,
          currrentTime: currrentTime,
          isExit: index.isExit
        }
        Toast({
          message: "收藏成功",
          duration: 950
        });
        this.$store.dispatch("setGoods",data)
      } else {
        index.isExit = false
        Toast({
          message: "取消收藏",
          duration: 950
        });
        this.$store.dispatch("deleteSetGoods",index.id)
      }
    },
    // 点击按钮时，首先判断该商品是否在购物车已存在，如果存在则不再加入
    add: function(index) {
      this.$store.state.carts[this.$store.state.userInfo.name] = this.$store.state.carts[this.$store.state.userInfo.name] || []
      var idExist = this.$store.state.carts[this.$store.state.userInfo.name].find(todo => {
        return todo.id == index.id;
      });
      if (!idExist) {
        var data = {
          id:index.id,
          name:index.homeName,
          price:index.homePrice,
          value:index.homeValue,
          img:index.homeImg,
          danx1uan: false,
          orderNumber: new Date().getTime()
        };
        this.$store.dispatch('setCart', data);
        // this.$store.commit("SET_CARTS",data);
        this.cartlength = this.$store.state.carts[this.$store.state.userInfo.name].length;
        Toast({
          message: "加入购物车成功！",
          iconClass: "iconfont icon-goumaichenggong-copy",
          duration: 950
        });
      } else {
        MessageBox("提示", "商品已存在购物车,快去购买吧！").then(action => {
          this.$router.push({
            path: 'cart'
          })
        })
      }
    },
    jia: function(index) {
      this.goodDetails[index].homeValue++;
    },
    jian: function(index) {
      if (this.goodDetails[index].homeValue == 1) {
        this.goodDetails[index].homeValue = 1;
      } else {
        this.goodDetails[index].homeValue--;
      }
    },
    //返回上一级
    fanhui: function() {
      this.$router.go(-1);
    },
    pay: function(id,value) {
        console.log(value)
        this.$router.push({
            path:"pay",
            query:{
                id:id,
                value:value
            }
        })
    }
  }
};
</script>

<style lang="stylus" >
// .goodDetail {
// width: 100%;
// height: 100%;
// z-index: 999;
// top: 0;
// left: 0;
// background: white;
// }
.peizhi {
    width: 90%;
    margin: auto;
    div{
        margin-bottom .5rem;
        margin-top .5rem;
    }
    h3 {
        height: 2rem;
        line-height: 2.3rem;
        font-size: 0.5rem;
        border-bottom: 1px solid #ccc;
    }
    span {
        font-size: 0.38rem;
        color: #888;
        margin-top: .3rem;
        display: block;
    }
    p {
         height .55rem
        color: #888;
    }
}

.cartlength {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 1px;
    left: 30px;
    background: #f81301;
    border-radius: 50%;
    text-align: center;
    line-height: 15px;
    color: white;
}

.goodDetailList {
    margin-bottom: 1rem;
    padding-top: 1.45rem;
}

.goodDetailHeader {
    width: 100%;
    z-index: 1;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 12px;
    background: white;
    position: fixed;
    box-shadow: 0 0 10px #cecece;
    text-align: center;
    font-size: 0.41rem;
}

.goodDetailHeader i {
    display: block;
    float: left;
    height: 50px;
    padding-left: 0.3rem;
    font-size: 0.71rem;
    color: black;
}

.goodDetaiSwipe {
    height: 8rem;
    margin-top: 3px;
    background: white;
}

.goodDetaiSwipe img {
    width: 70%;
    height: 7rem;
    display: block;
    /* margin-top: 60px; */
    margin: auto;
}

.goodDetailMain {
    /* height: 1.8rem; */
    background: white;
    border-bottom: 1px solid #cecece;
    // border-top: 1px solid #cecece;
    padding: 0.4rem;
    margin-top: -15px;
}

// .goodDetailBox {
// height: 1px;
// }
.goodDetailName {
    color: black;
    font-weight: 400;
    font-size: 0.5rem;
    line-height 1rem
}

.goodDetailPaid {
    color: #f81200;
    font-size: 0.7rem;
    margin-top: 0.1rem;
}

.goodDetailFooter {
    position: fixed;
    width: 100%;
    bottom: 0rem;
    height: 1.2rem;
    background: #F6F4F7;
    border-top: 1px solid #efefef;

    .left {
        width: 45%;
        float: left;
        position: relative;
        font-size: .35rem;
        .cart {
            width: 50%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;
            position: relative;

            img {
                width: 0.76rem;
                height: 0.7rem;
                display: block;
                margin: auto;
            }

            span {
                text-align: center;
                color: #767676;
            }
        }

        .shop {
            width: 33%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;

            img {
                width: 0.76rem;
                height: 0.7rem;
                display: block;
                margin: auto;
            }

            span {
                display: block;
                text-align: center;
                color: #767676;
            }
        }

        .collection {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            color: #767676;

            .collection-box {
                text-align: center;
                padding-top:3px
            }

            i {
                font-size: 0.6rem;
                display: block;
                text-align: center;
            }

            span {
                text-align: center;
            }
        }
    }

    .rigth {
        width: 55%;
        float: right;

        .add {
            a {
                display: block;
                width: 50%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                background: #FF9800;
                color: white;
                font-size: 0.35rem;
                float: left;
            }
        }

        .purchase {
            a {
                float: left;
                display: block;
                width: 50%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                color: white;
                font-size: 0.35rem;
                background: #E3211E;
            }
        }
    }
}

.gooDetailNumber {
    /*display: none;*/
  font-size: 16px;
}

.add a {
}

.purchase a {
}

.goodDetailImg {
    margin-top: 4px;
    margin-bottom: 6px;
}

.goodDetailImg img {
    width: 100%;
    height: auto;
    display: block;
}

table td {
    font-size: 0.31rem;
    text-align: center;
    color: #000;
}

.goodDetailValue {
    height: 2rem;
    border-bottom: 1px solid #cecece;
    padding: 0.4rem;
}

.goodDetailAdd {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    background: white;
    float: left;
    border: 1px solid #b2b2b2;
    border-left: none;
    text-align: center;
    font-size: 0.5rem;
    color: black;
}

.goodDetailReduce {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    background: white;
    float: left;
    border: 1px solid #b2b2b2;
    border-right: none;
    text-align: center;
    font-size: 0.5rem;
    color: black;
}

._cartNumber input {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    float: left;
    border: 1px solid #b2b2b2;
    text-align: center;
    color: black;
}

._Value {
    float: left;
    margin-top: 0.2rem;
    font-size 0.35rem
}

.goodDetailColor {
    display: none;
}
</style>
