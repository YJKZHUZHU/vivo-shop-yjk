import {RECEIVE_USER_INFO,RESET_USER_INFO} from './type'
import {
  reqUserInfo,
  reqLogout,
} from '../api'
const actions={
    //购物车
    setCart({commit},data){
        commit('SET_CARTS',data)
    },
    
    //文章收藏
    setArticle({commit},data){
        commit('SET_ARTICLE',data)
    },
    //取消文章收藏
    deleteArticle({commit}, data){
      console.log(data)
      commit('DELETE_ARTICLE',data)
    },
    //文章点赞
    like_numbers({commit}, data) {
      // console.log(data)
      commit('LIKE_NUMBERS', data)
    },
    //商品收藏
    setGoods({commit},data){
        commit('SET_GOODS',data)
    },
    //取消收藏
    deleteSetGoods({commit}, data){
        commit('DELETE_SET_GOODS', data)
    },
    //地址
    setAddress({commit},data){
        commit('SET_ADDRESS',data)
    },
    // 编辑地址
    editAddress({commit}, data) {
        commit('EDIT_ADDRESS', data)
    },
    //订单
    setOrders({commit},data){
        commit('SET_ORDERS',data)
    },
  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
}

export default actions
