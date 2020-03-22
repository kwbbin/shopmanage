<template>
  <div class="SortAdd">
    <h3>添加商品</h3>
    <div>
        <el-form :rules="rule" :inline="true"  class="demo-form-inline">
            <el-form-item label="一级分类名称" >
                <el-select @change="getSortTwo()" v-model="oneId" placeholder="--请选择--" >
                    <el-option
                    v-for="item in sortAllOne"
                    :key="item.goodsSortOneId"
                    :label="item.sortName"
                    :value="item.goodsSortOneId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类名称">
                <el-select  v-model="twoId" placeholder="--请选择--" >
                    <el-option
                    v-for="item in sortAllTwo"
                    :key="item.goodsSortTwoId"
                    :label="item.sortName"
                    :value="item.goodsSortTwoId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="商品名称">
                    <el-input placeholder="商品名称" v-model="goodsName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="商品库存">
                    <el-input placeholder="商品库存" v-model="goodsStock"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="单位">
                    <el-input placeholder="单位" v-model="spec"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="18">
              <el-col :span="6">
                <template>
                  <el-radio v-model="isSale" label="1">上架</el-radio>
                  <el-radio v-model="isSale" label="2">不上架</el-radio>
                </template>
              </el-col>
              <el-col :span="6">
                <template>
                  <el-radio v-model="isHot" label="1">热销</el-radio>
                  <el-radio v-model="isHot" label="2">不热销</el-radio>
                </template>
              </el-col>
              <el-col :span="6">
                <template>
                  <el-radio v-model="isNew" label="1">新产品</el-radio>
                  <el-radio v-model="isNew" label="2">非新产品</el-radio>
                </template>
              </el-col>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="商品描述" >
                  <el-input type="textarea" v-model="goodsDesc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="销售总量">
                  <el-input placeholder="销售总量" v-model="saleTotal"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4">
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="upload-demo"
                  action="http://localhost:8081/manage/images/save"
                  :on-preview="handlePreview"
                  ref="imageLoad"
                  :on-remove="handleRemove"
                  :on-success="imageSuccess"
                  :file-list="fileList"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
            
            
            <el-button type="primary" @click="submitSortAdd()">提交</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sortAdd',
  data () {
    return {
      msg: '',
      mydata: '',
      code: "",
      token: '',
      goodId: '',
      imageId: '',
      sortAllOne:'',
      sortAllTwo:'',
      goodsName:'',
      oneId:'',
      twoId:'',
      goodsStock:0,
      isSale:0,
      isHot:0,
      isNew:0,
      spec:'',
      goodsDesc:'',
      price:'',
      saleTotal:0,
      fileList: [],
      rule: {
        username: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
                    required: true,
                    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                    message: '姓名不支持特殊字符',
                    trigger: 'blur'
          }
        ]
      },
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
      This.$refs.imageLoad.submit();
      var json = {"goodsSortId":This.twoId,"name":This.goodsName,
      "goodsStock":This.goodsStock,"isSale":This.isSale,"isHot":This.isHot,"isNew":This.isNew,
      "goodsDesc":This.goodsDesc,"price":This.price,"spec":This.spec,"saleTotal":This.saleTotal};
      This.requestPost("/manage/goods/add",json,function(){
      This.goodId =This.mydata;
        if(This.imageId!=null&&This.imageId!=''){
          var str={goodsId:This.goodId,imageId:This.imageId};
          This.requestPost("/manage/goodsImages/add",str,function(){
            
          },null);
        }

       if(This.code == 0)
      This.alertMessage(This,"success","提交成功");
    

     },null);
     
    setTimeout(function(){
      This.$refs.imageLoad.clearFiles();
      This.price = 0;
      This.goodsDesc='';
      This.goodsName='';
      This.spec='';
    },2000);

    },
    imageSuccess:function(response, file, fileList){
      var This = this;
      This.imageId = response;
      if(response ==null){
        This.imageId=null;
        This.alertMessage(This,'warning',"图片未保存");
      }
    },
    getSortTwo:function(){
      this.twoId="--请选择--"
      var This = this;
      var json = {goodsSortOneId:This.oneId}
      this.requestPost("/manage/sortTwoById",json,function(){
              This.sortAllTwo =This.mydata;
      },null);
    },
    initData:function(){
      var This = this;
      this.requestPost("/manage/sortOneAll","",function(){
              This.sortAllOne =This.mydata;
      },null);

    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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

  .el-col{
    padding:10px 0;
  }


</style>