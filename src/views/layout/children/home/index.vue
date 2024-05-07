<template>
  <div>
    <div class="swipe-top">
      <van-swipe :autoplay="3000" width="400">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image width="100%" height="14rem" :src="image" fit="fill"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-tabs v-model="active" @change="setTagId" swipeable>
        <div v-for="(tag) in Tags" :key="tag.tagId" style="width: 10px;background-color: red;">
          <van-tab :title="tag.tagContent">
          </van-tab>
        </div>
        <PostCom ref="PostComTag" @getPost = "getPostByTagFn"
            :postList = "postList"
            :total = "total"
            :tagId = "tagId">
        </PostCom>
      </van-tabs>

    </div>
  </div>
</template>

<script>

import PostCom from '@/components/actives/PostCom.vue'
import { getPostList, getPostByTag } from '@/api/post'
import { getTags } from '@/api/tags'
export default {
  name: 'HomeView',
  components: {
    PostCom
  },
  data () {
    return {
      tagId: null,
      images: [
        'https://hot-world01.oss-cn-shenzhen.aliyuncs.com/08dc6abdbeb8236a1a44511d96728cba.jpeg',
        'https://hot-world01.oss-cn-shenzhen.aliyuncs.com/2b916ea5e1f0d12edaff71cd0a4c28b.jpg',
        'https://hot-world01.oss-cn-shenzhen.aliyuncs.com/2eca73767c2fc1a3558083e44908dfe.jpg',
        'https://hot-world01.oss-cn-shenzhen.aliyuncs.com/a26525a54813c2ed1d0519290a4c38e.jpg'
      ],
      postList: [],
      Tags: [],
      total: 0,
      active: 0 // 标签索引
    }
  },
  methods: {
    // 设置tagId
    setTagId (name, title) {
      console.log(title, '被激活了')
      this.postList = []
      this.showPoC = false
      this.tagId = name + 1
      this.getPostByTagFn(1, 10, this.tagId)
      console.log(name, title)
    },
    // 获取全部帖子
    async getPostFn (page, pageSize) {
      const res = await getPostList(page, pageSize)
      this.total = res.data.data.total
      const newData = res.data.data.records
      // 将新数据添加到 postList 中
      this.postList.push(...newData)
      this.$refs.PostComTag.updateData()
    },
    // 获取所有标签
    async getTagsFn () {
      const res = await getTags()
      this.Tags.push(...res.data.data)
      console.log(res)
    },
    // 根据标签获取帖子
    async getPostByTagFn (page, pageSize, tagId) {
      const res = await getPostByTag(page, pageSize, tagId)
      this.postList.push(...res.data.data.records)
      this.total = res.data.data.total
      // 使用一个新变量来引用 this.$refs.PostCom
      this.$refs.PostComTag.updateData()
      console.log('byTag--->', res)
    }
  },
  created () {
    // this.getPostFn(1, 10)
    this.getTagsFn()
    this.setTagId(0)
  }
}
</script>

<style scoped lang="less">
.swipe-top {
  width: 100%;
  height: 20%;
  padding: 2%;

}
</style>
