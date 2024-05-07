<!-- FriendList.vue -->
<template>
  <div>
    <div class="header">
      <van-nav-bar
        title="消息"
        :placeholder = "true"
        :fixed = "true"
        z-index="100"
      >
        <template #right>
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-button><van-icon name="add-o" size="25"/></van-button>
            </template>
          </van-popover>
        </template>
      </van-nav-bar>
    </div>
      <div>消息列表</div>
    <div class="msg-list" v-if="msgList.length > 0">
      <div class="friend-list" v-for="msgItem in msgList" :key="msgItem.reqInfo.id" @click="goToReplyAddFri(msgItem.reqInfo.id)">
        <img :src="msgItem.userInfo.avatar" round class="profile-picture">
        <span class="nickname">{{ msgItem.userInfo.nickname }}</span>
        <span style="width: 40%;">
          {{ msgItem.reqInfo.sendMsg.length <= 6 ? msgItem.reqInfo.sendMsg :  msgItem.reqInfo.sendMsg.slice(0, 8) + '......'}}
        </span>
      </div>
    </div>
    <div class="no-have" v-else>暂无消息</div>
    <div>好友列表</div>
    <div class="fri-list" v-if="friends.length > 0">
      <div class="friend-list" v-for="(friend) in friends" :key="friend.id" @click="goToChatPage(friend)">
        <img :src="friend.avatar" round class="profile-picture">
        <span class="nickname">{{ friend.nickname }}</span>
      </div>
    </div>
    <div class="no-have" v-else>暂无好友</div>
  </div>
</template>

<script>
import { getMyFriends } from '@/api/chat'
import { getMyReq } from '@/api/friend'
export default {
  name: 'MessageView',
  data () {
    return {
      friends: [],
      msgList: [],
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '添加好友' }]
    }
  },
  methods: {
    goToChatPage (friend) {
      // Navigate to chat page with friend ID
      this.$router.push({ name: 'Chat', params: { friendId: friend.friendId } })
    },
    onSelect (action) {
      this.$router.push('/searchFriend')
      console.log(action)
    },
    goToReplyAddFri (reqId) {
      this.$router.push({
        path: '/replyAddFriend',
        query: {
          reqId
        }
      })
    }
  },
  async created () {
    const res = await getMyFriends()
    const resReq = await getMyReq()
    console.log(res.data.data)
    console.log(resReq.data.data)
    this.friends = res.data.data
    this.msgList = resReq.data.data
    console.log(this.msgList)
    console.log('数组长度', this.msgList.length)
    console.log('数组长度', this.friends.length)
  }
}
</script>

<style scoped>
.no-have {
  color: #ffd253;
  font-size: 2rem;
  margin-top: 3%;
}
.header {
  border-bottom: 1px solid gray;
}
.friend-list {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;

}
.nickname {
  width: 80%;
}
.friend-list div {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 5%;
  }
</style>
