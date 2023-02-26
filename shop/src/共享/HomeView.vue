<template>
    <h1>hello world</h1>
    <p v-text="name"></p>
    <!-- v-text的简写-->
    <p>{{age}} </p>
    <p>{{info}}</p>
    <!-- v-html-->
    <p v-html="info"></p>
    <!-- v-bind:属性名="变量名"绑定动态标签属性  简写：  :属性名="变量名"
    -->
    <p v-bind:data="dataVal">绑定data中的dataVal</p>
    <!-- v-bind:类名="变量名"   绑定类名-->

    <!--
    <p calss="text" v-bind:class="{'red':isRed}">我要变红</p>
    -->
    <p calss="text" :class="{'red':isRed}">我要变红</p>
    <!--  判断语句v-if 判断元素是否存在，值为false时元素未渲染在页面-->
    <p v-if="!isTrue">我是if存在</p>
    <p v-else="isTrue">else</p>


    <!--  判断语句v-show 判断是否显示，始终存在,false时隐藏元素-->
    <p v-show="isFalse">我是show</p>
    <p v-show="isTrue">我是show显示</p>

    <!--for循环-->
    <ul>
        <!--循环此数组userList-->
        <!-- v-for="(每一个对象的变量,下标) in 数组" -->
        <li v-for="(item,index) in userList" :key="index">
            姓名:{{item.username}}
            年龄:{{item.userage}}
        </li>
    </ul>


</template>

<script>
//此处如果添加toRefs参数，return后面的写法...toRefs(),
//template的中html标签中接收参数的时候就直接使用name,或者age
//如果只有reactive一个参数，则template中html标签接收时使用data.name或者data.age
import {reactive,toRefs} from "vue"
    export default{
        name:"home",
        setup(){
            //created和beforecreate这两个生命周期
            const  data=reactive({
                name:"东方不败",
                age:20,
                info:"<i>我是老司机</i>",
                dataVal:222,
                isRed:true,
                isTrue:true,
                isFalse:false,
                userList:[
                    {
                        username:"sad",
                        userage:29
                    },
                        {
                        username:"das",
                        userage:29
                    },
                        {
                        username:"fweg",
                        userage:29
                    },
                        {
                        username:"egwggrh",
                        userage:29
                    }
                ]
            })
            return {
               ...toRefs(data) 
            }
        }
    }
</script>
<style>
.red{
    color:red;
}
</style>