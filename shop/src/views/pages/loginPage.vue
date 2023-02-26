<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form
            ref="formRef"
            :model="loginData"
            label-width="100px"
            class="demo-dynamic"
            >
                <el-form-item
                prop="username"
                label="用户名"
                :rules="[
                    {
                    required: true,
                    message: '此项为必填项',
                    trigger: 'blur',
                    }


                ]"
                >
                    <el-input v-model="loginData.username"/>
                </el-form-item>
                <el-form-item
                prop="password"
                label="密码"
                :rules="[
                    {
                    required: true,
                    message: '此项为必填项',
                    trigger: 'blur',
                    }


                ]"
                >
                    <el-input v-model="loginData.password"/>
                </el-form-item>

        </el-form>
        <el-button 
        type="primary" 
        class="login_btn"
        @click="handleLogin">登录
        </el-button>
        <p>{{ numget }}</p>
    </div>
    </div>
</template>
<script>

import { reactive,toRefs } from 'vue';
import {useStore}from "vuex";
import {useRouter} from "vue-router"
import { loginApi } from '@/util/request';
export default{
    name:"loginPage",
    setup(){
        const store=useStore();
        const router=useRouter();
        const count=store.state.numberst.count
        console.log(count)//1
        const data=reactive({
            loginData:{
                username:"",
                password:""
            },
            numget:count,
        
            
        })
        const  handleLogin=()=>{
            //请求后台登录接口
            //默认用户:admin/用户密码:123456
            loginApi(data.loginData).then(res=>{
                if (res.data){
                    store.commit("setUserInfo",res.data);
                    localStorage.setItem("loginData",JSON.stringify(res.data));
                    //登录之后进行一个跳转  /userw
                    router.push({
                        path:"/index"
                    })

                }
            })

 
        }
     //vuex更改语法
        //         /*
        // useStore().state.count获取的是store/index.js文件中未更新操作state组件中的状态值
        // */

        // console.log("修改之前的getters是"+store.getters["numberst/getCountStates"])
        // //登录按钮点击触发事件
        // const handleLogin=()=>{
        //   /*   
        //     commit("setCount",100)setCount为方法名,也就是store/index.js文件中
        //     的更新状态组件mutation中的改变状态的方法
            
        //     100为参数 
        //   */
        //     // store.commit("setCount",100)
        //     store.dispatch("numberst/setCountPromise",10).then(res=>{
        //         alert("修改成功"+res)
        //     }).catch(err=>{
        //         alert(err)
        //     })
        //     //取出的是更新之后的值 100
        //     console.log(store.state.numberst.count)
        //     console.log("修改之后的getter是"+store.getters["numberst/getCountStates"])
        // }

        return {
           ...toRefs(data),
           //事件暴露
           handleLogin
        }
    }

}    
</script>
<style  scoped>
    .login_wrap{
        width:100%;
        height:100vh;
        background:rgb(6, 15, 31);
        position: relative;
    }
    .form_wrap{
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:#c144a8;
        padding:30px 50px ;
        border-radius:5px ;
    }
    .login_btn{
        display:block;
        margin: 10px auto;
    }

</style>



