<template>
  <div class="chat-container">
    <div class="chat-header">
      <!-- 头部内容省略 -->
      <van-nav-bar
          :title="friend.nickname"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
/>
    </div>

    <div class="chat-messages">
      <div class="message" v-for="item, index in userChatList" :key="index">
        <div class="message-time">{{ item.sendTime }}</div>
        <div class="message-content" :class="{ 'sent': item.Uid === myUid, 'received': item.Uid !== myUid }">
          <img :src="item.Uid === myUid ? user.avatar : friend.avatar" class="avatar" :alt="item.Uid">
          <div class="bubble">{{ item.content }}</div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <textarea v-model="sendContent" placeholder="发个消息聊聊呗~"></textarea>
      <button @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/utils/storage'
import { getUserInfoById, getUserInfo } from '@/api/user'
import msg from '@/utils/msg'
export default {
  name: 'chatView2',
  data () {
    return {
      ws: null,
      friend: {},
      user: {},
      sendContent: '',
      needContHeight: 60,
      isChangSendStatus: false,
      myUid: '',
      uid: '',
      userChatList: []
    }
  },
  async created () {
    this.linkWs()
    console.log(this.$ws)
    // 获取好友信息
    const res = await getUserInfoById(this.$route.params.friendId)
    // 获取当前用户的信息
    const my = await getUserInfo()
    this.friend = res.data.data
    this.user = my.data.data
    this.myUid = my.data.data.cuserId
    this.uid = res.data.data.cuserId

    this.userChatList = [
      {
        Uid: this.uid,
        content: '我叫李凡',
        type: 0,
        sendTime: '2023-10-10 13:21'
      },
      {
        Uid: this.myUid,
        content: '你是你就是🥲',
        type: 0,
        sendTime: '2023-10-10 11:41'
      }
    ]

    console.log(res, my)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.ws.close()
    next()
  },
  methods: {
    messageClass (item) {
      return {
        'my-message': item.Uid === this.myUid,
        'friend-message': item.Uid !== this.myUid
      }
    },
    linkWs () {
      this.$store.dispatch('setWsAction', JSON.parse(getInfo()).cuserId)
      // this.$ws = new WebSocket('ws://localhost:10088/user/ws/' + JSON.parse(getInfo()).cuserId)
      this.$store.state.ws.onopen = (e) => {
        console.log('chat linked')
      }
      this.$store.state.ws.onmessage = (event) => {
        console.info('这是聊天页面接收到的', event.data)
        const msgObj = JSON.parse(event.data)
        if (msgObj.type !== 'chat') {
          return
        }
        this.userChatList.push({
          Uid: msgObj.senderId,
          content: msgObj.message,
          type: 0,
          sendTime: this.getCurrenTime() + ' ' + Date().split(' ')[4]
        })
        console.log(msgObj)
      }
      this.$store.state.ws.onclose = (e) => {
        console.log('chat断开连接')
      }
    },
    getCurrenTime () {
      const time = new Date()
      const y = time.getFullYear()
      const m = time.getMonth() + 1
      const d = time.getDay()
      return y.toString() + '-' + m.toString() + '-' + d.toString()
    },
    sendMsg () {
      if (this.sendContent) {
        const fid = this.$route.params.friendId
        msg.type = 'chat'
        msg.senderId = JSON.parse(getInfo()).cuserId
        msg.toUserId = fid
        msg.message = this.sendContent
        const obj = JSON.stringify(msg)
        console.log(obj)
        this.$store.state.ws.send(obj)
        this.sendContent = ''
      }
    }
  },
  watch: {
    sendContent (val, oldName) {
      const itemList = val.split('')
      if (itemList.length === 0) {
        this.isChangSendStatus = false
        this.needContHeight = 60
      } else {
        this.isChangSendStatus = true
      }

      if ([11, 20, 30].includes(itemList.length)) {
        this.needContHeight += 30
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f1f1f0;
}

.message {
  margin-bottom: 10px;
}

.message-time {
  text-align: center;
  color: #999999;
  margin-bottom: 5px;
}

.message-content {
  display: flex;
  align-items: flex-end;
}

.sent {
  flex-direction: row-reverse;
}

.received {
  justify-content: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.bubble {
  max-width: 60%;
  padding: 10px;
  border-radius: 18px;
  margin: 0 10px;
}

.sent .bubble {
  background-color: #dcf8c6;
  margin-right: 10px;
}

.received .bubble {
  background-color: #ffffff;
  margin-left: 10px;
}

.chat-input {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  display: flex;
  padding: 10px;
  background-color: #fff;
}

.chat-input textarea {
  flex-grow: 1;
  border: none;
  padding: 10px;
  border-radius: 18px;
  margin-right: 10px;
  resize: none;
  outline: none;
}

.chat-input button {
  padding: 10px 20px;
  border: none;
  border-radius: 18px;
  background-color: #576b95;
  color: white;
  cursor: pointer;
}

/* 附加的响应式设计代码 */
@media (max-width: 600px) {

  .bubble {
    margin: 0; /* 小屏幕上调整气泡边距 */
  }
}
</style>
