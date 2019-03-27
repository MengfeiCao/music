
<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    
    <Player></Player>
  </div>
</template>

<script></script>
<script>
// 引入组件： Test是自己起的名， from后是相对路径
import Header from "./components/common/header";
import Tab from "./components/common/tab/tab";
// 引入抛出的api接口
import ApiConfig from "@/common/api/apiconfig.js"
// 引入player组件
import Player from "./components/common/player/player";



// 抛出一个组件，组件本来还有一个el : "" ， 此处省略了，因为模板和它在同一个文件中，可以不用写
export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  },
  
  created() {
    // console.log(this.$store);
  },
}
</script>

<style lang="less" scoped>    //lang表示你采用哪种预处理语言    scoped是指给了一个作用域，仅对我这个组件有用
  @import "~common/style/index.less";
 
  #app{
    background: @bg-color;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }
</style>
