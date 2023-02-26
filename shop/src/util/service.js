import axios from "axios"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import  store from "../store/index.js"
let loadingObj =null
//使用axios创建axios实例
const Service=axios.create({
    timeout:8000,
    baseURL:"http://127.0.0.1:8888/api/private/v1/",
    headers:{
        "Content-type":"application/json;charset=utf-8",
        
        "Authorization":store.state.userInfor.userInfo.token
    }
})
//请求拦截增加loading对请求做统一处理
Service.interceptors.request.use(config=>{
    loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',

      })
    return config
})
//响应拦截对返回值做统一处理
Service.interceptors.response.use(response=>{
    //关闭loading
    loadingObj.close()
    //判断用户是否存在
    const data=response.data
    if(data.meta.status!=200&&data.meta.status!=201){
        //请求出错
        ElMessage.error(data.meta.msg||"服务器出错")
        //请求出错
        return data//这里return一个其实是不会返回响应数据的
    }
    return response.data
},error=>{
    loadingObj.close()
    ElMessage({
        message:"服务器错误",
        type:"error",
        duration:"2000"
    })
    return error  //自己增加 的代码
})
//post请求

export const post=config=>{
    return Service({
       ...config,
       method:"post",
       data:config.data

    })
}
//get请求
export const get=config=>{
    return Service({
       ...config,
       method:"get",
       params:config.data

    })
}


//put请求 修该用户状态
export const put=config=>{
    return Service({
    ...config,
    method:"put",
    data:config.data
    })
}
//删除的单个用户信息
export const deleteUser=config=>{
    return Service({
    ...config,
    method:"delete",
    })
}


