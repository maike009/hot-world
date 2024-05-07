<template>
  <div>
    <van-nav-bar
      :title="`修改${$route.query.type}`"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="nickname">
      <van-field ref="fieldRef" v-focus v-model="param" :label="$route.query.type" />
    </div>
  </div>
</template>

<script>
import { updateUser, updateUserInfo } from '@/api/user'
export default {
  data () {
    return {
      param: ''
    }
  },
  created () {
    this.param = this.$route.query.pa
    console.log(this.$route.query.pa, '999')
  },
  mounted () {
    if (this.$refs.fieldRef) {
      this.$refs.fieldRef.focus()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async onClickRight () {
      switch (this.$route.query.type) {
        case '用户名':
          this.updateUserFn({ username: this.param })
          break
        case '昵称':
          this.updateUserFn({ nickname: this.param })
          break
        case '简介':
          this.updateUserInfoFn({ bio: this.param })
          break
      }
      console.log('完成')
    },
    async updateUserFn (param) {
      const res = await updateUser(param)
      if (res.data.code === 1) {
        this.$toast.success('修改成功')
        this.$router.back()
      }
      console.log(res.data)
    },
    async updateUserInfoFn (param) {
      const res = await updateUserInfo(param)
      if (res.data.code === 1) {
        this.$toast.success('修改成功')
        this.$router.back()
      }
      console.log(res.data)
    }
  }
}
</script>

<style scoped>
.nickname {
  margin-top: 20% ;
}

</style>
