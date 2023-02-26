<template>
    
    <div class="common-layout">

        <el-container  >
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img class="logo" src="../../assets/logo.png" alt="">
                    <h1 class="title">商铺后台管理系统</h1>
                </div>
                <el-button type="danger" @click="loginOut">退出</el-button>
            </el-header>
                <el-container>
                    <el-aside width="200px" class="common-aside">
                        <el-menu 
                            background-color="none" 
                            text-color="#fff"
                            :router="true"
                        >

                            <!-- 一级导航 一般不具备跳转功能的-->
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon><User /></el-icon>
                                    <span>账号管理</span>
                                </template>
                                <el-menu-item-group >
                                    <el-menu-item index="/userw">账号列表</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                                                        <!-- 一级导航 一般不具备跳转功能的-->
                            <el-sub-menu index="2">
                                <template #title>
                                    
                                    <el-icon><Box /></el-icon>
                                    <span>角色管理</span>
                                </template>
                                <el-menu-item-group >
                                    <el-menu-item index="/roles">角色列表</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu> 
                            <el-sub-menu index="2">
                                <template #title>
                                    
                                    <el-icon><Box /></el-icon>
                                    <span>商品管理</span>
                                </template>
                                <el-menu-item-group >
                                    <el-menu-item index="/goods">商品列表</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu> 
                        </el-menu>   
                    </el-aside>
                    <el-main>
                            <RouterView></RouterView>
                    </el-main>
            </el-container>
        </el-container>
    </div>
    
</template>
<!-- <template>
<div>
    <h1>我是导航
    <router-link to="/userw">用户列表
    </router-link>
    </h1>
    <h1>我是侧边栏
    <router-link to="/roles">角色列表</router-link>
    </h1>
</div>
</template> -->
  
<script>
import { useRouter } from "vue-router"
import {useStore}  from  "vuex"
export default {
        // eslint-disable-next-line vue/multi-word-component-names
    name:'layout',
    setup(){
        const store=useStore();
        const router=useRouter();
        const loginOut=()=>{
        localStorage.removeItem("loginData")
        store.commit("setUserInfo",{})
        router.push({
            path:"/login"
        })
        }
        return {
            loginOut
        }
    }
}
</script>
<style>
    .el-container{
        height:100vh;
        overflow:hidden ;
    }
    .common-header{
        background:rgb(47, 27, 2);
        display: flex; 
    }
    .common-aside{
        background:rgb(59, 42, 2); 
    }
    .logo{
        width:80px;
    }
    .title{
        color: #f1edf0;
    }
    .el-main{
        background: #efefef;


    }
</style>