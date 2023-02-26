<template>
<!--vue3的生命周期  -->
  <div >
    <h1>This is an about page</h1>
    <div id="dom">{{msg}}</div>
    <!--v-on:事件名="事件方法" 绑定事件  简写：  @:事件名="事件方法"-->
    <!--事件及方法 直接声明在setup里 -->
    <button v-on:click="handeClick">点击我</button>
    <hr>
    <!--  input输入事件包括了
    blur:失去焦点
    focus:获取焦点
    change:内容更改
    -->


    <!--   v-model双向绑定-->
    <input type="text" placeholdeer="请输入姓名" v-model="userName"
    @:focus="handeFocus"
    
    @:blur="handeBlur"
    v-on:change="handeChange"><br/>
    <input type="text" placeholder="请输入性别" v-model="userSex"><br/>
    <input type="text" placeholder="手机号" v-model="userPhone"
    @:input="handeInput" 
    
    ><br/>
    <textarea placeholder="请输入你的建议" cols="30" rows="10" v-model="userInput"></textarea>
    <p>{{userName}}---{{userInput}}</p>
    <button v-on:click="submit">提交</button>




  </div>
</template>
<script>
import  {reactive,toRefs,onBeforeMount,onMounted,onBeforeUpdate,onUpdated} from "vue";
export default{
  name:"about",
  setup(){
    const data=reactive({
      msg:"你好！",
      msg1:"hello",
      userName:"",
      userSex:"",
      userPhone:"",
      userInput:""
    })
    //数据渲染前
    onBeforeMount(()=>{
      console.log("onBeforeMount",document.querySelector("#dom"))
     // console.log("onBeforeMount",document.getElementById("dom"))
    })
    //选然后
    onMounted(()=>{
      console.log("onMounted",document.querySelector("#dom"))
      // console.log("onMounted",document.getElementById("dom"))
      setTimeout(()=>{
      //data.msg="hello";
      data.msg1="hello";
    },2000)
    })


    //dom更新前
    onBeforeUpdate(()=>{
      console.log("onBeforeUpdate");
    })

    //dom更新后
    onUpdated(()=>{
      console.log("onUpdated");
    })
    //事件及方法
    const handeClick=()=>{
      alert("你好")
    }

    const handeFocus=()=>{
      console.log("你很牛,获取焦点了")
    }
    const handeInput=()=>{
        //正则验证手机号
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(data.userPhone)){
          console.log("不符合")
        }else{
          console.log("符合手机号")
        }
    }
    const handeBlur=()=>{
      console.log("OK，失去焦点了")
      if (!data.userName){
        alert("姓名必填")
      }
    }
    const handeChange=()=>{
      console.log("独孤求败，我变了")
    }
    const submit=()=>{
        alert(`${data.userName}${data.userSex}的建议是${data.userInput}`)
    }



    return{
        ...toRefs(data),
        handeClick,
        handeFocus,
        handeInput,
        handeBlur,
        handeChange,
        submit

    }
  }

}
</script>
