<template>
  <div class="o1">
    <Order-Header title="订单详情"></Order-Header>
    <div class="details-box">
      <div class="details-success">
        <p>订单状态：{{ orderStatus }}</p>
        <img src="https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/membercenter/order/no-pay_79c2dfe.png">
      </div>
      <div class="details-address">
        <p class="address-box">
          <span class="name">收货人：{{ address.name }}</span>
          <span class="phone">联系方式：{{ address.phone }}</span>
        </p>
        <p class="address-details">收货地址：{{ address.detailAddress }}</p>
      </div>
      <div class="details-list" v-for="(list,index) in o1" :key="index">
        <div class="details-list-1">
          <img :src="list.img">
          <p>
            <!-- <span>id是{{list.id}}</span> -->
            <span class="name">{{list.name}}
          <p>× {{list.value}}</p></span>
          <span class="price">¥ {{list.price}}</span>
          </p>
        </div>

        <div class="details-list-2">
          <div class="details-list-2-1">
            <p>
              <span class="span-1">订单优惠：</span>
              <span class="span-2">订单满68元包邮</span>
            </p>
            <p>
              <span class="span-1">订单备注：</span>
              <span class="span-2">{{list.ly}}</span>
            </p>
          </div>

          <div class="details-list-2-2">
            <p>
              <span class="span-1">商品总金额：</span>
              <span class="span-2">¥ {{ list.price * list.value }}</span>
            </p>
            <p>
              <span class="span-1">运费：</span>
              <span class="span-2">¥ 0.00</span>
            </p>
            <p>
              <span class="span-1">优惠：</span>
              <span class="span-2 red">-¥ 0.00</span>
            </p>
          </div>

          <div class="details-list-2-3">
            <p>
              <span class="span-1">配送方式：</span>
              <span class="span-2">顺丰速运 免邮</span>
            </p>
            <p>
              <span class="span-1">支付方式：</span>
              <span class="span-2">{{list.listname}}</span>
            </p>
            <p>
              <span class="span-1">下单时间：</span>
              <span class="span-2">{{list.orderTime}}</span>
            </p>
            <p>
              <span class="span-1">订单编号：</span>
              <span class="span-2">{{list.orderNumber}}</span>
            </p>

          </div>
        </div>
        <!-- <img :src="list.homeImg" /> -->

        <div class="order-footer">
          总计：
          <span>¥{{list.price * list.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import OrderHeader from "../common/header";

  export default {
    name: "o1",
    data() {
      return {
        o1: [],
        address: '',
        orderStatus: ''
      };
    },
    components: {
      OrderHeader
    },
    methods: {
      getData(parms) {
        axios.post('/api/searchOrder',parms).then(res => {
          if (res.data.success) {
            this.o1  = res.data.data
            if (res.data.data[0].address) {
              this.address = {
                name:res.data.data[0].address.split('--')[0].split('：')[1],
                phone: res.data.data[0].address.split('--')[1].split('：')[1],
                detailAddress: res.data.data[0].address.split('--')[2].split('：')[1]
              }
            }
            if(res.data.data[0].orderStatus){
              this.orderStatus = res.data.data[0].orderStatus == 1 ? '已完成': '待付款'
            }
          }
        })
      }
    },
    created() {
      var parms = {
        orderNumber :this.$route.query.orderNumber
      }
      this.getData(parms)
    }
  };
</script>

<style lang="stylus" scoped>
  .details-box {
    padding-top: 1.45rem;
  }

  .details-success {
    width: 100%;
    height: 2.4rem;
    background: #69c1ff;

    p {
      color: #fff;
      font-size: 0.46rem;
      line-height: 2.4rem;
      float: left;
      padding-left: 0.4rem;
    }

    img {
      width: 2.7rem;
      margin: 0.5rem;
      float: right;
    }
  }

  .details-address {
    width: 100%;
    height: 2rem;
    background: #fff;

    .address-box {
      width: 87%;
      margin: auto;
      font-size: 0.4rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;

      .phone {
        float: right;
      }
    }

    .address-details {
      width: 87%;
      margin: auto;
      color: #666;
      font-size: 0.38rem;
    }

  }

  .details-list {
    width: 100%;
    margin-bottom: 1.3rem;

    .details-list-1 {
      width: 100%;
      height: 3rem;
      background: #ffffff;
      margin-top: 5px;

      img {
        width: 2.5rem;
        margin: 0.28rem;
        float: left;
      }

      p {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 0.4rem;
          margin-top: 0.3rem;
          height: 0.6rem;
        }

        .price {
          color: red;
          font-size: 0.35rem;
          font-weight: 500;
          height: 0.6rem;
        }

        span {
          p {
            float: right;
            margin-right: 0.5rem;
          }
        }
      }
    }

    .details-list-2 {
      width: 100%;
      height: 9rem;
      background: #ffffff;

      div {
        width: 90%;
        margin: auto;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        font-size: 0.36rem;
        border-top: 1px solid #e8e8e8;

        span {
          color: #888;
          float: left;
        }

        .span-1 {
          width: 2.3rem;
          display: block;
        }
      }

      .details-list-2-1 {
        height: 2rem;

        p {
          height: 0.76rem;
          line-height: 0.76rem;
        }
      }

      .details-list-2-2 {
        height: 2.5rem;

        p {
          height: 0.76rem;
          line-height: 0.76rem;
        }

        .red {
          color: red;
        }
      }

      .details-list-2-3 {
        height: 4rem;

        p {
          height: 0.76rem;
          line-height: 0.76rem;
        }
      }
    }

    .order-footer {
      width: 100%;
      height: 1.3rem;
      background: #fff;
      position: fixed;
      bottom: 0;
      line-height: 1.3rem;
      padding-right: 0.5rem;
      font-size: 0.38rem;
      border-top: 1px solid #eaeaea;
      text-align right

      span {
        color: red;
      }
    }
  }
</style>
