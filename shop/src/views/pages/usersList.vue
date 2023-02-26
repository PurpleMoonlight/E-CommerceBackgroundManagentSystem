<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>

        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <div class="flex">
                <div class="input_box1">
                    <el-input
                    v-model="searchParams.query"
                    placeholder="搜索关键字"
                    class="input-with-select"
                    >
                    <template #append>
                        <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
                    </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="addUser">新建用户</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <!-- 
                   el-table   的  data：代表要展示页面的获取的用户数据数组userList
                   el-table-column  列     prop每条数据对应属性
                   label代表 列名
                   scope.row相当于一条数据
                 -->
                <el-table
                :data="userList"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="username" label="姓名" width="180" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="mobile" label="电话" />
                    <el-table-column prop="role_name" label="角色" />
                    <!-- <el-table-column prop="create_time" label="创建时间" /> -->
                    <!-- mg_state 状态  -->
                    <el-table-column prop="mg_state" label="状态" >
                        <template #default="scope">
                            <!-- scope.row 表示一整条数据 -->
                            <el-switch v-model="scope.row.mg_state"  @change="switchChange(scope.row)"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="primary" @click="editRow(scope.row)" >编辑</el-button>
                            <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    
                </el-table>
                <!-- 分页  使用element-plus插件中元素
                v-model:current-page  当前页数
                v-model:page-size	每页显示个数选择器    
                size-change 处理页码大小变动时候触发的事件
                current-change 当前页变动时候触发的事件
                page-sizes 接受一个整数类型的数组，数组元素为展示
                的选择每页显示个数的选项，[100, 200, 300, 400] 表
                示四个选项，每页显示 100 个，200 个，300 个或者 
                400 个。
                设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。
                 prev上一页
                 next为下一页
                 pager表示页码列表
                 jumper表示跳页元素
                 total表示总条目数，
                 size用于设置每页显示的页码数量    
     
                -->
                <el-pagination
                    v-model:current-page="searchParams.pagenum"
                    v-model:page-size="searchParams.pagesize"
                    :page-sizes="[2,5,10,20]"
                    :small="small"
                    layout="total, sizes, prev, pager,next,jumper"
                    :total="total"
                    @size-change="searchList"
                    @current-change="searchList"
                />
            </div>
        </div>
                <!--新建 表单
        | 参数名   | 参数说明 | 备注     |
        | -------- | -------- | -------- |
        | username | 用户名称 | 不能为空 |
        | password | 用户密码 | 不能为空 |
        | email    | 邮箱     | 可以为空 |
        | mobile   | 手机号   | 可以为空 |           

        -->
        <!-- 新建弹窗 -->
        <el-dialog v-model="dialogFormVisible" title="新建用户">
 
            <el-form :model="formData"
                :rules="rules" 
                ref="userDomForm"
            >

                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入用户密码" />
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入用户邮箱" />
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="formData.mobile" placeholder="请输入用户手机号" />
                </el-form-item>

            </el-form>
            <template #footer>
                <div class="flex">
                    <el-button >取消</el-button>
                    <el-button type="primary" @click="submitForm(userDomForm)">确认</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <!-- | email  | 邮箱     | 可以为空                    |
             | mobile | 手机号   | 可以为空     -->
        <el-dialog v-model="dialogFormEVisible" title="编辑用户">
 
            <el-form :model="formEditData"
                :rules="rulesEdit"
                ref="userDomFormEdit"
            >
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="formEditData.email" placeholder="请输入用户邮箱" />
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="formEditData.mobile" placeholder="请输入用户手机号" />
                </el-form-item>

            </el-form>
            <template #footer>
                <div class="flex">
                    <el-button >取消</el-button>
                    <el-button type="primary" @click="submitEditForm(userDomFormEdit)">确认</el-button>
                </div>
            </template>
        </el-dialog>        

    </div>
</template>
<script >
import { reactive ,toRefs,ref} from 'vue';
import {userListApi,userAddApi,userChangeStatusAPi,userInfoEditAPi,deleteSingleUserInfoApi} from "@/util/request.js"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'usersList',
    setup(){
        const data=reactive({
            keyWord:"",
            searchParams:{
                query:"",
                pagenum:1,
                pagesize:5
            },
            total:0,
            userList:[],
            dialogFormVisible:false,//默认隐藏新建对话框
            dialogFormEVisible:false,//默认隐藏编辑对话框
            //表单里的数据写在对象里面
            formData:{
                username:"",
                password:"",
                email:"",
                mobile:""
                
            },
            formEditData:{
                id:"",
                email:"",
                mobile:""   
            },
            rules:{
                username:[
                    {required:true,message:"此项为必填项",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"此项为必填项",trigger:"blur"}
                ],
                email:[
                    {required:false,
                    pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message:"请填写正确的邮箱",
                    trigger:"blur"}
                ],
                mobile:[
                    {required:false,
                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
                    message:"请填写正确的手机号码",
                    trigger:"blur"}
                

                  
                ]
            
                

            },
            rulesEdit:{
                email:[
                    {required:false,
                    pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message:"请填写正确的邮箱",
                    trigger:"blur"}
                ],
                mobile:[
                    {required:false,
                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
                    message:"请填写正确的手机号码",
                    trigger:"blur"}
                

                  
                ]  
            }

        })
        //搜索用户 绑定点击事件
        const searchList=()=>{
            userListApi(data.searchParams).then(res=>{
                if (res.data){
                    console.log("用户数据",res)
                    data.userList=res.data.users
                    data.total=res.data.total
                }
            })
        }
        //新建用户  绑定点击事件
        const addUser=()=>{
            //点击新建用户按钮时绑定显示对话框
            data.dialogFormVisible=true;

        }
        //确定和验证提交  使用elment-plus中的validate对整个表单进行验证
        const submitForm=(formE1)=>{
            //validate   首先取到表单DOM对象
                formE1.validate(res=>{
                    if(!res){
                        return
                    }
                    // 表单通过请求接口  //data.formData中携带创建的表单数据
                    userAddApi(data.formData).then(res=>{
                        if(res.data){
                            alert("通过验证")//创建用户成功
                            //隐藏对话框(弹窗)
                            data.dialogFormVisible=false; 
                            //清空对话框里的数据
                            data.formData={
                                username:"",
                                password:"",
                                email:"",
                                mobile:""                                
                            }
                            //重新更新列表
                            //意思时重新从数据库将新增的数据显示在列表当中
                            searchList()
                        }
                    })
                  

                })

            }
        //提交编辑表单
        const submitEditForm=(FormEd)=>{
            //对编辑表单验证
            FormEd.validate(res=>{
                if (!res){
                    return
                } 
                //提交修改 
                userInfoEditAPi(data.formEditData).then(res=>{
                    if (res.data){

                        //隐藏对话框(弹窗)
                        data.dialogFormEVisible=false;
                        //提交返回的数据不为空
                        //提交成功，刷新页面用户列表
                        searchList();
                    }
                })
            })
        }
        //状态更改
        const switchChange=row=> {
             console.log("操作的那一条数据",row) 
             userChangeStatusAPi(row).then(res=>{
                if (res.data){

                    searchList()
                }
             })  
        }

        //编辑数据
        const editRow=row=>{
            console.log("编辑的那一条数据",row);
            const {email,mobile,id}= row
            //展示编辑表单
            data.dialogFormEVisible=true;
            data.formEditData.email=email;
            data.formEditData.mobile=mobile;
            data.formEditData.id=id;
        }
        //删除单个用户数据
        const deleteRow=row=>{
            console.log("删除的那一条数据",row)
            deleteSingleUserInfoApi(row).then(res=>{
                if(!res.data){
                    alert("删除成功")
                    searchList()
                }
            })

        }
        //方法初始化
        searchList()
        const userDomForm=ref()
        const userDomFormEdit=ref()
        return {
            ...toRefs(data),
            searchList,
            addUser,
            submitForm,
            submitEditForm,
            userDomForm,
            userDomFormEdit,
            switchChange,
            editRow,
            deleteRow

            
        }

    }
}

</script>

<style scoped>
    .input_box1{
        width:200px; 
        margin-right: 15px;  
    }
</style>


