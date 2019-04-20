<template>
    <div class="cart">
       <CartHeader cartTitle="购物车"></CartHeader>
        <div class="cartMain">
             <ul>
                <li v-for="(cart,index) in carts" class="cartList" :key="cart.id">
                     <!-- 购物车单选 -->
                     <div class="select" @click="danxuan(cart,index)" >
                        <i class="iconfont icon-xuanzekuangmoren"   v-if="!cart.danx1uan"></i>
                        <i class="iconfont icon-xuanzekuangxuanzhong" v-else-if="cart.danx1uan" style="color:#25b5fe"></i>
                      </div>
                    <!-- 购物车商品信息 -->
                     <div class="cartImage">
                        <img :src="cart.img" >
                    </div>
                    <div class="cartInformation">
                        <div class="cartName">{{cart.name}}
                            <a href="javascript:;" class="iconfont icon-huishouzhan7"  @click="shanchu(index)" ></a>
                        </div>
                        <p class="cartPrice">￥{{cart.price}}</p>
                    </div>
                    <!-- 购物车商品数量 -->
                    <div class="cartNumber">
                        <a href="javascript:;" @click="reduce(index)" class="add">-</a>
                        <input type="text"   v-model="cart.value" readonly="readonly"/>
                        <a href="javascript:;" @click="add(index)" class="reduce">+</a>
                    </div>
                </li>
            </ul>
        </div>


        <div class="cartImg" v-if="!carts.length">
            <img src="/static/img/gouwuche.png" alt="购物车图片">
            <h1>空空如也</h1>
            <router-link :to="{name:'Home'}">去购物</router-link>
        </div>
        <div class="cartFooter"  v-if="carts.length">
            <div class="checkAll" @click="quanxuan(carts)" >
                <i class="iconfont icon-xuanzekuangmoren" v-if="!qx"></i>
                <i class="iconfont icon-xuanzekuangxuanzhong" v-else-if="qx" style="color:#25b5fe"></i>
                <span>全选</span>
            </div>

            <div class="Total">合计：<span style="font-size: 0.54rem;color:#E3211E">￥{{sum}}</span></div>

                <div class="Settlement">
                    <a href="javascript:void(0);" @click="settlement">提交订单 {{sumValue}}</a>
                </div>
                <!-- <div class="Settlementtwo">
                    <router-link :to="{name:'Home'}" >继续购物</router-link>
                </div> -->
        </div>


    </div>
</template>
<script>
import { Toast,MessageBox } from "mint-ui";
import { mapState, mapMutations, mapGetters } from "vuex";
import axios from 'axios'
// import CartHeader from '../../common/header'
import CartHeader from '../../pages/cart/component/CartHeader'
import axiox from 'axios'
export default {
  name: "cart",
  data() {
    return {
      qx: false,
      payLength: null,
      idData: [],
      carts: this.$store.state.carts[this.$store.state.userInfo.name],
      cartOrderList: []
    };
  },
  components: {
    CartHeader
  },
  created() {
    this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
  },
  computed: {
    // carts() {
    //   this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
    //   return this.$store.state.carts[this.$store.state.userInfo.name];
    // },
    ...mapGetters(["this.$store.state.carts"]),
    sum: function() {
      this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
      var sum = 0;
      this.$store.state.carts[this.$store.state.userInfo.name] = this.$store.state.carts[this.$store.state.userInfo.name] || []
      this.$store.state.carts[this.$store.state.userInfo.name].forEach(cart => {
        if (cart.danx1uan) {
          sum += cart.price * cart.value;
        }
      });
      return sum;
    },
    sumValue() {
      this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
      var sumValue = 0;
      this.$store.state.carts[this.$store.state.userInfo.name] = this.$store.state.carts[this.$store.state.userInfo.name] || []
      this.$store.state.carts[this.$store.state.userInfo.name].forEach(cart => {
        if (cart.danx1uan) {
          sumValue += parseInt(cart.value);
        }
      });
      return sumValue;
    }
  },
  methods: {
    // ...mapMutations(["shanchu", "add", "reduce", "settlement"]),
    ...mapMutations(["shanchu", "add", "reduce"]),
    danxuan(cart, index) {
      this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
      // console.log(cart, index)
      cart.danx1uan = !cart.danx1uan;
      if (cart.danx1uan) {
        this.cartOrderList.push(cart)
      }else {
        this.cartOrderList.splice(index,1)
        console.log(this.carts)
      }
      if (this.cartOrderList.length == this.$store.state.carts[this.$store.state.userInfo.name].length) {
        this.qx = true
      }else {
        this.qx = false
      }
      console.log(this.cartOrderList)
    },
    quanxuan(data) {
      this.qx = !this.qx
      if (this.qx) {
       for(var i in data) {
         data[i].danx1uan = true
       }
        this.cartOrderList = data
      }else {
        //清空
        this.cartOrderList = []
        for(var i in data) {
          data[i].danx1uan = false
        }
      }
      console.log(this.cartOrderList)
    },
    //提交订单
    waitPay(parms) {
      axiox.post('/api/getOrder',parms).then(res => {
        console.log(res)
      })
    },
    // danxuan(cart, index) {
    //   console.log(cart)
    //   this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
    // this.payLength = index
    //  if(!cart.danx1uan){
    //    this.idData.push(cart.id)
    //  }else {
    //    //删除数组中指定的元素
    //    this.idData.splice(this.idData.findIndex(item => item.id === cart.id), 1)
    //    console.log(this.idData)
    //  }
    //   cart.danx1uan = !cart.danx1uan;
    //   if (!cart.danx1uan) {
    //     this.qx = false;
    //   }else if (index == this.$store.state.carts[this.$store.state.userInfo.name].length-1){
    //     this.qx = true;
    //   }
    // },
    // quanxuan(data) {
    //   console.log(data)
    //   this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
    //   this.qx = !this.qx;
    //   if (this.qx) {
    //     this.$store.state.carts[this.$store.state.userInfo.name].forEach(cart => {
    //       cart.danx1uan = true;
    //     });
    //     this.idData = this.$store.state.carts[this.$store.state.userInfo.name]
    //     this.payLength = this.$store.state.carts[this.$store.state.userInfo.name].length-1
    //   } else {
    //     this.$store.state.carts[this.$store.state.userInfo.name].forEach(cart => {
    //       cart.danx1uan = false;
    //     });
    //   }
    // },
    settlement(){
      var data = this.cartOrderList
      if (data.length > 0) {
        this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
        MessageBox.confirm('提交订单吗？').then(action=>{
          var orderNumberString = ''
          // var valueNumberString = ''
          for (var i in data) {
            data[i].ly = null
            data[i].listname = null
            data[i].orderStatus = '0'
            data[i].userName = this.$store.state.userInfo.name
            data[i].orderTime = new Date().getTime()
            orderNumberString += data[i].orderNumber + '-'
            // valueNumberString += data[i].value + '-'
            var parms = data[i]
            axios.post('/api/getOrder',parms).then(res => {
              console.log(res)
            })
          }
          if (data.length == this.$store.state.carts[this.$store.state.userInfo.name].length) {
            this.$store.state.carts[this.$store.state.userInfo.name].splice(0,data.length)
          }else {
            for (var j in this.$store.state.carts[this.$store.state.userInfo.name]) {
              for (var i in data) {
                if (data[i].id == this.$store.state.carts[this.$store.state.userInfo.name][j].id) {
                  this.$store.state.carts[this.$store.state.userInfo.name].splice(j, 1)
                }
              }
            }
          }
          console.log(orderNumberString)
          this.$router.push({path: '/pay',query:{orderNumber:orderNumberString}})
          localStorage.setItem("carts",JSON.stringify(this.$store.state.carts));
        })
      }else {

        console.log(this.$route)
        Toast('请选择要购买的商品')
      }
      console.log(this.cartOrderList)
      // var data = {
      //   payLength: this.payLength,
      //   idData: this.idData
      // }
      // this.$store.dispatch('setPay',this.cartOrderList)
      // for (var i in this.cartOrderList) {
      //   this.cartOrderList[i].ly = null
      //   this.cartOrderList[i].listname = null
      //   // this.cartOrderList[i].orderNumber = new Date().getTime()
      //   this.cartOrderList[i].orderStatus = '0'
      //   this.cartOrderList[i].userName = this.$store.state.userInfo.name
      //   this.cartOrderList[i].orderTime = new Date().getTime()
      //   var parms = this.cartOrderList[i]
      //   this.waitPay(parms)
      // }
      console.log(this.cartOrderList)

    }
  }
};
</script>

<style>
.select {
  float: left;
  margin-top: 1.5rem;
  padding-left: 0.5rem;
}
.select i {
  font-size: 0.53rem;
}
.checkAll {
  width: 24%;
  line-height: 1.18rem;
  float: left;
}
.checkAll i {
  font-size: 0.53rem;
  padding-left: .5rem;
}
.cart {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background: #f4f4f4;
}
.cartheader {
  position: fixed;
  width: 100%;
  box-shadow: 0 0 10px #cecece;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.35rem;
  padding-left: 0.3rem;
  background: white;
  top: 0;
  font-size: 0.41rem;
}
.cartheader i {
  display: block;
  float: left;
  height: 50px;
  font-size: 0.71rem;
  color: black;
  width: 0.9rem;
}
.cartList {
  width: 100%;
  height: 4rem;
  background: white;
  margin-top: 0.04rem;
}
.cartMain {
  margin-top: 1.3rem;
  margin-bottom: 1.24rem;
}
.cartMain ul li {
  list-style: none;
}
.cartImage img {
  width: 2.6rem;
  height: 2.8rem;
}
.cartImage {
  float: left;
  padding: 0.5rem 0.3rem;
}
.cartInformation {
  width: 7.7rem;
  font-size: 0.35rem;
  padding-left: 0.3rem;
  padding-top: 0.6rem;
}
.cartPrice {
  color: red;
  margin-top: 0.2rem;
  font-size: 0.4rem;
}

.cartNumber {
  float: left;
  margin-top: 0.3rem;
}
.cartNumber .add,
.cartNumber .reduce {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  line-height: 0.75rem;
  border: 1px solid #dedede;
  float: left;
  color: #b2b2b2;
  text-align: center;
  font-size: 0.5rem;
}
.cartNumber input {
  width: 0.96rem;
  height: 0.76rem;
  float: left;
  text-align: center;
  border: 1px solid #dedede;
}
.cartNumber .add {
  border-right: none;
}
.cartNumber .reduce {
  border-left: none;
}
.cartFooter {
  position: fixed;
  width: 100%;
  height: 1.18rem;
  font-size: 0.35rem;
  background: white;
  bottom: 0;
  display: block;
  border-top: 1px solid #f4f4f4;
}
.cartImg img {
  width: 4.4rem;
  height: 5.2rem;
  display: block;
  margin: auto;
  padding-top: 1.5rem;
}
.cartImg a {
  display: block;
  text-align: center;
  margin: 0.8rem auto;
  width: 110px;
  height: 37px;
  line-height: 37px;
  border-radius: 4px;
  text-align: center;
  background: #e0524b;
  color: white;
  font-weight: 800;
  font-size: 0.5rem;
}
.cartName {
  width: 9.3rem;
  font-size: 0.36rem;
}
.cartName a {
  color: black;
  font-size: 0.57rem;
  float: right;
}
.cartImg h1 {
  margin-top: 0.5rem;
  text-align: center;
  color: #959595;
  font-size: 0.6rem;
}
._box {
  width: 63%;
  height: 100%;
  float: left;
}
.Total {
    float: left;
    width: 35%;
    text-align: center;
    line-height: 1.18rem;
    font-size: 0.35rem;
}
.Settlement {
  width: 34%;
  height: 80%;
  background: #f81200;
  float: right;
  margin-top: .1rem;
  border-radius: 40px;
  margin-right: 0.3rem;
}
.Settlementtwo {
  width: 50%;
  height: 100%;
  background: #e3211e;
  float: right;
}
.Settlement a,
.Settlementtwo a {
  color: white;
  text-align: center;
  line-height: .98rem;
  display: block;
  font-size: 0.35rem;
}
</style>
