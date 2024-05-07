<template>
  <div class="warpper">
    <div class="header">
      <ul class="header-ul">
        <li>
          <img src="https://img2.imgtp.com/2024/03/07/SLDRMYAO.png" />
        </li>
        <li>
          <h3 class="user-name">{{friend.nickname}}</h3>
        </li>
        <li>
          <img src="https://img2.imgtp.com/2024/03/07/OKUmliEU.png" />
        </li>
      </ul>
    </div>

    <div class="chat-warrper">
      <div class="user-send-content" v-for="item,index in userChatList" :key="index">
        <div :class="[(item.Uid === myUid) ? 'right-user' : 'left-user']">
          <div class="user-send-content">

            <div class="user-avatar">
              <img :src="item.Uid === myUid ? user.avatar:friend.avatar" class="avatar" />
            </div>
            <div class="ContentBox">
              <span class="send-time">{{item.sendTime}}</span>
            <div class="user-content" :style="{'margin-top': (item.type === 1 ? '60px' : '0px')}">
                <div class="user-content-style" v-if="item.type === 0">
                  {{ item.content }}
                </div>
                <img class="user-send-img" :src="item.content" v-if="item.type === 1" />
            </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="send-chat addHeightMove" :style="{'height': needContHeight + 'px'}">
      <ul>
        <li>
          <img src="https://img2.imgtp.com/2024/03/07/DnQfcDll.png" />
        </li>
        <li><textarea autoHeight="true" v-model="sendContent" placeholder="发个消息聊聊呗~" maxlength="50"
                      class="chat-mb-sty"></textarea>
          <img src="https://img2.imgtp.com/2024/03/07/12EM5JOg.png" class="emjo" ref="chatmb" />
        </li>
        <li><button class="sendChat" :class="isChangSendStatus ? 'sendChatStyl' : '' "
                    @click="sendMsg">发送</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/utils/storage'
import { getUserInfoById, getUserInfo } from '@/api/user'
import msg from '@/utils/msg'
export default {
  name: 'chatView',
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

li{
  list-style: none;
}

textarea{
  border:none;
  outline: none;
  resize: none;
  background:none;
}
.warpper {
  width: 100%;
  background-color: #f1f1f0;
}

.addHeightMove {
  transition: .3s;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  background-color: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

.header-ul {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.header-ul li {
  margin-top: 15px;
}

.header-ul li .user-name {
  position: absolute;
  left: 20%;
  color: #999999;
  font-weight: 400;
}

.header-ul li img {
  width: 30px;
  height: 30px;
}

.user-send-img {
  width: 100px;
}
.send-time {
  position: absolute;
  z-index: 9999;
  left: 35%;
  width: 100%;
  height: 40px;
  margin-bottom: 50px;
  font-size: 14px;
  color: #999999;
}

.left-user {
  width: 100%;
  transform: translateY(45px);
  height: auto;
}

.left-user .user-send-content {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.left-user .user-avatar {
  width: 50px;
  height: 50px;
}

.left-user .user-avatar .avatar {
  width: 100%;
  height: 100%;
  border-radius: 50px;
}

.left-user .user-content {

    width: fit-content;
    position: relative;
    padding: 10px;
    left: 5%;
    background-color: #ffffff;
    border-radius: 35px 15px 15px 35px;
    box-shadow: 0px 7px 9px -1px rgba(0, 255, 255, 0.2);
}

.chat-warrper {

  width: 90%;
  height: 100vh;
  margin: 50px auto;

}

.right-user .user-send-content {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin: 60px 0 0 45%;
}

.right-user .user-avatar {
  width: 50px;
  height: 50px;
}

.right-user .user-avatar .avatar {
  position: relative;
  left: -2px;
  width: 100%;
  height: 100%;
  border-radius: 50px;
}

.right-user .user-content {
  position: relative;
  padding: 10px;
  left: -5%;
  align-items: center;
  background-color: #deffff;
  border-radius: 15px 35px 35px 15px;
  color: #04bff4;
  box-shadow: 0px 7px 9px -1px rgba(0, 255, 255, 0.2);
}

.send-chat {
  position: fixed;
  bottom: 0%;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

.send-chat ul {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.send-chat ul li {
  margin-top: 15px;
}

.send-chat ul li .user-name {
  position: absolute;
  left: 20%;
  color: #999999;
  font-weight: 400;
}

.send-chat ul li .emjo {
  position: relative;
  top: 5%;
  left: 120px;
}

.send-chat ul li .chat-mb-sty {
  position: absolute;
  width: 200px;
  background-color: #f1f1f0;
  border-radius: 15px;
  padding: 8px;
  top: 20%;
  font-size: 18px;
  left: 20%;
}

.send-chat ul li .sendChat {
  position: relative;
  left: 20%;
  width: 60px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  border-radius: 15px;
  text-align: center;
  color: #999999;
  background-color: #f1f1f0;
  border: none;
}

.send-chat ul li .sendChatStyl {
  color: #ffffff;
  background-color: #04bff4;
}

.send-chat ul li img {
  width: 30px;
  height: 30px;
}

</style>
