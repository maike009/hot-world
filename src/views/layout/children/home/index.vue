<template>
  <div>
    <PostCom ref="PostCom" @getPost = "getPostFn" :postList = "postList" :total = "total"></PostCom>
    <!-- <van-uploader v-model="fileList" :name="inputName" multiple :after-read="afterRead" /> -->
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
import PostCom from '@/components/actives/PostCom.vue'
import { getPostList } from '@/api/post'
export default {
  name: 'HomeView',
  components: {
    PostCom
  },
  data () {
    return {
      fileList: [],
      inputName: 'files',
      postList: [],
      total: 0
    }
  },
  methods: {
    async getPostFn (page, pageSize) {
      console.log('home中方法被调用了', page, pageSize)
      const res = await getPostList(page, pageSize)
      this.total = res.data.data.total
      const newData = res.data.data.records
      // 将新数据添加到 postList 中
      console.log(this.postList, this.total, '父组件添加数据前')
      this.postList.push(...newData)
      this.$refs.PostCom.updateData()
    },
    afterRead (fileObj) {
      console.dir(fileObj)
      console.dir(fileObj instanceof Array)
      // 上传状态
      fileObj.status = 'uploading'
      // 状态提示
      fileObj.message = '上传中...'
      // 声明form表单数据
      const formData = new FormData()
      // 添加文件信息
      if (fileObj instanceof Array) {
        fileObj.forEach(e => {
          formData.append('files', e.file)
        })
      } else {
        formData.append('files', fileObj.file)
      }
      // 上传接口调用
      uploadFile(formData).then(res => {
        // 上传成功
        fileObj.status = 'done'
        // 存储返回数据
        fileObj.addInfo = res.data.data
        console.log(fileObj.addInfo)
      }).catch(() => {
        // 上传失败
        fileObj.status = 'failed'
        // 失败状态提示
        fileObj.message = '上传失败'
      })
    }
  },
  created () {
    this.getPostFn(1, 5)
  }
}
</script>

<style>

</style>
