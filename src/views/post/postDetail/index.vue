<template>
  <div>
    <van-nav-bar title="帖子正文" left-text="返回" right-text="..." left-arrow z-index="88" @click-left="onClickLeft"
      @click-right="onClickRight" />
    <div class="post">
      <div class="post-box">
        <!-- 头部区域 -->
        <div class="user-header">

          <div class="user-info">
            <div class="userInfo" @click="goToUserDetail">
              <img
                :src="post.avatar || 'https://img0.baidu.com/it/u=879861520,723007625&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
                alt="profile" class="profile-picture">
              <div class="userInfoText">
                <div><span class="username">{{ post.nickname }}</span></div>
                <div><span class="bio">{{ post.createTime }}</span></div>
              </div>
            </div>
            <div class="userPicText">
              <div class="userCont">{{ post.contentText }}</div>
              <div v-if="post.contentImage" class="content-img">
                <div class="item-img" v-for="(img, index) in post.contentImage.split(',')" :key="index">
                  <van-image width="6rem" height="5rem" fit="cover" :src="img" @click="showImgFn(img,index)" />
                  <!-- <van-overlay :show="showImg" @click=" showImg = false">
                    <div class="wrapper">
                      <van-image :src="bigImg"></van-image>
                    </div>
                  </van-overlay> -->
                  <van-image-preview :images="post.contentImage.split(',')" v-model="showImg" :start-position="imgIndex">
                  </van-image-preview>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="status-box">
          <span @click="likeFn(post.postId)">
            <van-icon name="like" v-if="post.likeStatus" size="20" /><van-icon v-else size="20" name="like-o" />
            <span class="Number-status">{{ post.likesCount }}</span>
          </span>
          <span @click="collectionFn(post.postId)">
            <van-icon name="star" v-if="post.collectionStatus" size="20" /><van-icon size="20" v-else name="star-o" />
            <span>{{ post.favoriteCount }}</span>
          </span>
          <span @click="commentFn(post.postId)">
            <van-icon name="comment-o" size="20" />
            <span>{{ post.commentsCount }}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 评论 -->

    <van-popup v-model="replyPopupVisibleF" position="bottom">
      <div class="replyInput">
        <van-field v-model="replyContent" :label="replyLabel" placeholder="请输入回复内容" type="textarea" rows="1" autosize
          @confirm="commentConfirm"></van-field>
        <van-button style="width: 20%;" type="primary" @click="commentConfirm(post.postId)">发送</van-button>
      </div>
    </van-popup>

    <commentCom v-if="comments.length > 0" :commentsF="comments"></commentCom>
    <h3 v-else>此作品还没有评论，快来评论吧~</h3>
  </div>
</template>

<script>
import { getPostById, like, collection, addHistory } from '@/api/post'
import { getComment, sendTopCom } from '@/api/comment'
import { getInfo } from '@/utils/storage'
import commentCom from '@/components/comment'

export default {
  name: 'postDetail',
  components: {
    commentCom
  },
  data () {
    return {
      post: {},
      showImg: false,
      imgIndex: 0, // 图片起始索引
      comments: [],
      replyPopupVisibleF: false, // 显示回复框
      replyContent: '', // 回复内容
      replyLabel: '评论'
    }
  },
  created () {
    console.log('根据帖子获取id', this.$route.query.pid)
    this.getPostByIdFn()
  },
  mounted () {
    this.addHistoryFn()
    this.getCommentFn()
  },
  methods: {
    // 去用户详情页
    goToUserDetail () {
      if (JSON.parse(getInfo()).cuserId === this.post.cuserId) {
        this.$router.push('/layout/user')
        return
      }
      this.$router.push({
        path: '/userDetail',
        query: {
          userId: this.post.cuserId
        }
      })
    },
    // 发布顶级评论
    commentFn (postId) {
      this.replyPopupVisibleF = true
    },
    async commentConfirm (postId) {
      // 处理回复逻辑
      console.log(this.replyContent)
      const comment = {
        postId,
        contentText: this.replyContent
      }
      const res = await sendTopCom(comment)
      console.log(res)
      if (res.data.code === 1) {
        this.$toast.success(res.data.data)
      } else {
        this.$toast.fail(res.data.msg)
      }
      // 发送完毕后清空回复内容并关闭回复框
      this.getCommentFn()
      this.replyContent = ''
      this.replyPopupVisibleF = false
    },
    // 查看大图
    showImgFn (img, index) {
      console.log(img, index)
      this.imgIndex = index
      this.showImg = true
    },
    // 新增浏览记录
    async addHistoryFn () {
      const res = await addHistory(this.$route.query.pid)
      console.log(res)
    },
    // 获取评论数据
    async getCommentFn () {
      const res = await getComment(this.$route.query.pid)
      this.comments = res.data.data
    },
    async getPostByIdFn () {
      const res = await getPostById(this.$route.query.pid)
      this.post = res.data.data
      this.post.newLikeCount = this.post.likesCount
      this.post.newFavoriteCount = this.post.favoriteCount
      if (this.post.postId === this.post.likePostId) {
        this.post.likeStatus = true
      } else {
        this.post.likeStatus = false
      }
      if (this.post.postId === this.post.collectionPostId) {
        this.post.collectionStatus = true
      } else {
        this.post.collectionStatus = false
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$toast('按钮')
    },
    // 点赞方法
    async likeFn (postId) {
      await like(postId)
      console.log(this.post)
      // 判断是否已经点赞
      if (this.post.likeStatus) {
        this.post.likesCount -= 1
        this.post.likeStatus = false
      } else {
        this.post.likesCount += 1
        this.post.likeStatus = true
      }
    },
    // 收藏方法
    async collectionFn (postId) {
      await collection(postId)
      if (this.post.collectionStatus) {
        this.post.favoriteCount -= 1
        this.post.collectionStatus = false
      } else {
        this.post.favoriteCount += 1
        this.post.collectionStatus = true
      }
    }
  }
}
</script>

<style scoped lang="less">
// 评论
.replyInput {
  display: flex;
}

// 大图
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* post */
.userPicText {
  margin: 3% 0 0 -17%;

  .userCont {
    margin-left: 11%;
  }
}

.userInfo {
  display: flex;

}

.userInfoText {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.post-box {
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #7c7b7b;
  border-radius: 15px;
}

.user-header {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  .profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    order: -1;
    transform: translateX(-10px);
  }

  .user-info {
    flex: 1;
    margin-left: 10px;

    .username {
      font-size: 18px;
      font-weight: bold;
      color: #41b3eb;
    }

    .bio {
      font-size: 12px;
      color: #666;
    }
  }
}

.status-box {
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  padding-bottom: 10px;
}

.content-img {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10%;

  .item-img {
    flex: 0 0 auto;
    margin: .3rem 0 0 .3rem;
    height: 5rem;
  }
}
</style>
