<template>
  <div class="Index">
    <el-container>
        <el-header>
            <el-row :gutter="0">
                <el-col :span="8" style="height:1px;"><div class="grid-content bg-purple"> </div></el-col>
                <el-col :span="6" style="height:1px;"><div class="grid-content bg-purple"> </div></el-col>
                <el-col :span="6" style="height:1px;line-height:50px;"><div class="grid-content bg-purple"><span @click="loginOut()">注销</span> </div></el-col>
                <el-col :span="4" style="text-align:left;">
                    <div class="grid-content bg-purple">
                        <span style="font-size:30px;line-height:50px;" class="el-icon-user-solid"></span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px;">
            
                <el-menu :default-openeds="['1']" style="text-align:left;">
                    <el-submenu index="1"  style="width:200px;">
                        <template slot="title"><i class="el-icon-message"></i>商品分类管理</template>
                        <el-menu-item-group style="text-align:left;">
                          <el-menu-item index="1-1" @click.native="menuChange('SortSelect')">查询修改分类</el-menu-item>
                          <el-menu-item index="1-1" @click.native="menuChange('SortAdd')">添加分类</el-menu-item>
                          <el-menu-item index="1-1" @click.native="menuChange('HotViewHome')">展示的分类管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>商品信息管理</template>
                        <el-menu-item-group>
                          <!-- <template slot="title">商品信息查询</template> -->
                          <el-menu-item index="2-1" @click.native="menuChange('GoodAdd')">商品添加</el-menu-item>
                          <el-menu-item index="2-2">商品分配</el-menu-item>
                          <el-menu-item index="2-3">商品修改</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                   
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>发布通知  </template>
                        <el-menu-item-group>
                        <el-menu-item index="5-1" @click.native="menuChange('NoticeAdd')">发布通知</el-menu-item>
                        <el-menu-item index="5-2" @click.native="menuChange('NoticeSelect')">查看所有通知</el-menu-item>
                        </el-menu-item-group>
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
import GoodAdd from '@/components/GoodAdd'
import NoticeAdd from '@/components/NoticeAdd'
import NoticeSelect from '@/components/NoticeSelect'
import HotViewHome from '@/components/HotViewHome'
export default {
  name: 'Index',
  components:{
    SortAdd,
    HelloWorld,
    SortSelect,
    GoodAdd,
    NoticeAdd,
    NoticeSelect,
    HotViewHome
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
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
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
