<template>
  <div>
<!--二级路由出口：二级路由组件展示的地方-->
    <router-view/>
    <div id="tarbar-bottom">
      <van-tabbar active-color="#ee0a24" inactive-color="#000" route fixed>
      <van-tabbar-item to="/layout/home" icon = "home-o" size="50">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/category" icon="gem-o">热点</van-tabbar-item>
      <van-tabbar-item to="/layout/search" icon="search">发现</van-tabbar-item>
      <van-tabbar-item to="/layout/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item to="/layout/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutView',
  data () {
    return {
      TarStyle: 'TarStyle'
    }
  }
}
</script>

<style lang="less" scoped>

.van-tabbar-item {
  font-size: 18px;
  text-align: center;
}

</style>
