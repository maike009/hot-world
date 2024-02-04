<template>
  <div class="active">
    <van-tabs v-model="active" swipeable>
        <van-tab title="作品"><span class="tab_style"><PostCom ref="PostCom" @getPost = "getMyPostFn"
          :postList = "postList" :total = "total"
          ></PostCom></span></van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostCom from './actives/PostCom'
import { getMyPost } from '@/api/post'
export default {
  name: 'activeCom',
  components: {
    PostCom
  },
  data () {
    return {
      active: 0,
      postList: [],
      total: 0
    }
  },
  methods: {
    async getMyPostFn (page, pageSize) {
      console.log('标签中方法被调用了', page, pageSize)
      const res = await getMyPost(page, pageSize)
      this.total = res.data.data.total
      const newData = res.data.data.records
      // 将新数据添加到 postList 中
      console.log(this.postList, '触发前')
      this.postList.push(...newData)
      this.$refs.PostCom.updateData()
    }
  },
  created () {
    // 初始加载数据
    this.getMyPostFn(1, 5)
  }
}
</script>

<style scoped>
.tab_style {
  margin-right: 30px;
}

</style>
