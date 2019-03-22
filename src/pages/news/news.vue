<template>
  <div >
    <News-Header></News-Header>
    <News-Container :NewsContainer="NewsContainer"></News-Container>
    <News-Footer></News-Footer>
        
  </div>
</template>

<script>
import axios from 'axios';
import NewsHeader from '../../pages/News/component/NewsHeader'
import NewsContainer from '../../pages/News/component/NewsContainer'
import NewsFooter from '../../pages/footer'
export default {
    name:"information",
    components:{
        NewsHeader,
        NewsContainer,
        NewsFooter
    },
    data(){
        return{
            NewsContainer:[]
        }
    },
    created(){
        var _this=this;
        axios.get("/api/news").then(function(res) {
          if (res.data.success) {
            _this.NewsContainer=res.data.news
          }
        })
    },
    methods: {
         open:function(id){
            this.$router.push({path:"newsDetail",query:{id:id}})
        },
    }

  
}
</script>


<style lang="stylus" scoped>
</style>
