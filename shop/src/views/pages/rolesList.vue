<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <el-button @click="dialogFormVisible=true" type="primary">新建角色</el-button>
            <el-table    
             :data="rolesList"
             style="width: 100%">
                <el-table-column prop="roleName" label="角色名称"  /> 
                <el-table-column prop="roleDesc" label="角色描述"  />
                <el-table-column >
                    <template #default="scope">
                        <el-button type="primary" @click="editRow(scope.row)" >编辑</el-button>
                        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
              
            </el-table>
        </div>
            <!-- 新建编辑弹窗表单 -->
            <!-- 
                只有编辑保存的时候有| :id  | 角色 ID  | 不能为空`携带在url中` |
                
                | roleName | 角色名称 | 不能为空              |
                | roleDesc | 角色描述 | 可以为空  -->

            <el-dialog v-model="dialogFormVisible" 
            
            :title="EditRowData.id?'编辑角色':'新建角色'">
                    <!-- :close="clearForm"  -->
                <el-form :model="formEditRolesData"
                    :rules="rules"
                    ref="rolesDomFormEdit"
                >
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="formEditRolesData.roleName" placeholder="请输入角色名称" />
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="formEditRolesData.roleDesc" placeholder="请输入角色描述" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <div class="flex">
                        <el-button >取消</el-button>
                        <el-button type="primary" @click="submitEditForm(rolesDomFormEdit)">确认</el-button>
                    </div>
                </template>
            </el-dialog>  
        <div>

        </div>
    </div>
</template>
<script>
import {getRolesListApi,addRolesApi,editRolesInfoApi,deleteRolesApi} from "@/util/request.js"
import { reactive,toRefs ,ref} from "vue";
    export default{
        name:"rolesList",
        setup(){
            const data=reactive({
                rolesList:[],
                dialogFormVisible:false,//默认隐藏弹窗
                formEditRolesData:{
                    roleName:"",
                    roleDesc:""

                },
                rules:{
                    roleName:{
                        required:"true",message:"此项为必填。",trigger:"blur"
                    }
                },
                EditRowData:
                {}
           
  
            })
            const getList=()=>{
                getRolesListApi().then(res=>{
                    data.rolesList=res.data
                })  
            }
            
            const submitEditForm=(FormX)=>{
                //对提交的表单DOM对象进行验证
                FormX.validate(res=>{
                    if (!res){
                        
                        return
                    }
                    
                    //提交表单
                    if(data.formEditRolesData.id){
                        // data.formEditRolesData=""
                        // 编辑角色弹窗与新建角色弹窗共用一个
                        // 数据
                        editRolesInfoApi(data.formEditRolesData).then(res=>{
                            if(res.data){
                                //隐藏弹框
                                data.dialogFormVisible=false;
                                data.formEditRolesData={
                                    roleName:"",
                                    roleDesc:""
                                }
                                // console.log ("编辑成功")
                                // console.log(res.data)
                                getList();
                            }
                            
                    })
                    }else{
                        //验证通过  开始向后台发送请求存储数据到数据库
                        addRolesApi(data.formEditRolesData).then(res=>{
                            if(res.data){
                                //隐藏弹框
                                data.dialogFormVisible=false;
                                // console.log("添加成功")
                                console.log(data.formEditRolesData)
                                data.formEditRolesData = {
                                    roleName:"",
                                    roleDesc:""
                                }
                                getList() 
                            } 
                        })
                    }

       
                })
            }

            const editRow=(row)=>{
                data.dialogFormVisible=true;
                data.EditRowData=row
                const {roleName,roleDesc,id} =row
                data.formEditRolesData={
                    id,
                    roleName,
                    roleDesc
                } 


            }
            //  //清除表单
            // const clearForm=()=>{
            //     data.formEditRolesData={
            //         roleName:"",
            //         roleDesc:""
            //     }
            // }
           
            const deleteRow=(row)=>{
                deleteRolesApi(row).then(res=>{
                    if(res.data){
                        console.log("删除删除成功",res.data)
                        
                    }
                    getList()
                })

            }
            //初始化
            getList()
            const  rolesDomFormEdit=ref();
            return{
                ...toRefs(data),
                editRow,
                deleteRow,
                rolesDomFormEdit,
                submitEditForm,

                // clearForm
            }
        }
    }



</script>