<template>
  <div class="SortAdd">
    <h3>添加分类</h3>
    <el-form label-width="100px">
        <div style="width:400px;margin:0 auto;">
            <el-form-item label="一级分类名称">
                <el-input v-model="sortOne" ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称">
                <el-input v-model="sortTwo"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitSortAdd(2)">提交</el-button>
        </div>
        <el-divider></el-divider>
        <h3>添加二级分类</h3>
        <div style="width:400px;margin:0 auto;">
            <el-form-item label="一级分类名称">
                <el-select v-model="oneId" placeholder="请选择">
                    <el-option
                    v-for="item in sortOnes"
                    :key="item.goodsSortOneId"
                    :label="item.sortName"
                    :value="item.goodsSortOneId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类名称">
              <el-input v-model="sortTwo" ></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitSortAdd(1)">提交</el-button>
        </div>
    </el-form>
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
      sortOnes:'',
      selectedSortOne:'',
      oneId:'',
      twoId:'',
      sortOne:'',
      sortTwo:'',
      code: "",
      token: ''
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
                failfun();
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
    submitSortAdd:function(type){
      var This = this;
      if(type == 1){
        //只添加二级
        var jsons={type:'1',oneId: This.oneId,sortTwo: This.sortTwo}
        this.requestPost('/manage/sortAdd',jsons,function(res){
          if(res.data.code == 0)
            This.alertMessage(This,0,"添加成功");
          else{
              This.alertMessage(This,1,"添加失败");
              console.log("添加失败:msg="+This.msg)
            }
        },null);

      }else if(type==2){
        //添加一级和二级
          var jsons={type:'2',sortOne: This.sortOne,sortTwo: This.sortTwo}
          this.requestPost('/manage/sortAdd',jsons,function(res){
            if(res.data.code == 0)
              This.alertMessage(This,0,"添加成功");
            else{
              This.alertMessage(This,1,"添加失败");
              console.log("添加失败:msg="+This.msg)
            }
            
          },null);
      }else{
        console.error("添加失败")
      }

      
  },
  initData:function(){
        var This = this;
        this.requestPost("/manage/sortOneAll","",function(){
            This.sortOnes =This.mydata;
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

<style scoped>

</style>