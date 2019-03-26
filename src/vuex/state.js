const state={
    article:localStorage["article"]?JSON.parse(localStorage["article"]): {},
    collections:localStorage["collections"]?JSON.parse(localStorage["collections"]): {},
    carts:localStorage["carts"]?JSON.parse(localStorage["carts"]): {},
    orders:localStorage["orders"]?JSON.parse(localStorage["orders"]): [],
    pendingReceipt:localStorage["pendingReceipt"]?JSON.parse(localStorage["pendingReceipt"]): [],
    todos:localStorage["todos"]?JSON.parse(localStorage["todos"]): [],
    address:localStorage["address"]?JSON.parse(localStorage["address"]): {},
    userInfo: localStorage["userInfo"]?JSON.parse(localStorage["userInfo"]): [], // 用户信息
    likeNumbers: localStorage['likeNumbers']?JSON.parse(localStorage['likeNumbers']): [],//点赞数
    nowIndex:0
}

export default state
