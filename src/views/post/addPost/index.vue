<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="input-container">
      <textarea id="contentText" placeholder="请输入内容~" v-model="formData.contentText" class="input-textarea" rows="8" cols="50"></textarea>
      <p class="char-count">已输入字数: {{ formData.contentText.length }}</p>
    </div>
    <div>请选择分类</div>
    <div class="tag-style">
      <div v-for="tag in tags" :key="tag.tagId">
        <van-tag ref="tagRef" plain round type="primary" :color="formData.tagId === tag.tagId ?'#f3e02e': tagColor"
        @click="getTagId(tag.tagId)">{{tag.tagContent}}</van-tag>
      </div>
    </div>
    <label for="contentImage">图片</label>
    <div class="content-image">
      <van-uploader id="contentImage" v-model="fileList" :deletable = "true" :name="inputName" multiple :after-read="afterRead" :max-count="9"/>
    </div>
    <p class="char-count">已上传图片: {{ fileList.length }}/9</p>
    <div>
      <span>是否公开</span>
      <van-switch style="margin-left: 2%;margin-top: 2%;" v-model="isPublic" size="18px"></van-switch>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
import { addPost, getPostDetail } from '@/api/post'
import { getTags } from '@/api/tags'
import { addDraft } from '@/api/drafts'
export default {
  name: 'AddPost',
  data () {
    return {
      title: '发布作品',
      isPublic: true, // 是否公开
      fileList: [], // 图片列表
      inputName: 'files',
      intro: '',
      formData: {
        contentText: '',
        contentImage: '',
        tagId: null,
        isPublic: 1
      },
      tags: [],
      tagColor: '#55bafd' // 标签颜色
    }
  },
  async created () {
    const res = await getTags()
    this.tags = res.data.data
    if (this.$route.query.postId !== undefined) {
      this.title = '编辑作品'
      const res2 = await getPostDetail(this.$route.query.postId)
      this.formData = res2.data.data
      console.log(res2.data)
    }
    console.log(res.data)
  },
  methods: {
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

        this.formData.contentImage = fileObj.addInfo.join(',')
      }).catch(() => {
        // 上传失败
        fileObj.status = 'failed'
        // 失败状态提示
        fileObj.message = '上传失败'
      })
    },
    async onClickLeft () {
      if (this.$route.query.postId !== undefined) {
        this.$router.back()
        return
      }
      if (this.formData.contentText.trim() === '' && this.formData.contentImage === '' && this.formData.tagId === null) {
        this.$router.back()
        return
      }
      this.$dialog.confirm({
        message: '检测到你有输入内容，是否加入草稿箱？'
      })
        .then(async () => {
          if (this.formData.contentText.trim() === '' || this.formData.tagId === null) {
            this.$toast.fail('加入草稿箱时，不能有空值')
            return
          }
          const res = await addDraft(this.formData)
          console.log(res.data.data)
          if (res.data.code === 1) {
            this.$router.push('/layout/user')
          }
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$router.back()
        })
    },
    async onClickRight () {
      console.log('完成-->', this.formData)
      if (this.formData.contentText.trim() === '') {
        this.$toast.fail('内容不能为空')
        return
      }
      if (!this.isPublic) {
        this.formData.isPublic = 0
      }
      if (this.formData.tagId === null) {
        this.$toast.fail('必须选择一个分类')
        return
      }
      const res = await addPost(this.formData)
      if (res.data.code === 1) {
        this.$router.push('/layout/user')
      }
      console.log(res)
    },
    getTagId (tagId) {
      this.formData.tagId = tagId
    }
  }
}
</script>

<style scoped lang="less">
.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: vertical;
}

.char-count {
  font-size: 0.8rem;
  color: #666;
}

.content-image {
  padding: 5%;
}
/* tagStyle */
.tag-style {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    margin-right: 20px ;
  }
}
</style>
