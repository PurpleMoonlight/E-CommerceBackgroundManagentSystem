<template>
        <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>

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
                
            </div>
            <div>
                <!-- 表格 -->
                <!-- 
                   el-table   的  data：代表要展示页面的获取的用户数据数组goodsList
                   el-table-column  列     prop每条数据对应属性
                   label代表 列名
                   scope.row相当于一条数据
                 -->
                <el-table
                :data="goodsList"
                style="width: 100%"
                >
                <!-- 
                | total        | 总共商品条数 |                                        |
                | pagenum      | 当前商品页数 |                                        |
                | goods_id     | 商品 ID      |                                        |
                | goods_name   | 商品名称     |                                        |
                | goods_price  | 价格         |                                        |
                | goods_number | 数量         |                                        |
                | goods_weight | 重量         | 不能为空                               |
                | goods_state  | 商品状态     | 商品状态 0: 未通过 1: 审核中 2: 已审核 |
                | add_time     | 添加时间     |                                        |
                | upd_time     | 更新时间     |                                        |
                | hot_mumber   | 热销品数量   |                                        |
                | is_promote   | 是否是热销品 |                                        |

                 -->
                    <el-table-column prop="goods_name" label="商品名称" width="180" />
                    <el-table-column prop="goods_price" label="价格(￥) " width="180" />
                    <el-table-column prop="goods_number" label="数量" />
                    <el-table-column prop="goods_weight" label="重量" />
                    
                    <!-- mg_state 状态  -->
                    <el-table-column prop="goods_state" label="商品状态" >
                        <template #default="scope">
                            <p>{{switchState(scope.row.goods_state)}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hot_mumber" label="热销品数量" />
                    <el-table-column prop="is_promote" label="是否是热销品" />
                    
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
    

    </div>
</template>
<script>
import { reactive ,toRefs,ref} from 'vue';
import {goodsListApi} from "@/util/request.js"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'goodsList',
    setup(){
        const data=reactive({
            keyWord:"",
            searchParams:{
                query:"",
                pagenum:1,
                pagesize:5
            },
            total:0,
            goodsList:[],
      


        })
        //搜索用户 绑定点击事件
        const searchList=()=>{
            goodsListApi(data.searchParams).then(res=>{
                if (res.data){
                    console.log("用户数据",res)
                    data.goodsList=res.data.goods
                    data.total=res.data.total
                }
            })
        }
        //goods_state  | 商品状态     | 商品状态 0: 未通过 1: 审核中 2: 已审核 
        const switchState=state=>{
            switch (state) {
                case 0:
                    return "未通过"
                    break;
                case 1:
                    return "审核中"
                    break;
                case 2:
                    return "已审核"
                    break;                
        
            }
        }
        //方法初始化
        searchList()
        
        return {
            ...toRefs(data),
            searchList,
            switchState
            
        }

    }
}

</script>