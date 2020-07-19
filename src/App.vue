<template>
  <div id="app">
    <Current_selection style="height: 90%"></Current_selection>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Current_selection from "./components/Current_selection";


export default {
  name: 'App',
  components: {
    Current_selection
  },
}
</script>

<style type="text/css">
  #app {
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    background-color: #fafaec;
    height: 100%;
    overflow: auto;
}
  #main{
    float: left;
    width: 82%;
    height: 90%;
  }
</style>
