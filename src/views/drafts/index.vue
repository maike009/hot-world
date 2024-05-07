<template>
  <div>
    <van-nav-bar
        title="草稿箱"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        />
      <div class="post-box" v-for="item in drafts" :key="item.postId" @click="goToUpdate(item)">
        <!-- 头部区域 -->
        <div class="user-header">
          <div class="user-info">
            <div class="userInfo">
              <van-image round fit="cover"
                :src="item.avatar || 'https://img0.baidu.com/it/u=879861520,723007625&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
                alt="profile" class="profile-picture"/>
              <div class="userInfoText">
                <div><span class="username">{{ item.nickname }}</span></div>
                <div><span class="bio">{{ item.createTime }}</span></div>
              </div>
            </div>
            <div class="userPicText">
              <div class="userCont">{{ item.contentText }}</div>
              <div v-if="item.contentImage" class="content-img">
                <div class="item-img" v-for="(img, index) in item.contentImage.split(',')" :key="index">
                  <van-image width="6rem" height="5rem" fit="cover" :src="img" />
                </div>
              </div>
            </div>
            <van-button type="danger" round style="margin-left: 80%;" @click.stop="delDra(item.postId)">删除</van-button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { getMyDrafts, delDra } from '@/api/drafts'
export default {
  name: 'DraftView',
  data () {
    return {
      drafts: []
    }
  },
  methods: {
    async getMyDraftsFn () {
      const res = await getMyDrafts()
      this.drafts = res.data.data
      console.log(res.data)
    },
    goToUpdate (item) {
      this.$router.push({
        path: '/addPost',
        query: {
          postId: item.postId
        }
      })
      console.log(item)
    },
    delDra (postId) {
      this.$dialog.confirm({
        message: '确认删除这条草稿吗'
      }).then(async () => {
        // on close
        const res = await delDra(postId)
        console.log(res.data.data)
        if (res.data.code === 1) {
          this.$toast.success('删除成功')
          this.getMyDraftsFn()
        }
      }).catch(() => {
        console.log('取消')
      })
    }
  },
  created () {
    this.getMyDraftsFn()
  }
}
</script>

<style scoped lang="less">
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
