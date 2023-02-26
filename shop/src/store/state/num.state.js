export default{
    namespaced:true,
  //全局的状态初始化
    state:{
        count:1
    },
    //计算state,获取对应的值
    getters:{
        getCountStates(state2){
          
          return state2.count>=5
        }
    
    },
    //更新状态的方法，更新state的唯一方法，commit  mutations 
    mutations:{
      setCount(state1,numO){
          state1.count=numO
      }
    },
    //可以异步操作，可以返回promise,更改数据还是传递到mutations中去更改
    actions:{
      setCountPromise(context,numA){
          return new Promise((resolve,reject)=>{
              if (numA>100){
                reject("值不能大于100")
              }else{
                //commit("mutation中方法名")
                context.commit("setCount",numA)
                //此处返回promise成功对象，如果不写此函数，调用此方法时数据传输不过去
                resolve()
              }
          })
      }  
    }
 
}