<template>
  <div class="hello">
    <h3>展示的分类管理</h3>
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="goodsSortOne"
      label="分类id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="viewName"
      label="分类名称"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    
        
  </el-table>
  <div style="margin-top: 20px">
      <el-button
          @click="handleEdit()">添加分类</el-button>
  </div>
  <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
    <el-form >
         <el-form-item label="添加的分类">
            <el-select v-model="addOption"  placeholder="请选择要展示的一级分类"  >
                <el-option
                v-for="(item, i) in sortOneList" 
                :label="item.sortName" 
                :value="item.goodsSortOneId"
                :key="item.goodsSortOneId"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormOnclick()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HotViewHome',
  data () {
    return {
      msg: '展示的分类',
      response:'',
      mydata:'',
      code:'',
      token:'',
      sortOneList:'',
      tableData: [],
      addOption:'',
      dialogFormVisible: false,
    }
  },
    methods: {
        requestPost:function (str,obj,successfun,failfun){
        this.$axios({
                url:str,
                method:'post',
                data:obj,
                headers: {'token':localStorage.getItem("token")},
            })
            .then(res=>{
                this.response = res.data;
                this.mydata = res.data.data;
                this.msg = res.data.message;
                this.code = res.data.code;
                this.token = res.data.token;  
                if(successfun!=null)
                successfun();
            })
            .catch(Error=>{
                if(failfun!=null)
                failfun();
            })
        },
        handleEdit(index, row) {
            var This = this;
            This.dialogFormVisible = true;
        },
        handleDelete(index, row) {
            var This = this;
            var json={goodsSortOne: row.goodsSortOne}
            This.requestPost("/manage/removeViewSortById",json,function(){
                if(This.code == 0)
                This.alertMessage(This,0,"删除成功")
                else
                This.alertMessage(This,1,"删除失败")

                This.tableData.splice(index,1);
            },null)
        console.log(index, row);
        },
        dialogFormOnclick(){
            var This = this;
            var json={goodsSortOne: This.addOption}
            This.requestPost("/manage/addViewSort",json,function(){
                if(This.code == 0)
                This.alertMessage(This,0,"添加成功")
                else
                This.alertMessage(This,2,"添加失败")
                This.dialogFormVisible = false;

            },null)
        },
        initData:function(){
            var This = this;
            This.requestPost("/manage/getAllViewSort",null,function(){
                This.tableData = This.mydata;
            },null)

            This.requestPost("/manage/getAllSortOneNotInViewSort",null,function(){
                This.sortOneList = This.mydata;
            },null)
        },
        alertMessage:function(This,type,message){
        
        if(type == 0){
            type= 'success';
        }else if(type == 1){
            type= 'warning';
        }else{
            type= 'success';
        }
        This.$message({
            message: message,
            type: type
        });

        }
    },
    created:function(){
        this.initData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
