<template>
<div>
    <classify-header title="商品分类"></classify-header>
    <div class="calssify-con" >
        <div class="calssify-left" ref="wrapper">
            <ul class="calssify-left-ul" >
                <li v-for="(list,index) in left" :key="index" @click="qiehuan(index)" :class="{active:index===classifyIndex}">
                  {{ list.name }}
                </li>
            </ul>
        </div>
        <div class="calssify-right" ref="wrapper2">
            <ul class="calssify-left-ul">
                <li v-for="(list,index) in right.right_data" :key="list.id" @click="goDetails(list.id)">
                     <img v-lazy="list.img">
                    <span>{{list.name}}</span>
                </li>
            </ul>
        </div>
    </div>
    <v-footer></v-footer>
</div>

</template>

<script>
import ClassifyHeader from "../../common/header";
import Footers from "../../pages/footer";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      left: [],
      right: [],
      list: [],
      ce: [],
      key2: "",
      classifyIndex: 0
    };
  },
  components: {
    "v-footer": Footers,
    "classify-header": ClassifyHeader
  },
  computed: {
    ...mapGetters(['this.$store.state.nowIndex'])
  },
  created() {
     this.getData()
  },
  methods: {
    qiehuan(index) {
      var _this = this;
      _this.classifyIndex = index;
      _this.right = _this.list[index];
    },
    goDetails(id) {
      this.$router.push({
        path: "goodDetail",
        query: { id: id }
      });
    },
    getData() {
        var _this = this;
        axios.get("/api/classify").then(function(res) {
          if (res.data.success) {
            _this.left = res.data.classify[0].left;
            _this.list = res.data.classify[0].right;
            _this.right = _this.list[0];
          }
    });
    }
  }



};
</script>

<style lang="stylus" scoped>
.active {
    border-left: 2px solid;
    background: #ffffff;
    color: #199cfe;
}

.calssify-con {
    display: flex;
    /*overflow: hidden;*/
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    padding-top: 1.45rem;

    .calssify-left {
        flex: 0 0 2.9rem;
        width: 4rem;
        height: 100%;
        background: #f6f6f6;
        margin-bottom: 1.71rem;
        font-size 0.35rem

        li {
            height: 1.3rem;
            line-height: 1.3rem;
            text-align: center;
        }
    }

    .calssify-right {
        flex: 1;
        height: 100%;
        background: white;
        margin-bottom: 1.51rem;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                display: flex;
                flex-direction: column;
                text-align: center;
                width: 33%;
                margin-top: 0.3rem;
                font-size: 0.34rem;
                float: left;

                img {
                    width: 1.98rem;
                    display: block;
                    margin: auto;
                }

                span {
                    color: #999;
                    line-height: 0.9rem;
                    font-size: 0.34rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
