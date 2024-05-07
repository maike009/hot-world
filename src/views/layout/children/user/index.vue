<template>
  <div class="user">
    <!-- 头部区域 -->
    <div class="user-header" @click="$router.push('/editUser')">
      <van-image fit="cover" round :src="UserDetail.avatar || 'https://img0.baidu.com/it/u=879861520,723007625&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" alt="profile" class="profile-picture"/>
      <div class="user-info">
        <div><span class="username">{{UserDetail.nickname}}</span></div>
        <div>简介：<span class="bio">{{UserDetail.bio}}</span></div>
        <div>性别：<span>{{ UserDetail.gender === 1 ? '男': '女' }}</span></div>
      </div>
      <van-icon name="setting-o" size="30"/>
    </div>

    <!-- 统计信息 -->
    <div class="statistics">
      <div class="stat-item">
        <span class="stat-value">{{ UserDetail.followersCount }}</span>
        <span class="stat-name">粉丝</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{UserDetail.followingCount}}</span>
        <span class="stat-name">关注</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ UserDetail.allLikes }}</span>
        <span class="stat-name">获赞</span>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="features">
      <div class="feature-item">
        <van-icon name="photo-o" size="40"/><br/>
        <span @click="$router.push('/addPost')">发布作品</span>
      </div>
      <div class="feature-item" @click="$router.push('/AIHelp')">
        <van-icon name="smile-o" size="40"/><br/>
        <span>AI小助手</span>
      </div>
      <div class="feature-item" @click="$router.push('/history')">
        <van-icon name="underway-o" size="40"/><br/>
        <span>浏览记录</span>
      </div>
      <div class="feature-item" @click="$router.push('/drafts')">
        <van-icon name="todo-list-o" size="40"/><br/>
        <span>草稿箱</span>
      </div>
      <!-- 更多功能项 -->
    </div>
    <!-- 标签栏 -->
    <div>
      <activeCom></activeCom>
    </div>

  </div>
</template>
<script>
import activeCom from '@/components/activeTab'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'UserDiv',
  components: {
    activeCom
  },
  computed: {
    ...mapState('user', ['userInfo']),
    UserDetail () {
      return this.userInfo.info
    }
  },
  methods: {
    async setUserInfo () {
      try {
        // 获取用户信息
        const res = await getUserInfo()
        // 将用户信息存储到store中
        this.$store.commit('user/setUserInfo', res.data.data)
      } catch (error) {
        console.log(error, 'user...')
      }
    }
  },
  created () {
    console.log(this.$store.getters)
    this.setUserInfo()
  }
}
</script>
<style scoped lang="less">
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
      // 假定头像尺寸
      width: 80px;
      height: 80px;
      border-radius: 50%;
      // background-color: #ccc; // 头像的占位符颜色
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
