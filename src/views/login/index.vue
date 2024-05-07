<template>
  <div id="login">
    <div class="loginBox">
      <div style="text-align: center;">
        <span @click="showForm = true">密码登录</span>&nbsp;|&nbsp;
        <span @click="showForm = false">邮箱登录</span>
      </div>
      <div class="login-card">
        <van-form @submit="onSubmit" v-if="showForm" >
        <van-field class="login-item" v-model="username" name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field class="login-item" v-model="password" name="password" type="password"  label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写验证码' }]" />
          <router-link to="/register"><span style="color: #438aee;">还没有账号，点击注册</span></router-link>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      <!-- 邮箱登录 -->
      <van-form @submit="onSubmit" v-else>
        <van-field left-icon="email-o" class="login-item" size="50" v-model="email" name="email" label="邮箱" placeholder="邮箱" />
        <van-field class="login-item" v-model="emailCode" name="emailCode" label="邮箱验证码" placeholder="邮箱验证码" />
          <div class="form-item">
              <button @click="MixGetEmailCode(email)" type="button">
                {{Second===totalSecond ? '获取验证码': Second + '秒后重新发送'}}
              </button>
            </div>
            <router-link to="/register"><span style="color: #438aee;">还没有账号，点击注册</span></router-link>

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginByUser } from '@/api/user'
import mixin from '@/mixin'
export default {
  name: 'LoginView',
  mixins: [mixin],
  data () {
    return {
      username: '',
      password: '',
      showForm: true,
      email: '',
      emailCode: ''
    }
  },
  methods: {

    async onSubmit (values) {
      // 调用登录接口
      const res = await loginByUser(values)
      if (res.data.code === 0) {
        this.$toast.fail(res.data.msg)
        return
      }
      // 将返回的token存储到vuex中
      this.$store.commit('user/setUserToken', res.data.data)
      // 弹出提示框
      this.$toast('登录成功')
      // 进行判断，看地址栏是否有回跳地址
      const url = this.$route.query.backUrl || '/'
      // 进行跳转
      this.$router.replace(url)
    }

  }
}
</script>

<style scoped lang="less">
#login {
  padding: 40% 5%;
  background: url('https://tse3-mm.cn.bing.net/th/id/OIP-C.4XlkCdz236krJxNEiDeINgHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7') no-repeat;
  background-size: cover;
  background-position:center;
  height: 100vh;
}
.login-item {
  opacity: 0.7;
  border: 1px #aaa8a8 solid;
  border-radius: 10px;
  margin: 10px 0px;
}
.loginBox{
  margin: 40% 0%;
  opacity: 0.7;
  background-color: #fff;
  padding: 5px;
  border-radius: 20px;
}

.login-card {
  padding: 10px;
  border: 1px #d0cdcd border;
  border-radius: 10px;
}
.form-item {
      border-bottom: 1px solid #f3f1f2;
      margin-bottom: 14px;
      display: flex;
      align-items: center;

      button {
        height: 31px;
        width: 100%;
        border: 1px #cea26a solid;
        border-radius: 10px;
        font-size: 13px;
        color: #e7aa5a;
        background-color: transparent;
        padding-right: 9px;
      }
    }
</style>
