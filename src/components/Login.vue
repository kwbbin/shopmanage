<template>
  <div class="login">
    <div class="content">
      <div class="content-position">
        <div>
          <span class="el-icon-user">  </span>
          <el-input style="width:200px;" v-model="username"  placeholder="请输入用户名" size="small" clearable> </el-input>
        </div>
        <div class="input-pass">
          <span class="el-icon-lock">  </span>
          <el-input size="small" v-model="password" style="width:200px;" placeholder="请输入密码"  show-password></el-input>
        </div>
        <div>
          <div class="button-position">
            <el-button size="small" type="primary" @click="submit()">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      msg: '',
      mydata: '',
      code: "",
      token: '',
      requestNum:0
    }
  },
  methods: {
    requestPost:function (str,obj,successfun,failfun){
      this.$axios({
              url:str,
              method:'post',
              data:obj
          })
          .then(res=>{
              this.mydata = res.data.data;
              this.msg = res.data.message;
              this.code = res.data.code;
              if(successfun!=null)
              successfun(res);
          })
          .catch(Error=>{
               if(failfun!=null)
                failfun(res);
          })
    },
    submit:function(){
      var This = this;
      var oldToken = this.token;
      var jsons={loginName:this.username,password:this.password}
            // this.alertMessage(this,0,"登录成功qq222");
      this.requestPost('/manage/login',jsons,function(res){
          if(res.data.code == 1){
            This.alertMessage(This,1,This.msg);
          }
          if(res.data.token != null && res.data.code ==0){
            This.token = res.data.token;
            window.localStorage.setItem("token",This.token);
            This.alertMessage(This,0,"登录成功，正在跳转登录界面，请稍等");
            setTimeout(function(){
              This.$router.push('/Index');
            },2000);

          }
      },function(){
        alert("登录失败");
      });
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
  watch: {
    msg: function (newVal, oldVal) {
      
    },
    requestNum: function(newVal, oldVal){
      
    }
  }
}



</script>

<style scoped>
  .content{
    width:500px;
    height:300px;
    position: relative;
    margin:0 auto;
    top:100px;
    background: #eee;
    border-radius: 10px;
    opacity: 0.8;
  }

  .content-position{
    position: relative;
    top: 100px;
    width:225px;
    margin: 0 auto;
  }

  .input-pass{
    margin-top: 10px;
  }

  .button-position{
    margin-top: 10px;
    text-align: center;
  }
</style>