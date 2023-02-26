export default{
    state:{
        userInfo: (localStorage.getItem("loginData")&&
                JSON.parse(localStorage.getItem("loginData")))||{}
    },
    mutations:{
        setUserInfo(state,infoU){
            state.userInfo=infoU
        }

    }
}