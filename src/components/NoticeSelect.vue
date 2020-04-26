<template>
  <div class="hello">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="noticeContent"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :formatter="formatRole">

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="danger"
            @click="handleEdit(scope.$index, scope.row)">设为无效</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '查看通知',
      tableData:[]
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
    initData:function(){
      var This = this;
        this.requestPost("/getAllNitice",null,function(){
            This.tableData = This.mydata;
            for(var i=0;i<This.tableData.length;i++){
              This.tableData[i].createDate=This.getTime(This.tableData[i].createDate,"S");
            }
        });
    },
    formatRole: function(row, column) {
        if(row.state == '1')
          return "有效"
        else if(row.state == '0')
        return "无效";
    },
    getTime:function (data,type){
      var _data = data;
      //如果是13位正常，如果是10位则需要转化为毫秒
      if (String(data).length == 13) {
        _data = data
      } else {
        _data = data*1000
      }
      const time = new Date(_data);    
      const Y = time.getFullYear();
      const Mon = time.getMonth() + 1;
      const Day = time.getDate();
      const H = time.getHours();
      const Min = time.getMinutes();
      const S = time.getSeconds();
      //自定义选择想要返回的类型
      if(type=="Y"){
        return `${Y}-${Mon}-${Day}`
      }else if(type=="H"){
        return `${H}:${Min}:${S}`
      }else{
        return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
      }
    },
    handleEdit(index, row) {
       var This = this;
       row.state=0;
       var notice  = {noticeId:row.noticeId,state:0}
        this.requestPost("/setNoticeState",notice,function(){
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
