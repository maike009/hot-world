import { getEmailCode } from '@/api/common'
import { Toast } from 'vant'

// 这是混入对象
export default {
  data () {
    return {
      timer: null, // 定时器id
      totalSecond: 60, // 总秒数
      Second: 60 // 当前秒数，开定时器时就--
    }
  },
  methods: {
    validFn (email) {
      // 校验邮箱
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        console.log(email)
        this.$toast('请输入正确的邮箱地址')
        return false
      }
      return true
    },
    async MixGetEmailCode (email) {
      console.log(999, email)
      if (!this.validFn(email)) {
        console.log(this.validFn())
        console.log(888)
        return
      }
      console.log(111)
      // 开启计时
      if (!this.timer && this.Second === this.totalSecond) {
        // 发送请求
        const obj = {
          email
        }
        const res = await getEmailCode(obj)
        Toast(res.data.data)
        this.timer = setInterval(() => {
          this.Second--
          if (this.Second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器id
            this.Second = this.totalSecond
          }
        }, 1000)
      }
      console.log('发送验证码')
    }
  }
}
