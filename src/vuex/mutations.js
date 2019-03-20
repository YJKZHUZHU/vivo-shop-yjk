import state from './state'
import * as type from './type.js'
import { MessageBox } from 'mint-ui';

const matutaions={
    //购物车
    [type.SET_CARTS](state,data){
        state.carts.push(data)
        localStorage.setItem("carts",JSON.stringify(state.carts));
    },
    //文章收藏
    [type.SET_ARTICLE](state,data){
        state.article.push(data)
        localStorage.setItem("article",JSON.stringify(state.article));
    },
    //取消文章收藏
    [type.DELETE_ARTICLE](state,data){
      console.log(state.article,data)
      for (var i in state.article) {
        // console.log(i)
        if (state.article[i].id === data){
          state.article.splice(state.article[i],1)
        }
      }
      console.log(state.article,data)
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
    //商品
    [type.SET_GOODS](state,data){

        state.collections.push(data)
        localStorage.setItem("collections",JSON.stringify(state.collections));
    },
    //订单
    [type.SET_ORDERS](state,data){
        state.orders.push(data)
        localStorage.setItem("orders",JSON.stringify(state.orders));
    },
    //地址
    [type.SET_ADDRESS](state,data){
        state.address.push(data)
        localStorage.setItem("address",JSON.stringify(state.address));
    },
    //编辑收货地址
    [type.EDIT_ADDRESS](state,data) {
        for (var i = 0; i<state.address.length; i++) {
            if (i === data.addressId) {
                delete(data.addressId)
                state.address[i] = data
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
            state.address.splice(index,1)
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


    //数量加
     add(state,index){
        state.carts[index].value++
    },
    //数量减
    reduce(state,index){
        state.carts[index].value==1?state.carts[index].value=1: state.carts[index].value--
    },

    settlement:(state,data)=>{
        console.log(this,state,data)
        state.carts=[];
        localStorage.setItem("carts",JSON.stringify(state.carts));
    },

}

export default matutaions
