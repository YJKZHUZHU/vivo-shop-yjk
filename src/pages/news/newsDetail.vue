<template>
  <div class="detail" id="transition">
      <DetailHeader title="资讯详情"></DetailHeader>
      <div class="detail-con" v-for="(list,index) in newsDetail" :key="index">
        <div class="detail-con-box" v-html="list.newsDetail"></div>
        <div class="details-box">
          <div class="collection" @click="like(list)">
            <i class="iconfont icon-dianzan" v-if="likeNumber == 0"></i>
            <i class="iconfont icon-dianzan" v-else-if="likeNumber >0" style="color: red;"></i>
            <span>{{ likeNumber }}</span>
          </div>
          <div class="collection" @click="btn(list)">
            <i class="iconfont icon-praise" v-if="list.sc" style="color:red"></i>
            <i class="iconfont icon-praise" v-else-if="!list.sc" ></i>
            <span>收藏</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  Toast,
  MessageBox,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem
} from "mint-ui";
import DetailHeader from '../../common/header';
import { mapGetters, mapMutations,mapState } from "vuex";
export default {
  data() {
    return {
      newsDetail: [],
      likeNumber: 0
    };
  },
  components: {
    DetailHeader
  },
  computed: {
    ...mapGetters(["this.$store.state.article"])
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
    btn(list) {
      console.log(list)
      var currrentTime = this.timeFormatting()
      //找到了返回该对象，没找到返回undefined
      var idExist = this.$store.state.article.find(data => {
        return data.id == list.id;
      });
      console.log(idExist)
      if (typeof(idExist) == 'undefined') {
        list.sc = true
        var data = {
          id: list.id,
          title: list.newsTitle,
          newsCon:list.newsCon,
          currentdate: currrentTime,
          isExist: list.sc
        };
        Toast({
          message: "收藏成功",
          duration: 950
        });
        this.$store.dispatch("setArticle",data)
      } else {
         list.sc = false
        Toast({
          message: "取消收藏",
          duration: 950
        });
        this.$store.dispatch("deleteArticle",list.id)
      }
    },
    //点赞
   like: function (list) {
     list.sc = true
     this.likeNumber++
     let likeNumber = this.likeNumber
     Toast({
       message: "点赞成功",
       duration: 950
     });
     // console.log(list)
     // var idExist = this.$store.state.likeNumbers.find(data => {
     //   return data.id == list.id;
     // });
     // if (typeof(idExist) == 'undefined') {
     //   var data = {
     //     id: list.id,
     //     likeNumber: this.likeNumber
     //   };
     //
     // }
       var data = {
         id: list.id,
         likeNumber: likeNumber
       };
     this.$store.dispatch("like_numbers",data)
   }
  },
  mounted() {
    // console.log( _this.likeNumber)
    var _this = this;
    var merId = location.href.split('?')[1].split('&')[0].split('=')[1]
    // for(var i in JSON.parse(localStorage.getItem('likeNumbers'))){
    //   if(JSON.parse(localStorage.getItem('likeNumbers'))[i].id == merId) {
    //     _this.likeNumber = JSON.parse(localStorage.getItem('likeNumbers'))[i].likeNumber
    //   }
    // }
    var id = this.$route.query.id;
    axios.get("/api/index_goods").then(function(res) {
      for (var i = 0; i < res.data.data.data.news.length; i++) {
        if (res.data.data.data.news[i].id == id) {
          _this.newsDetail.push(res.data.data.data.news[i]);
        }
      }
     // for(var i in JSON.parse(localStorage.getItem()))
    });
    for(var i in  _this.newsDetail) {
      if(JSON.parse(localStorage.getItem('article')).length > 0 && _this.newsDetail[i].id == JSON.parse(localStorage.getItem('article'))[i].id){
        _this.newsDetail[i].sc = JSON.parse(localStorage.getItem('article'))[i].isExist
      }else {
        console.log(1)
      }
      if(JSON.parse(localStorage.getItem('likeNumbers')).length > 0 && JSON.parse(localStorage.getItem('likeNumbers'))[i].id ==_this.newsDetail[i].id  ){
        _this.likeNumber = JSON.parse(localStorage.getItem('likeNumbers'))[i].likeNumber
      }else {
        console.log(1)
      }

    }
  }
  // created(){
  //   var id = this.$route.query.id;

  // }
};
</script>


<style lang="stylus" scoped>
.detail {
  position: absolute;

  .detail-con {
    background: white;

    .detail-con-box {
      width: 90%;
      margin: auto;
      text-align: justify;
      font-weight: 400;
      padding-top: 1.45rem;
      font-size: 0.4rem;
      line-height: 0.59rem;
    }

    .details-box {
      width: 100%;
      height: 2rem;
      background: #ffffff;
      display: flex;
      justify-content: center;
      color: #25b5fe;

      div {
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
        border: 1px solid #25b5fe;
        border-radius: 30px;
        margin: auto 0.3rem;
        text-align: center;
        float: left;

        span {
          padding-left: 0.1rem;
          font-size .36rem
        }
      }

      .collection {
        display: flex;
        justify-content: center;
        span{
          font-size .36rem
        }
      }
    }
  }
}
</style>
