<template>
  <div class="Index">
    <el-container>
        <el-header>
            <el-row :gutter="0">
                <el-col :span="8" style="height:1px;"><div class="grid-content bg-purple"> </div></el-col>
                <el-col :span="6" style="height:1px;"><div class="grid-content bg-purple"> </div></el-col>
                <el-col :span="6" style="height:1px;"><div class="grid-content bg-purple"><span @click="loginOut()">注销</span> </div></el-col>
                <el-col :span="4" style="text-align:left;">
                    <div class="grid-content bg-purple">
                        <span style="font-size:30px;" class="el-icon-user-solid"></span>
                    </div>
                </el-col>
            </el-row>
            
        </el-header>
        <el-container>
            <el-aside width="200px;">
            
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>商品分类管理</template>
                        <el-menu-item-group>
                          <el-menu-item index="1-1" @click.native="menuChange('SortSelect')">查询修改分类</el-menu-item>
                          <el-menu-item index="1-1" @click.native="menuChange('SortAdd')">添加分类</el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>商品信息管理</template>
                        <el-menu-item-group>
                          <template slot="title">商品信息查询</template>
                          <el-menu-item index="2-1">选项1</el-menu-item>
                          <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>

                        <el-menu-item-group title="分组2">
                          <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>

                        <!-- <el-submenu index="2-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                        <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            
            </el-aside>
            <el-main style="min-height:800px">
              <div :is="currentView"></div>
            </el-main>
        </el-container>
    </el-container>
    
  </div>
</template>

<script>
import SortAdd from '@/components/SortAdd'
import SortSelect from '@/components/SortSelect'
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'Index',
  components:{
    SortAdd,
    HelloWorld,
    SortSelect
  },
  data () {
    return {
      currentView: HelloWorld
    }
  },
  methods: {
    loginOut:function(){
      this.$router.push('/');
      window.localStorage.clear();
    },
    menuChange:function(menu){
      this.currentView = menu
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
