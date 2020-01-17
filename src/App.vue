<template>
  <div id="app">
    <!-- <Index /> -->
    <!-- <router-link to="/">登录</router-link> 
    <router-link to="/helloWorld">helloworld</router-link>     -->
    <!-- <router-link to="/index">主页</router-link> -->
  
    <!-- <Login />           -->
    <router-view/>  
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
