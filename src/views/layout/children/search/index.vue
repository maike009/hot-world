<template>
  <div>
    <van-search v-model="keyWord" placeholder="请输入搜索关键词" @search="onSearch" input-align="center" />
    <div>
      <div v-if="keyWord == ''">
        <h3>
          猜你喜欢
        </h3>
      </div>
      <div>
        <PostCom ref="PostCom" @getPost="getBestLikeFn" :postList="postList" >
        </PostCom>
      </div>
    </div>
  </div>
</template>

<script>
import PostCom from '@/components/actives/PostCom'
import { queryLikePost, getBestLike } from '@/api/post'
export default {
  name: 'SearchView',
  components: {
    PostCom
  },
  data () {
    return {
      postList: [],
      total: 0,
      keyWord: ''
    }
  },
  methods: {
    async onSearch (keyWord) {
      const res = await queryLikePost(keyWord)
      // this.total = res.data.data.total
      this.postList = res.data.data
      this.$refs.PostCom.updateData()
    },
    async getBestLikeFn () {
      const res = await getBestLike()
      this.postList = res.data.data
      // this.total = res.data.data.length
      this.$refs.PostCom.updateData()
      console.log(res)
      console.log(this.total)
    }

  },
  created () {
    this.getBestLikeFn()
  }
}
</script>

<style></style>
