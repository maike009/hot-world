<template>
  <div class="active">
    <van-tabs v-model="active" swipeable @change="switchTab" animated>
        <van-tab title="作品">
          <span class="tab_style">
            <PostCom ref="PostComMy" @getPost = "getMyPostFn"
            :postList = "postList" :total = "total"
            ></PostCom>
          </span>
        </van-tab>
        <van-tab title="点赞">
          <span class="tab_style">
            <PostCom ref="PostComLike" @getPost = "getMyLikeFn"
            :postList = "postList" :total = "total"
            ></PostCom>
          </span>
        </van-tab>
        <van-tab title="收藏">
          <span class="tab_style">
            <PostCom ref="PostComColl" @getPost = "getMyCollFn"
            :postList = "postList" :total = "total"
            ></PostCom>
          </span>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostCom from './actives/PostCom'
import { getMyPost, getMyColl, getMyLike } from '@/api/post'
export default {
  name: 'activeCom',
  components: {
    PostCom
  },
  data () {
    return {
      active: 0,
      postList: [],
      total: 0,
      isLikeClick: true,
      isCollClick: true
    }
  },
  methods: {
    async getMyPostFn (page, pageSize) {
      const res = await getMyPost(page, pageSize)
      this.total = res.data.data.total
      const newData = res.data.data.records
      // 将新数据添加到 postList 中
      console.log('执行了')
      this.postList = []
      this.postList.push(...newData)
      this.$refs.PostComMy.updateData()
    },
    async getMyLikeFn () {
      console.log('like执行了。。。')
      const res = await getMyLike()
      // 更新数据
      this.postList = res.data.data
      this.total = this.postList.length
      this.$refs.PostComLike.updateData()
      this.isLikeClick = false
      console.log(this.postList)
    },
    async getMyCollFn () {
      console.log('coll执行了')
      const res = await getMyColl()
      // 更新数据
      this.postList = res.data.data
      this.total = this.postList.length
      this.$refs.PostComColl.updateData()
      this.isCollClick = false
    },
    switchTab (name, title) {
      switch (title) {
        case '作品':
          this.getMyPostFn()
          break
        case '点赞':
          // if (this.isLikeClick) {
          this.getMyLikeFn()
          console.log('000')
          // }
          break
        case '收藏':
          // if (this.isCollClick) {
          this.getMyCollFn()
          // }
          break
      }
    }
  },
  created () {
    // 初始加载数据
    this.getMyPostFn(1, 10)
  }
}
</script>

<style scoped>
.tab_style {
  margin-right: 30px;
}

</style>
