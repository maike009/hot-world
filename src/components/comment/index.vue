<template>
  <div class="comment-list">
    <div>全部评论</div><br>
    <div>
      <div class="comment-item" v-for="comment in comments" :key="comment.commentId">
        <div class="user-info" @click="goToUserDetail(comment)">
          <img :src="comment.avatar" alt="头像" />
          <span class="username">{{ comment.nickname }}</span>
        </div>
        <div class="comment-content">
          {{ comment.contentText }}
        </div>
        <div class="comment-actions">
          <span class="time">{{ comment.commentTime }}</span>
          <span class="reply" @click="replyFn(comment)">回复</span>
        </div>
        <div class="reply-list" v-if="comment.kidsCom.length > 0">
          <div class="reply-item" v-for="reply in comment.kidsCom" :key="reply.commentId">
            <div class="user-info">
              <img :src="reply.avatar" alt="头像" @click="goToUserDetail(reply)"/>
              <span class="username">{{ reply.nickname }}</span>
              <span class="reply-to" v-if="reply.parentCommentId === comment.commentId">回复 {{ comment.nickname }}</span>
              <span class="reply-to" v-if="reply.parentCommentId !== comment.commentId">
                回复 {{ comment.kidsCom.find(item => item.commentId === reply.parentCommentId).nickname }}
              </span>

            </div>
            <div class="comment-content">
              {{ reply.contentText }}
            </div>
            <div class="comment-actions">
              <span class="time">{{ reply.commentTime }}</span>
              <span class="reply" @click="replyFn(reply)">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="replyPopupVisible" position="bottom">
      <div class="replyInput">
        <van-field v-model="replyContent" :label="replyLabel" placeholder="请输入回复内容" type="textarea" rows="1" autosize
        @confirm="onReplyConfirm"></van-field>
      <van-button style="width: 20%;" type="primary" @click="onReplyConfirm">发送</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { sendReply, getComment } from '@/api/comment'
import { getInfo } from '@/utils/storage'
export default {
  name: 'commentCom',
  props: {
    commentsF: Array
  },
  data () {
    return {
      comments: [],
      replyPopupVisible: false,
      replyContent: '', // 回复内容
      replyLabel: '',
      comObj: null // 当前回复的对象
    }
  },
  watch: {
    commentsF: {
      handler (newVal, oldVal) {
        console.log(newVal)
        this.comments = newVal
      },
      immediate: true
    }
  },
  methods: {
    // 去用户详情页
    goToUserDetail (comment) {
      if (JSON.parse(getInfo()).cuserId === comment.cuserId) {
        this.$router.push('/layout/user')
        return
      }
      this.$router.push({
        path: '/userDetail',
        query: {
          userId: comment.cuserId
        }
      })
    },
    replyFn (comment) {
      this.$nextTick(() => {
        this.replyLabel = '回复'
        this.replyLabel = this.replyLabel + comment.nickname
        this.replyPopupVisible = true
      })
      this.comObj = comment
      console.log(this.comObj)
      // TODO: 实现回复功能
    },
    async getCommentFn () {
      const res = await getComment(this.$route.query.pid)
      this.comments = res.data.data
    },
    async onReplyConfirm () {
      // 处理回复逻辑
      console.log(this.replyContent)
      const comment = {
        postId: this.comObj.postId,
        topId: this.comObj.topId === 0 ? this.comObj.commentId : this.comObj.topId,
        parentCommentId: this.comObj.commentId,
        contentText: this.replyContent
      }
      const res = await sendReply(comment)
      console.log(res)
      if (res.data.code === 1) {
        this.$toast.success(res.data.data)
      } else {
        this.$toast.fail(res.data.msg)
      }
      // 发送完毕后清空回复内容并关闭回复框
      this.getCommentFn()
      // 这里可以处理回复逻辑，例如发送回复内容
      console.log(this.replyContent)
      // 发送完毕后清空回复内容并关闭回复框
      this.replyContent = ''
      this.replyPopupVisible = false
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.commentsF)
      this.comments = this.commentsF
    })
  }
}
</script>

<style scoped lang="less">
// 回复框
.replyInput {
  display: flex;
}
.comment-list {
  padding: 10px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.comment-content {
  margin-top: 10px;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #999;
}

.reply-list {
  padding-left: 20px;
  margin-top: 10px;
}

.reply-item {
  border-bottom: 1px dashed #eee;
  padding: 10px;
}

.reply-to {
  color: #999;
  margin-left: 10px;
}
</style>
