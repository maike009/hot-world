<template>
  <div>
    <div class="user">
      <!-- 头部区域 -->
      <div class="user-header">
        <van-image fit="cover" round
          :src="UserDetail.avatar || 'https://img0.baidu.com/it/u=879861520,723007625&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
          alt="profile" class="profile-picture" />
        <div class="user-info">
          <div><span class="username">{{ UserDetail.nickname }}</span></div>
          <div>简介：<span class="bio">{{ UserDetail.bio }}</span></div>
          <div>性别：<span>{{ UserDetail.gender === 1 ? '男' : '女' }}</span></div>
        </div>
        <van-button size="small" style="margin-right: 1%;" color="#f5cba3">关注</van-button>
        <van-button size="small" color="#f5cba3" @click="goToSendAddFriendMsg">添加好友</van-button>
      </div>

      <!-- 统计信息 -->
      <div class="statistics">
        <div class="stat-item">
          <span class="stat-value">{{ UserDetail.followersCount }}</span>
          <span class="stat-name">粉丝</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ UserDetail.followingCount }}</span>
          <span class="stat-name">关注</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ UserDetail.allLikes }}</span>
          <span class="stat-name">获赞</span>
        </div>
      </div>
      <div class="postText">
        他的作品
      </div>
      <PostCom ref="PostCom" :postList="postList" :total="total"></PostCom>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { getPostByUser } from '@/api/post'
import PostCom from '@/components/actives/PostCom.vue'
export default {
  name: 'userDetail',
  data () {
    return {
      UserDetail: {},
      postList: [],
      total: 0
    }
  },
  components: {
    PostCom
  },
  methods: {
    async getUserInfoByIdFn () {
      const res = await getUserInfoById(this.$route.query.userId)
      this.UserDetail = res.data.data
      console.log(res)
    },
    goToSendAddFriendMsg () {
      this.$router.push({ path: '/sendAddFriend', query: { userId: this.UserDetail.cuserId } })
    },
    async getPostFn () {
      const res = await getPostByUser(this.$route.query.userId)
      this.postList = res.data.data
      this.total = this.postList.length
      console.log(this.postList)
      this.$refs.PostCom.updateData()
      console.log(res)
    }
  },
  mounted () {
    this.getUserInfoByIdFn()
    this.getPostFn()
  }
}
</script>

<style scoped lang="less">
.postText {
  width: 100%;
  height: 20%;
  padding: 3% 0;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid rgb(236, 176, 112);
}

.user {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .profile-picture {
      /* 假定头像尺寸*/
      width: 80px;
      height: 80px;
      border-radius: 50%;
      /* background-color: #ccc; // 头像的占位符颜色*/
    }

    .user-info {
      flex: 1;
      margin-left: 10px;

      .username {
        font-size: 26px;
        font-weight: bold;
      }

      .bio {
        font-size: 12px;
        color: #666;
      }
    }

    .edit-button {
      background-color: #ff6a00;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 15px;
    }
  }

  .statistics {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;

    .stat-item {
      text-align: center;

      .stat-value {
        display: block;
        font-size: 18px;
        font-weight: bold;
      }

      .stat-name {
        font-size: 14px;
      }
    }
  }

  .features {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    .feature-item {
      width: 25%;
      padding: 10px 0;
    }
  }

}
</style>
