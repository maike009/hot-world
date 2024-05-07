<template>
  <div>
      <van-list v-model="loading" :finished="finished" finished-text="已经到底啦~" @load="onLoad">
      <div class="post-box" v-for="item,index in sonPostList" :key="index">
        <!-- 头部区域 -->
        <div class="user-header" @click="$router.push({
          path: '/postDetail',
          query: {
            uid: item.cuserId,
            pid: item.postId
          }
        })">
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

          </div>
        </div>
        <div class="status-box">
          <span @click="likeFn(item.postId,index)">
            <van-icon name="like" v-if="item.likeStatus" size="20" /><van-icon v-else size="20" name="like-o" />
            <span class="Number-status">{{ item.newLikeCount }}</span>
          </span>
          <span @click="collectionFn(item.postId,index)">
            <van-icon name="star" v-if="item.collectionStatus" size="20" /><van-icon size="20" v-else name="star-o" />
            <span>{{ item.newFavoriteCount }}</span>
          </span>
          <span>
            <van-icon name="comment-o" size="20" />
            <span>{{ item.commentsCount }}</span>
          </span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// getIsLiked getLikeCount
import { like, collection } from '@/api/post'
export default {
  name: 'PostComponent',
  props: ['postList', 'total', 'tagId'],
  data () {
    return {
      loading: false, // 加载状态
      finished: false, // 是否加载完成
      page: 1,
      pageSize: 10,
      nickname: '', // 昵称
      sonPostList: [],
      sonTotal: 0,
      likeCount: 0 // 点赞数量
    }
  },
  mounted () {
    console.log(this.postList, this.sonPostList)
  },
  watch: {
    // 监听 postList 的变化
    postList: {
      handler (newVal, oldVal) {
        // 当 postList 发生变化时执行的操作
        console.log('postList updated:', newVal)
        this.updateData()
      },
      immediate: true // 立即执行，确保初始值被处理
    }
  },
  methods: {
    // 点赞方法
    async likeFn (postId, index) {
      console.log(postId)
      await like(postId)
      console.log(this.sonPostList[index])
      // 判断是否已经点赞
      if (this.sonPostList[index].likeStatus) {
        this.sonPostList[index].newLikeCount -= 1
        this.sonPostList[index].likeStatus = false
      } else {
        this.sonPostList[index].newLikeCount += 1
        this.sonPostList[index].likeStatus = true
      }
    },
    // 收藏方法
    async collectionFn (postId, index) {
      console.log('收藏--->', postId, index)
      await collection(postId)
      if (this.sonPostList[index].collectionStatus) {
        this.sonPostList[index].newFavoriteCount -= 1
        this.sonPostList[index].collectionStatus = false
      } else {
        this.sonPostList[index].newFavoriteCount += 1
        this.sonPostList[index].collectionStatus = true
      }
    },
    updateData () {
      // this.loading = true
      console.log('updateData.....', this.postList, this.total)
      this.sonPostList = this.postList.map(obj => {
        // 复制原始对象
        const newObj = { ...obj }
        // 添加新属性
        newObj.newLikeCount = obj.likesCount
        newObj.newFavoriteCount = obj.favoriteCount
        if (obj.postId === obj.likePostId) {
          newObj.likeStatus = true
        } else {
          newObj.likeStatus = false
        }
        if (obj.postId === obj.collectionPostId) {
          newObj.collectionStatus = true
        } else {
          newObj.collectionStatus = false
        }
        return newObj
      })
      console.log('this.sonPostList---', this.sonPostList.length, this.total)
      this.sonTotal = this.total
      // 每次获取后停止加载
      this.loading = false
      // 检查是否所有数据都已加载完毕
      if (this.sonPostList.length === this.sonTotal) {
        // 先将 loading 设置为 false，再将 finished 设置为 true
        console.log('加载完成？？？？')
        this.finished = true
      }
      if (this.sonPostList.length !== this.sonTotal) {
        // 先将 loading 设置为 false，再将 finished 设置为 true
        console.log('未完成！！')
        this.finished = false
      }
      if (this.sonTotal === undefined) {
        this.finished = true
      }
      // this.loading = false
      // this.finished = true
    },
    async onLoad () {
      // 设置 loading 为 true 表示正在加载数据
      // this.loading = true
      console.log('load方法执行》》》')
      // 模拟异步请求数据
      this.page++
      this.$emit('getPost', this.page, this.pageSize, this.tagId)
    }

  }
}
</script>

<style lang="less" scoped>
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
