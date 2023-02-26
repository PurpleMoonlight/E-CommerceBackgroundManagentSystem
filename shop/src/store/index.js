import numberst from "./state/num.state.js"
import { createStore } from "vuex"
import userInfor from "./state/userinfo.state.js"
export default createStore({
    //数据比较多分模块
    modules:{
        numberst,
        userInfor
    }
})