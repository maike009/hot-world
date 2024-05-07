<template>
  <div>
    <van-nav-bar
      :title="'发送好友请求'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-field label="请输入添加好友消息" v-model="sendContent" :placeholder="`你好，我是XXX`"/><br>
    <van-button style="width: 60%;margin-left: 20%;" plain type="primary" @click="sendAddFriendMsg">发送</van-button>
  </div>
</template>

<script>
import { getInfo } from '@/utils/storage'
export default {
  name: 'AddFriend',
  data () {
    return {
      sendContent: '',
      reqObj: {
        type: 'addFriend',
        senderId: '',
        toUserId: '',
        message: ''
      }
    }
  },
  created () {
    this.$store.dispatch('setWsAction', JSON.parse(getInfo()).cuserId)
    this.$store.state.ws.onopen = (e) => {
      console.log('sendAddFriend连接成功')
    }
    this.$store.state.ws.onmessage = (e) => {
      console.log('这是Friend接收服务端的消息-->', e.data)
      this.$notify({ type: 'primary', message: e.data })
    }
    this.$store.state.ws.onclose = (e) => {
      console.log('发送好友组件断开连接')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.ws.close()
    next()
  },

  methods: {
    sendAddFriendMsg () {
      if (this.sendContent.trim() === '') {
        return
      }
      this.reqObj.senderId = JSON.parse(getInfo()).cuserId
      this.reqObj.toUserId = this.$route.query.userId
      this.reqObj.message = this.sendContent
      this.$store.state.ws.send(JSON.stringify(this.reqObj))
      this.sendContent = ''
      console.log('发送添加好友的信息')
      this.$router.push('/layout/message')
    }
  }
}
</script>

<style>

</style>
