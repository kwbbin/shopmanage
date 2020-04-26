<template>
  <div class="hello">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="通知标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="通知内容">
            <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>

    </el-form>
    <div>
        
    <el-button type="primary" @click="onSubmit()">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticeAdd',
  data () {
    return {
      msg: '',
      mydata:'',
      token:'',
      code:'',
      form:{
          title:'',
          content:''
      }
    }
  },
  methods:{
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
    onSubmit:function(){
        var This = this;
        var json = {title: this.form.title,noticeContent: this.form.content}
        this.requestPost("/saveNotice",json,function(){
            console.log(This.mydata);
            This.alertMessage(This,0,"添加成功")
        });
    }
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
