<template>
  <div class="layout">
<!--二级路由出口：二级路由组件展示的地方-->
      <keep-alive :include="['HomeView']">
        <router-view/>
      </keep-alive>
      <div id="tarbar-bottom">
        <van-tabbar active-color="#ee0a24" inactive-color="#000" route fixed>
          <van-tabbar-item to="/layout/home" icon = "home-o" size="50">首页</van-tabbar-item>
          <van-tabbar-item to="/layout/search" icon="search">发现</van-tabbar-item>
          <van-tabbar-item to="/layout/message" icon="chat-o">消息</van-tabbar-item>
          <van-tabbar-item to="/layout/user" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
      </div>
  </div>
</template>

<script>
import { getInfo } from '@/utils/storage'
import { Notify } from 'vant'
export default {
  name: 'LayoutView',
  data () {
    return {
      TarStyle: 'TarStyle'
    }
  },
  created () {
    this.$store.dispatch('setWsAction', JSON.parse(getInfo()).cuserId)
    this.$store.state.ws.onopen = (e) => {
      console.log('layout连接---》')
      console.log(e.data)
      const reqObj = {
        type: 'queryReq',
        senderId: '',
        toUserId: '',
        message: '获取好友请求'
      }
      this.$store.state.ws.send(JSON.stringify(reqObj))
    }
    this.$store.state.ws.onmessage = (e) => {
      console.log('layout收到的数据', e.data)
      const msgObj = JSON.parse(e.data)
      if (msgObj.type === 'addFriend') {
        Notify({ type: 'primary', message: `添加好友消息：${msgObj.message}` })
      }
      if (msgObj.type === 'queryReq') {
        const msg = JSON.parse(msgObj.message)
        msg.forEach(item => {
          if (item.status === 0) {
            Notify({ type: 'primary', message: `添加好友信息: ${item.sendMsg}` })
          }
        })
      }
    }
    this.$store.state.ws.onclose = (e) => {
      console.log('layout断开连接')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.ws.close()
    next()
  }
}
</script>

<style lang="less" scoped>

.van-tabbar-item {
  font-size: 18px;
  text-align: center;
}

</style>
