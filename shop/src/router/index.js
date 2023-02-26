import { createRouter, createWebHistory} from 'vue-router'
import store from "../store/index.js"

const routes = [
  {
    path:'/login',
    name:"loginPage",
    component:()=>import('../views/pages/loginPage.vue'),
  },
  {
    path:'/',
    name:'layout',
    component:()=>import('../views/layOut/layOutView.vue'),
    redirect:'/index',
    //子路由嵌套路由
    children:[
        {
          path:'/index',
          name:'indexList',
          component:()=> import('../views/pages/index.vue')
        },
        {
          path:'/userw',
          name:'usersList',
          component:()=> import('../views/pages/usersList.vue')
        },
        {
          path:'/roles',
          name:'rolesList',
          component:()=> import('../views/pages/rolesList.vue')
        },
        {
          path:'/goods',
          name:'goodsList',
          component:()=> import('../views/pages/goodsList.vue')
        }
    ]
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})


//路由守卫
router.beforeEach((to,from,next)=>{
  /*
  to:从哪个页面
  from:到哪个页面
  只有执行到next()页面才会进行跳转
   */
  //打印userInfo
  console.log("store",store.state.userInfor) //
  //console.log("store",store.commit("setUserInfo","nihao"))
  //判断用户是否登录
  const userI=store.state.userInfor.userInfo;
  //外层if语句判断为登录用户名和密码是否为空
  if(!userI.username){
      //未登录，跳转到登录页面
      if(to.path==="/login"){
        next()
        return
      }
      next("/login")
  }else{
    next()
  }


 })

export default router
