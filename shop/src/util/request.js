import {post,get,put,deleteUser} from "./service.js"

//暴露loginAPI
export  const loginApi=data=>{
    return post({
        url:"/login",
        data
    })
}
//获取用户列表
//users这里请求的路径是后台API接口用户列表的路径
//具体参考后台电商管理后台API
export const userListApi=data=>{
    return get({
        url:"/users",
        data
    })
}
//新增用户列表
/* 
### 1.3.2. 添加用户API，具体参见电商后台管理API接口文档

- 请求路径：users
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名称 | 不能为空 |
| password | 用户密码 | 不能为空 |
| email    | 邮箱     | 可以为空 |
| mobile 
*/

export const userAddApi=data=>{
    return post({
        url:"/users",
        data
    })
}
/* 
 1.3.3. 修改用户状态

- 请求路径：`users/:uId/state/:type`
- 请求方法：put

*/

export const userChangeStatusAPi=data=>{
    return put({
        //注意此处的符号书写，若换成"",更改状态操作页面会出现用户id必须是数字的弹窗
        url:`users/${data.id}/state/${data.mg_state}`,
    })
}


/* 
### 1.3.4. 编辑用户提交

- 请求路径：`users/:id`
- 请求方法：put
- 请求参数

*/
export const userInfoEditAPi=data=>{
    return put({
        //注意此处的符号书写，若换成"",更改状态操作页面会出现用户id必须是数字的弹窗
        url:`users/${data.id}`,
        data
    })
}
/* 

### 1.3.5. 删除单个用户

- 请求路径：users/:id
- 请求方法：delete
- 请求参数

*/

export  const deleteSingleUserInfoApi=data=>{
    return deleteUser({
        url:`users/${data.id}`
    })
}
/* 
## 1.4. 角色管理

### 1.4.1. 角色列表

- 请求路径：roles

- 请求方法：get

*/
export const getRolesListApi=data=>{
    return get({
        url:`/roles`,
        data
    })
}
/* 
- 请求路径：roles
- 请求方法：post
- 请求参数


*/
export const addRolesApi=data=>{
    return post({
        url:`/roles`,
        data
    })
}
/* 
### 1.4.4. 编辑提交角色

- 请求路径：roles/:id
- 请求方法：put
- 请求参数

| 参数名   | 参数说明 | 备注                  |
| -------- | -------- | --------------------- |
| :id      | 角色 ID  | 不能为空`携带在url中` |
| roleName | 角色名称 | 不能为空              |
| roleDesc | 角色描述 | 可以为空              |
*/
export const editRolesInfoApi=data=>{
    return put({
        url:`/roles/${data.id}`,
        data
    })
}
/* 

### 1.4.5. 删除角色

- 请求路径：roles/:id
- 请求方法：delete
- 请求参数

*/

export const deleteRolesApi=data=>{
    return deleteUser({
        url:`/roles/${data.id}`,
    })
}

/* 

## 1.5. 商品管理

### 1.5.1. 商品列表数据

- 请求路径：goods
- 请求方法：get
- 请求参数
*/
export const goodsListApi=data=>{
    return get({
        url:`/goods`,
        data
    })
}


