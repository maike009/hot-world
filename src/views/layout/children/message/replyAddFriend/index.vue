<template>
  <div>
    <van-nav-bar
      :title="'是否同意添加好友'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="container">
        <div>来自：{{ userInfo.userInfo.nickname }}的请求</div>
        <div>请求内容：{{ userInfo.reqInfo.sendMsg }}</div>
        <div v-if="userInfo.reqInfo.status !== 2">
            <van-button class="agreeBtn" plain type="primary" round @click="agree">同意</van-button>
        <van-button class="delBtn" plain type="danger" round>拒绝</van-button>
        </div>
        <div class="agreeBtn" style="color: green;" v-else>已同意</div>
    </div>

  </div>
</template>

<script>
import { getReqById, addFriend } from '@/api/friend'
export default {
  name: 'replyAddFriend',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getMyReqFn()
    console.log(this.$route.query.reqId)
  },
  methods: {
    async getMyReqFn () {
      const res = await getReqById(this.$route.query.reqId)
      this.userInfo = res.data.data
      console.log(res.data.data)
    },
    async agree () {
      const res = await addFriend({ friendId: this.userInfo.reqInfo.sendUserId })
      if (res.data.code === 1) {
        this.$toast.success('添加成功')
        setTimeout(() => {
          this.$router.push('/layout/message')
        }, 1000)
      } else {
        this.$toast.fail(res.data.msg)
      }
      console.log(res.data)
    }
  }
}
</script>

<style scoped>
.container {
    border: 1px solid #71c4f0;
    padding: 8px;
    margin: 5px;
}
.agreeBtn {
    margin-top: 5%;
    margin-left: 3%;
}
.delBtn {
    margin-top: 5%;
    margin-left: 53%;
}
</style>
