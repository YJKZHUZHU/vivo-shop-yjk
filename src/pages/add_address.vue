<template>
    <div>
        <Address-Header title="新增地址"></Address-Header>
        <div class="address">
            <div class="address-box">
                <label for="">收货人：</label>
                <input type="text" v-model="name " placeholder="收货人姓名">
            </div>

             <div class="address-box">
                <label for="">手机号码：</label>
                <input type="text" v-model="phone " placeholder="收货人的手机号码">
            </div>

             <div class="address-box">
                <transition name="fade">
                <AddressPicker @getLinkage='_showChildMsg' v-show="showLinkage"></AddressPicker>
                </transition>
                <label for="">选择地区：</label>
                <input type="text" v-model="zone " placeholder="请选择收货地址" @click="_showLinkage">
               
                <!-- <p v-html="result" class="getCity" @click="_showLinkage"></p> -->
                <!-- <p v-html="id" class="getCity" ></p> -->
            </div>

             <div class="address-box">
                <label for="">详细地址：</label>
                <input type="text" v-model="detail" placeholder="详细街道地址">
            </div>
        </div>

        <div class="footer">
            <a @click="btn">保存地址</a>
        </div>
    </div>
</template>

<script>
import AddressHeader from "../common/header";
import AddressPicker from './addressPicker'
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "add_address",
  data() {
    return {
      name: "",
      phone: "",
      zone: "",
      detail: "",
      showLinkage:false, //控制子组件的显示隐藏
      result:'',
    };
  },
  components: {
    AddressHeader,
    AddressPicker
  },
  methods: {
    btn() {
      if (
        this.name == "" ||
        this.phone == "" ||
        this.zone == "" ||
        this.detail == ""
      ) {
        Toast({
          message: "信息请填写完整",
          duration: 950
        });
      } else {
        var data = {
          name: this.name,
          phone: this.phone,
          zone: this.zone,
          detail: this.detail
        };
        this.$store.dispatch("setAddress",data)
        this.$router.back();
      }
    },
     _showChildMsg(msg){ //接收子组件数据
      console.log(msg)
      this.zone = msg.name
      console.log(this.zone)
      this.showLinkage=false
    },
    _showLinkage(){
      this.showLinkage=true
    }
  },
  mounted () {
      console.log(this.$route)
      this.name = this.$route.query.name
      this.phone = this.$route.query.phone
      this.zone = this.$route.query.zone
      this.detail = this.$route.query.detail
  }
};
</script>

<style lang="stylus" scoped>
.address {
    padding-top: 1.45rem;

    .address-box {
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        background: #fff;
        display: flex;
        label {
            width: 30%;
            height: 100%;
            padding-left: 0.58rem;
            font-size: 0.4rem;
            display: block;
        }

        input {
            width: 70%;
            font-size: 0.4rem;
        }
    }
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.3rem;
    border-top: 1px solid #e0e0e0;
    background: #ffffff;

    a {
        float: none;
        display: block;
        margin: 0.18rem auto;
        text-align: center;
        width: 95%;
        height: 0.9rem;
        line-height: 0.9rem;
        border-radius: 20px;
        font-size: 0.28rem;
        color: #fff;
        background-color: #00acff;
    }
}
.getCity{
  font-size: 20px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
