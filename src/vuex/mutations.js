import state from './state'
import * as type from './type.js'
import { MessageBox } from 'mint-ui';

const matutaions={
    //购物车
    [type.SET_CARTS](state,data){
      if (localStorage.getItem('userInfo')) {
        state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
        var datas = []
        datas.push(data)
        state.carts[state.userInfo.name] = state.carts[state.userInfo.name] || [];
        state.carts[state.userInfo.name] = state.carts[state.userInfo.name].concat(datas);
        console.log(state.carts)
        localStorage.setItem("carts",JSON.stringify(state.carts));
      }else {
        MessageBox.confirm('您还没有登入哦').then(function (action) {
          location.href = location.href.replace('goodDetail','login')
        })
      }
    },
    //文章收藏
    [type.SET_ARTICLE](state,data){
        state.article.push(data)
        localStorage.setItem("article",JSON.stringify(state.article));
    },
    //取消文章收藏
    [type.DELETE_ARTICLE](state,data){
      for (var i in state.article) {
        // console.log(i)
        if (state.article[i].id === data){
          state.article.splice(i,1)
        }
      }
      localStorage.setItem("article",JSON.stringify(state.article));
    },
    //文章点赞
  [type.LIKE_NUMBERS](state,data){
    Array.prototype.remove=function (value) {
      var index = this.indexOf(value)
      if(index > -1){
        this.splice(index,1)
      }
    }
    for (var i in state.likeNumbers) {
      if(state.likeNumbers[i].id == data.id){
        state.likeNumbers.remove(state.likeNumbers[i])
      }
    }
    state.likeNumbers.push(data)
    localStorage.setItem("likeNumbers",JSON.stringify(state.likeNumbers));
  },
    //商品收藏
    [type.SET_GOODS](state,data){
        state.collections.push(data)
        localStorage.setItem("collections",JSON.stringify(state.collections));
    },
    //取消商品收藏
    [type.DELETE_SET_GOODS](state,data){
      for (var i in state.collections) {
        // console.log(i)
        if (state.collections[i].id === data){
          state.collections.splice(i,1)
        }
      }
      localStorage.setItem("collections",JSON.stringify(state.collections));
    },
    //订单
    [type.SET_ORDERS](state,data){
        state.orders.push(data)
        state.pendingReceipt.push(data)
        localStorage.setItem("orders",JSON.stringify(state.orders));
        localStorage.setItem("pendingReceipt",JSON.stringify(state.orders));
    },
    //地址
    [type.SET_ADDRESS](state,data){
      if (localStorage.getItem('userInfo')) {
        state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
        var datas = []
        datas.push(data)
        state.address[state.userInfo.name] = state.address[state.userInfo.name] || [];
        state.address[state.userInfo.name] = state.address[state.userInfo.name].concat(datas);
        localStorage.setItem("address",JSON.stringify(state.address));
      }else {
          MessageBox.confirm('您还没有登入哦').then(function (action) {
            location.href = location.href.replace('address','login')
          })
      }
    },
    //编辑收货地址
    [type.EDIT_ADDRESS](state,data) {
      state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
        for (var i = 0; i<state.address[state.userInfo.name].length; i++) {
            if (i === data.addressId) {
                delete(data.addressId)
                state.address[state.userInfo.name][i] = data
            }
        }
      },
    [type.RECEIVE_USER_INFO] (state, {userInfo}) {
      state.userInfo = userInfo
      localStorage.setItem("userInfo",JSON.stringify(state.userInfo));
    },
    [type.RESET_USER_INFO] (state) {
      state.userInfo = {}
      localStorage.setItem("userInfo",JSON.stringify(state.userInfo));
    },
    //文章删除
    del:(state,index)=>{
        MessageBox.confirm('确定取消收藏该文章么？').then(action=>{
            state.article.splice(index,1)
            localStorage.setItem("article",JSON.stringify(state.article));
        })
    },
    //商品删除
    cancel:(state,index)=>{
        MessageBox.confirm('确定取消收藏该商品么？').then(action=>{
            state.collections.splice(index,1)
            localStorage.setItem("collections",JSON.stringify(state.collections));
        })
    },
    laji:(state,index)=>{
        MessageBox.confirm('确定删除该收货地址么？').then(action=>{
            state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
            state.address[state.userInfo.name].splice(index,1)
            localStorage.setItem("address",JSON.stringify(state.address));
        })
    },
    //购物车删除
    shanchu:(state,index)=>{
        MessageBox.confirm('确定删除该商品么？').then(action=>{
            state.carts.splice(index,1)
            localStorage.setItem("carts",JSON.stringify(state.carts));
        })
    },
    //订单删除
    odefault:(state,index)=>{
        MessageBox.confirm('确定删除该订单么？').then(action=>{
            state.orders.splice(index,1)
          localStorage.setItem("orders",JSON.stringify(state.orders));
        })
    },
    // //确认收货
    // confirmReceipt:(state,index)=>{
    //   MessageBox.confirm('确定要收货吗？').then(action=>{
    //     state.orders.splice(index,1)
    //     localStorage.setItem("pendingReceipt",JSON.stringify(state.orders));
    //   })
    // },

    //数量加
     add(state,index){
       state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
        state.carts[ state.userInfo.name][index].value++
    },
    //数量减
    reduce(state,index){
      state.userInfo.name= state.userInfo.name ? state.userInfo.name : state.userInfo.phone
        state.carts[state.userInfo.name][index].value==1?state.carts[state.userInfo.name][index].value=1: state.carts[state.userInfo.name][index].value--
    },

    settlement:(state,data)=>{
        console.log(this,state,data)
      MessageBox.confirm('确定要购买吗').then(action=>{
        state.carts={};
        localStorage.setItem("carts",JSON.stringify(state.carts));
      })

    },

}

export default matutaions
