<template>
    <div class="register-container">
      <form @submit.prevent="registerFn" class="register-form">
        <h2>用户注册</h2>

        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="formData.username" placeholder="请输入用户名" required>
        </div>

        <div class="form-group">
          <label for="nickname">昵称</label>
          <input type="text" id="nickname" v-model="formData.nickname" placeholder="请输入昵称" required autocomplete="new-password">
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="formData.password" placeholder="请输入密码" required>
        </div>

        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input @input="checkPass" type="password" id="confirmPassword" v-model="formData.confirmPassword" placeholder="请再次输入密码" required>
        </div>
        <div v-if="passwordMismatch" style="color: red; margin-left: 30vw;">两次输入的密码不一致</div>

        <div class="form-group">
          <label for="gender">性别</label>
          <select id="gender" v-model="formData.gender" required>
            <option disabled value="" selected hidden>请选择性别</option>
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="formData.cEmail" placeholder="请输入邮箱" required>
        </div>

        <div class="form-group">
          <label for="emailCode">邮箱验证码</label>
          <input type="text" id="emailCode" v-model="formData.emailCode" placeholder="请输入验证码" required>
        </div>

        <div class="form-item">
              <button @click="MixGetEmailCode(formData.cEmail)" type="button">
                {{Second===totalSecond ? '获取验证码': Second + '秒后重新发送'}}
              </button>
        </div>
        <button style="background-color: skyblue;" type="submit" class="register-btn">注册</button>
      </form>
    </div>
  </template>

<script>
import mixin from '@/mixin'
import { register } from '@/api/user'
export default {
  name: 'RegisterView',
  mixins: [mixin],
  data () {
    return {
      formData: {
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        gender: '',
        cEmail: '',
        emailCode: ''
      },
      passwordMismatch: false
    }
  },
  methods: {
    checkPass () {
      this.passwordMismatch = this.formData.password !== this.formData.confirmPassword
    },
    async registerFn () {
      if (!/^[a-zA-Z][a-zA-Z0-9]{5,49}$/.test(this.formData.username)) {
        this.$toast('用户名必须是英文或数字，只能英文开头，长度为6-50个字符')
        return
      }
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,30}$/.test(this.formData.nickname)) {
        this.$toast('昵称最大为30个字符')
        return
      }
      if (!/^[a-zA-Z0-9]{5,49}$/.test(this.formData.password)) {
        this.$toast('用户名必须是英文或数字，长度为6-50个字符')
        return
      }
      // 发送注册请求
      console.log('注册信息:', this.formData)
      const res = await register(this.formData)
      if (res.data.code === 1) {
        this.$toast.success(res.data.data)
        console.log('注册成功......')
        this.$router.push('/login')
      }
    }
  }
}
</script>

  <style scoped lang="less">
  .register-container {
    padding: 0.6rem;
    background-image: url('https://tse3-mm.cn.bing.net/th/id/OIP-C.4XlkCdz236krJxNEiDeINgHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7'); /* 替换为你的背景图路径 */
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-form {
    opacity: 0.7;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    max-width: 50rem; /* 设置一个最大宽度，防止过于宽敞 */
    width: 100%;
  }

  .register-form h2 {
    color: #333;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    margin-bottom: 1vh;
  }

  label {
    width: 90px; /* 设置label的宽度 */
    margin-right: 10px;
    line-height: 32px; /* 使label和input在垂直方向上居中对齐 */
  }

  input,
  select {
    background-color: rgba(255, 255, 255, 0.5);
    flex: 1;
    padding: 7px;
    box-sizing: border-box;
    border-radius: 10px;
    border: #ada6a6 1px solid;
  }

  .simCode {
    flex: 1;
    text-align: center;
    border: #333;
    border-radius: 10px;
    padding: 5px;
    background-color: #a7d1b2;
    border: #ada6a6 1px solid;
    margin-left: 10px;

  }
  button {
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  .form-item {
      margin: -10px;
      display: flex;
      align-items: center;
      button {
        height: 31px;
        line-height: 15px;
        width: 95%;
        border: 1px solid skyblue;
        border-radius: 10px;
        font-size: 1rem;
        color: skyblue;
        background-color: transparent;
        padding-right: 9px;
      }
    }

  /* 根据需要添加其他样式 */
  </style>
