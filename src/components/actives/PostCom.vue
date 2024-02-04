<template>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="post-box" v-for="item in sonPostList" :key="item.id">
          <!-- 头部区域 -->
          <div class="user-header">
            <img :src="item.avatar || 'https://img0.baidu.com/it/u=879861520,723007625&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
                 alt="profile" class="profile-picture">
            <div class="user-info">
              <div><span class="username">{{item.nickname}}</span></div>
              <div><span class="bio">{{ item.createTime }}</span></div>
              <div>{{ item.contentText }}</div>
            </div>
          </div>
          <div class="status-box">
              <span @click="isLike = !isLike">
                <van-icon name="like-o" v-if="isLike" size="20"/><van-icon v-else size="20" name="like" />
                <span class="Number-status">1</span>
              </span>
              <span @click="isCollection = !isCollection">
                <van-icon name="star-o" v-if="isCollection" size="20"/><van-icon size="20" v-else name="star" />
                <span>8</span>
              </span>
              <span>
                <van-icon name="comment-o" size="20"/>
                <span>7</span>
              </span>
            </div>
        </div>
      </van-list>
    </div>
  </template>

<script>
export default {
  name: 'PostComponent',
  props: ['postList', 'total'],
  data () {
    return {
      isLike: true,
      loading: false,
      finished: false,
      isCollection: true,
      page: 1,
      pageSize: 5,
      nickname: '',
      sonPostList: [],
      sonTotal: 0
    }
  },
  methods: {
    updateData () {
      console.log('updateData.....')
      // this.loading = true
      this.sonPostList = this.postList
      console.log('this.sonPostList---', this.sonPostList, this.total)
      this.sonTotal = this.total
      // 检查是否所有数据都已加载完毕
      if (this.sonPostList.length === this.sonTotal) {
        // 先将 loading 设置为 false，再将 finished 设置为 true
        this.loading = false
        this.finished = true
      }
      /* 问题：为什么这里的postList中能够在页面中显示数据数据，但是却在控制台打印的时候是没有数据，而且
        this.postList.length, this.total都是0
        */
      console.log(this.sonPostList.length === this.sonTotal, this.sonPostList.length, this.sonTotal)
      // this.loading = false
      // this.finished = true
    },
    async onLoad () {
      // 设置 loading 为 true 表示正在加载数据
      // this.loading = true

      // 模拟异步请求数据
      this.page++
      this.$emit('getPost', this.page, this.pageSize)
      try {
        // await this.$nextTick()
        // console.log(222)

        // 检查是否所有数据都已加载完毕
        // if (this.sonPostList.length === this.sonTotal) {
        //   // 先将 loading 设置为 false，再将 finished 设置为 true
        //   this.loading = false
        //   this.finished = true
        // }
        /* 问题：为什么这里的postList中能够在页面中显示数据数据，但是却在控制台打印的时候是没有数据，而且
        this.postList.length, this.total都是0
        */
        // console.log(this.sonPostList.length === this.sonTotal, this.sonPostList.length, this.sonTotal)
        // this.loading = false
        // this.finished = true
      } catch (error) {
        console.error('加载帖子出错:', error)
      } finally {
        // 数据加载完成后设置 loading 为 false
        this.loading = false
      }
    }

  }
}
</script>

  <style lang="less" scoped>
  .post-box {
    border: 1px solid #c6c3c3;
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
    }

    .user-info {
      flex: 1;
      margin-left: 10px;
      .username {
        font-size: 18px;
        font-weight: bold;
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
  </style>
