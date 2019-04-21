<template>
    <div class="pay-container">
        <Pay-Header title="结算"></Pay-Header>
        <div class="pay-address" v-if="defaultAddress">
          <p class="address-box">
            <span class="name">收货人：{{ defaultAddress.name }}</span>
            <span @click="pickAddress" class="pick-address">选择收货地址</span>
          </p>
          <p class="address-details">
            电话：{{ defaultAddress.phone }}
          </p>
          <p class="address-details">
            收货地址：{{ defaultAddress.zone }} {{ defaultAddress.detail }}
          </p>
        </div>
        <div class="pay-address" v-else>
          <router-link :to="{name:'address'}" tag="p" style="text-align: center; color: #00acff;">戳我，添加地址</router-link>
        </div>
        <div class="pay-shop" v-for="(list,index) in pay" :key="index">
            <div class="pay-shop-list">
                <p class="pay-shop-1">商品清单</p>
                <p class="pay-shop-2">
                    <img :src="list.homeImg">
                    <p class="pay-shop-2-box">
                        <span class="name">{{list.homeName}}
                          <p>× {{$route.query.value || list.value}}</p>
                        </span>
                        <span class="price">¥ {{list.homePrice}}</span>
                    </p>
                </p>
            </div>

        </div>
        <div class="pay-shop">
          <div class="pay-shop-fs">
            <div class="pay-fs-1">支付方式</div>
            <div class="pay-fs-2">
              <div class="pay-fs-2-1" >
                <div v-for="(list,index) in lists" :class="{active:index===listIndex}" @click="btn(list.name,index)">{{list.name}}</div>
              </div>
              <div class="pay-fs-2-2">
                <div v-show="listIndex===0" class="pay-fs-2-2-1">支持支付宝支付、微信支付、银行卡支付、财付通等</div>
                <div v-show="listIndex===1" class="pay-fs-2-2-2">花呗分期是花呗联合天猫淘宝推出的，面向互联网的赊购服务，通过支付宝轻松还款，0首付</div>
                <div v-show="listIndex===2" class="pay-fs-2-2-3">货到再付款，支持现金交易</div>
              </div>
            </div>
          </div>
          <div class="pay-shop-liuyan">
            <p class="pay-liuyan-1">订单留言</p>
            <div class="pay-liuyan-2">
              <textarea v-model="ly" rows="5" placeholder="限300字" maxlength="300"></textarea>
              <p>商品总金额：¥{{totalMoney}}</p>
              <p>运费：0.00</p>
              <p>优惠：¥0.00</p>
              <p>赠送积分：{{totalMoney}}</p>
            </div>
          </div>
          <div class="pay-shop-footer">
            <p class="price">订单总金额：<span>¥{{totalMoney}}</span></p>
            <a class="order" @click="addWaittingOrder(pay,listIndex,0)">提交订单</a>
            <a class="order" @click="addOrder(pay,listIndex,1)">立即结算</a>
          </div>
        </div>
        <!--地址选择弹层-->
        <div class="dialog-address" v-if="showAddress">
          <ul>
            <li v-for="(item, index) in addressList" :key="index" style="padding: 10px 0;border-bottom: 1px solid #ccc">
              <div class="choose">
                <div class="select" @click="danxuan(item,index)" >
                  <i class="iconfont icon-xuanzekuangmoren"   v-if="selectNumber != index"></i>
                  <i class="iconfont icon-xuanzekuangxuanzhong" v-else-if="selectNumber == index" style="color:#25b5fe"></i>
                </div>
                <div class="address">
                  <p class="address-details">
                    收货人：{{ item.name }}
                  </p>
                  <p class="address-details">
                    电话：{{ item.phone }}
                  </p>
                  <p class="address-details">
                    收货地址：{{ item.zone }} {{ item.detail }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div style="text-align: center">
            <mt-button type="primary" @click="saveAddress()">保存</mt-button>
          </div>

        </div>
    </div>
</template>
<script>
  import { Toast, MessageBox } from "mint-ui";
  import { mapGetters, mapMutations } from "vuex";
  import PayHeader from "../../common/header";
  import axios from "axios";
  import { Button } from 'mint-ui';
  export default {
    name: "pay",
    data() {
      return {
        listIndex: 0,
        defaultAddress: '',
        addressList: [],
        pay: [],
        lists: [
          {
            id: "1",
            name: "在线支付"
          },
          {
            id: "2",
            name: "花呗分期"
          },
          {
            id: "3",
            name: "货到付款"
          }
        ],
        ly: "",
        showAddress: false,
        selectNumber: '',
        selectedAddress: '',
        totalMoney: 0
      };
    },
    components: {
      PayHeader
    },
    methods: {

      danxuan(item, index) {
        this.selectNumber = index
        this.defaultAddress = item
      },
      saveAddress() {
        this.showAddress = !this.showAddress
      },
      pickAddress() {
        this.showAddress = true
      },
      btn(id, index) {
        this.listIndex = index;
      },
      //收集订单
      getOrder(params) {
        this.$store.state.userInfo.name= this.$store.state.userInfo.name ? this.$store.state.userInfo.name : this.$store.state.userInfo.phone
        params.userName = this.$store.state.userInfo.name
        params.address = "姓名："+params.address.name+'--电话号码：'+ params.address.phone+"--详细地址："+params.address.zone + params.address.detail
        axios.post('/api/getOrder',params).then(function (res) {
          if (res.success) {
            console.log(res.message)
          }
        })
      },
      //提交订单
      addWaittingOrder(id, index,status) {
        if (this.defaultAddress){
          for (var i in id) {
            delete this.defaultAddress.danxuan
            var data = {
              id: id[i].id,
              name: id[i].homeName,
              price: id[i].homePrice,
              ly: this.ly,
              img: id[i].homeImg,
              value: this.$route.query.value || id[i].value,
              orderNumber:  (id[i].orderNumber)||new Date().getTime(),
              address: this.defaultAddress,
              orderStatus: '0'
            }
            this.$store.dispatch("setOrders", data);
            this.getOrder(data)
          }
          var time = setInterval(()=> {
            this.$router.push({
              path: "success"
            });
            clearInterval(time);
          }, 1000);
        }else {
          MessageBox.confirm('还没有添加收获地址哦,是否现在添加').then(action => {
            this.$router.replace({name:'address'})
          })
        }
      },
      //结算
      addOrder(id, index,status) {
        // console.log(id,index,status,this.lists)
        // console.log(this.defaultAddress)
        if (this.defaultAddress){
          for (var i in id) {
            delete this.defaultAddress.danxuan
            var data = {
              id: id[i].id,
              name: id[i].homeName,
              price: id[i].homePrice,
              ly: this.ly,
              img: id[i].homeImg,
              listname: this.lists[index].name,
              value: this.$route.query.value || id[i].value,
              orderNumber:  (id[i].orderNumber)||new Date().getTime(),
              address: this.defaultAddress,
              orderStatus: '1'
            }
            this.$store.dispatch("setOrders", data);
            this.getOrder(data)
          }
          var time = setInterval(()=> {
            this.$router.push({
              path: "success"
            });
            clearInterval(time);
          }, 1000);
        }else {
          MessageBox.confirm('还没有添加收获地址哦,是否现在添加').then(action => {
            this.$router.replace({name:'address'})
          })
        }
      }
    },
    mounted() {
      var id = this.$route.query.id;
      if (this.$route.query.orderNumber){
        var orderNumber = this.$route.query.orderNumber.split('-').slice(0,this.$route.query.orderNumber.split('-').length-1)
      }
      var value = this.$route.query.value;
      var _this = this;
      //有orderNumber从购物车来的
      if (orderNumber){
        axios.post('api/payDetailByOrderNumber',{orderNumberArray:orderNumber}).then(res => {
          if (res.data.success) {
            for (var i in res.data.data) {
              _this.totalMoney += res.data.data[i].price*res.data.data[i].value
              _this.pay.push({
                homeImg: res.data.data[i].img,
                homeName: res.data.data[i].name,
                homePrice: res.data.data[i].price,
                value: res.data.data[i].value,
                id: res.data.data[i].id,
                orderStatus: res.data.data[i].orderStatus,
                orderNumber: res.data.data[i].orderNumber
              })
            }
          }
        })
      }else {
        axios.get('/api/goodDetail').then(function (res) {
          if (res.data.code == 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].id == id) {
                _this.totalMoney += res.data.data[i].homePrice*_this.$route.query.value
                _this.pay.push(res.data.data[i]);
              }
            }
          }
        })
      }
      _this.$store.state.userInfo.name= _this.$store.state.userInfo.name ? _this.$store.state.userInfo.name : _this.$store.state.userInfo.phone
      //保存默认地址
      if (_this.$store.state.address[_this.$store.state.userInfo.name].length > 0) {
        _this.defaultAddress = _this.$store.state.address[_this.$store.state.userInfo.name][0]
      }else {
        _this.defaultAddress = ''
      }
      //保存地址列表
      for (var i in _this.$store.state.address[_this.$store.state.userInfo.name]) {
        for (var item in _this.$store.state.address[_this.$store.state.userInfo.name][i]) {
          _this.$store.state.address[_this.$store.state.userInfo.name][i].danxuan = false
        }
      }
      _this.addressList = _this.$store.state.address[_this.$store.state.userInfo.name]
    }
  };
</script>
<style lang="stylus" scoped>
.pay-container {
  position relative
}
.active {
    border: 1px solid #444;
    color: red;
}

.pay-address {
    width: 100%;
    height: 4.3rem;
    background: url('https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png') #fff left bottom repeat-x; // shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png) #fff left bottom repeat-x;
    background-size: 1.6rem;
    padding-top: 1.45rem;
    display: block;

    .address-box {
        width: 87%;
        margin: auto;
        font-size: 0.4rem;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;

        .pick-address {
            float: right;
            color: #00acff;
        }
    }

    .address-details {
        width: 87%;
        margin: auto;
        color: #666;
        font-size: 0.38rem;
    }
}

.pay-shop {
    width: 100%;
    /*margin-bottom: 1.5rem;*/

    .pay-shop-invoice {
        width: 100%;
        height: 4.3rem;
        background: #fff;
        margin-bottom: 10px;
        margin-top: 10px;

        .pay-invoice-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-invoice-2 {
            width: 100%;
            height: 4rem;

            .pay-invoice-2-1 {
                width: 100%;
                height: 30%;

                div {
                    display: block;
                    width: 2.88rem;
                    height: 0.9rem;
                    line-height: 0.9rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    margin: 0.1rem 0.3rem;
                    float: left;
                    text-align: center;
                }
            }

            .pay-invoice-2-2 {
                width: 92%;
                height: 70%;
                margin: auto;
                font-size 0.35rem

                p {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                input {
                    width: 100%;
                    height: 1.18rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    padding-left: 0.2rem;
                }
            }
        }
    }

    .pay-shop-list {
        width: 100%;
        height: 4.5rem;
        margin-top: 0.3rem;
        background: #fff;

        .pay-shop-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-shop-2 {
            float: left;

            img {
                width: 2.5rem;
                margin: 0.2rem;
            }
        }

        .pay-shop-2-box {
            width: 70%;
            display: flex;
            flex-direction: column;

            .name {
                font-size: 0.4rem;
                margin-top: 0.3rem;
                height: 0.6rem;

                p {
                    float: right;
                    margin-right: 0.5rem;
                }
            }

            .price {
                color: red;
                font-size: 0.35rem;
                font-weight: 500;
                height: 0.6rem;
            }
        }
    }

    .pay-shop-liuyan {
        width: 100%;
        height: 6.5rem;
        background: #fff;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;

        .pay-liuyan-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-liuyan-2 {
            width: 90%;
            margin: auto;

            textarea {
                width: 100%;
                height: 2rem;
                border: 1px solid #d1d1d1;
                border-radius: 3px;
                padding: 0.15rem 0.2rem;
                margin: 0.3rem auto;
                display: block;
            }

            p {
                color: #888;
                height: 0.48rem;
                font-size: 0.34rem;
            }
        }
    }

    .pay-shop-fs {
        width: 100%;
        height: 5rem;
        background: #ffffff;

        .pay-fs-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-fs-2 {
            width: 100%;
            height: 3.5rem;
            background: #ffffff;

            .pay-fs-2-1 {
                width: 100%;
                height: 40%;
                font-size: 0.35rem;
                // background yellow
                display: flex;
                justify-content: center;
                align-items: center;

                div {
                    display: block;
                    width: 2.88rem;
                    height: 0.9rem;
                    line-height: 0.9rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    margin: 0.1rem;
                    float: left;
                    text-align: center;
                }
            }

            .pay-fs-2-2 {
                width: 100%;
                height: 60%;
                font-size: 0.35rem;

                // background red
                div {
                    width: 90%;
                    height: 1.3rem;
                    border-radius: 3px;
                    border: 1px solid #d1d1d1;
                    margin: auto;
                    padding: 0.3rem;
                }

                .pay-fs-2-2-2 {
                    height: 1.56rem;
                }
            }
        }
    }
}

.pay-shop-footer {
    width: 100%;
    height: 1.5rem;
    border-top: 1px solid #eaeaea;
    background: white;
    position: fixed;
    bottom: 0;

    .price {
        float: left;
        line-height: 1.5rem;
        font-size: 0.43rem;
        color: #666;
        padding-left: 0.3rem;

        span {
            color: red;
        }
    }

    .order {
        width: 2rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.35rem;
        margin-top: 0.3rem;
        margin-left 0.5rem
        border-radius: 30px;
        text-align: center;
        color: #fff;
        background: #f81200;
        display inline-block
        /*float: right;*/
    }
}
.dialog-address {
  z-index 100;
  position: fixed;
  background #ddd;
  padding 10px;
  left:0;
  top:156px;
  width: 100%;
  .choose {
    display flex;
    .select {
      flex: 0 0 30px;
    }
    .address {
      flex:1;
      .address-details {
        font-size: 16px;
      }
    }
  }
}
</style>




