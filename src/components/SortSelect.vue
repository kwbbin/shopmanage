<template>
  <div class="SortSelect">
    
    <el-table
        :data="sortAll"
        height="650"
        border
        style="width: 100%">
        <el-table-column
        prop="oneId"
        label="一级分类ID"
        width="180">
        </el-table-column>
        <el-table-column
        prop="sortOne"
        label="一级分类名称"
        width="180">
          <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.sortOne }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        prop="twoId"
        label="二级分类ID">
        </el-table-column>
        <el-table-column
        prop="sortTwo"
        label="二级分类名称">
          <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.sortTwo }}</el-tag><span v-if="scope.row.hotNum==1" style="font-size:10px;display:inline-block;position:relative;top:-8px;left:10px;color:red;">热门</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updateSort(scope.row)" >编辑</el-button>
                <el-button v-if="scope.row.hotNum==0"
                size="mini"
                @click="setSortHotNum(scope.row.twoId,scope.row)" >设为热门分类</el-button>
                <el-button v-if="scope.row.hotNum==1"
                size="mini"
                @click="setSortHotNum(scope.row.twoId,scope.row)" >取消热门分类</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div style="width:200px;heiht:100px;">
    <el-dialog
      title="修改分类名称"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form ref="form"  label-width="100px">
        <el-form-item label="一级分类：">
          <el-input v-model="updateOneName"></el-input><el-tag type="info">一级分类ID：{{updateOneId}}</el-tag>
        </el-form-item>
        <el-form-item  label="二级分类：">
          <el-input v-model="updateTwoName" ></el-input><el-tag type="info">二级分类ID：{{updateTwoId}}</el-tag>
        </el-form-item>
        {{updateOneName}}
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit();">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sortAdd',
  data () {
    return {
      username: '',
      password: '',
      msg: '',
      mydata: '',
      updateOneName:'',
      updateTwoName:'',
      updateOneId:'',
      updateTwoId:'',
      code: "",
      token: '',
      sortAll:[],
      nowRow:Object,
      dialogVisible: false
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
              this.mydata = res.data.data;
              this.msg = res.data.message;
              this.code = res.data.code;
              if(res.data.token != null){
                  this.token = res.data.token;
              }
              if(successfun!=null)
              successfun(res);
          })
          .catch(Error=>{
              console.log(Error)
              if(failfun!=null)
                failfun(res);
          })
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

    },
    updateSort:function(row){
      this.dialogVisible = true;
      this.updateOneName = row.sortOne;
      this.updateOneId = row.oneId;
      this.updateTwoName = row.sortTwo;
      this.updateTwoId = row.twoId;
      this.nowRow = row;
      
    },
    setSortHotNum:function(twoId,row){
      var This = this;
        var json={twoId:twoId};
        this.requestPost("/manage/hotSort",json,function(){
          if(row.hotNum==1){
            row.hotNum=0;
          }else if(row.hotNum ==0){
            row.hotNum=1;
          }
          This.alertMessage(This,This.code,This.msg);
        },null);
    }
    ,
    updateSubmit:function(){
        var This = this;
        var json={sortOne:this.updateOneName,oneId:this.updateOneId,sortTwo:this.updateTwoName,twoId:this.updateTwoId};
        this.requestPost("/manage/updateSort",json,function(){
          This.alertMessage(This,This.code,This.msg);
        },null);
        this.nowRow.sortOne = this.updateOneName;
        this.nowRow.oneId = this.updateOneId;
        this.nowRow.sortTwo = this.updateTwoName;
        this.nowRow.twoId = this.updateTwoId;
        This.dialogVisible = false;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    initData:function(){
        var This = this;
        var array = [];
        this.requestPost("/manage/Category","",function(res){
            for(var i in res.data.data){
                array.push(res.data.data[i]);
            }
            This.sortAll=array;
        },null);
    }

    },
  watch: {

  },
  created:function(){
    this.initData();
  }
}



</script>

<style>
</style>