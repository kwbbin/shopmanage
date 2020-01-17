exports.install = function (Vue, options) {
    Vue.prototype.myMessage = function (msg,type){//全局函数1
        this.$message({
            message: msg,
            type: type
          });
    };
     Vue.prototype.text2 = function (){//全局函数2
     alert('执行成功2');
     };
 };