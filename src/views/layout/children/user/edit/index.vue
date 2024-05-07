<template>
  <div>
    <van-nav-bar class="avatar" title="编辑资料" left-arrow @click-left="onClickLeft" />

    <div class="userAvatar" @click="isShowUp = true">
      <van-image round fit="cover" width="6rem" height="6rem" :src="user.avatar" />
    </div>

    <div class="userInfoEdit">
      <van-cell-group>

        <van-cell title="用户名">
          <span class="userNickName" @click="updateParam('用户名',user.username)">
            <h4 style="color:gray;display: inline-block;" v-if="user.username===''|| user.username ===null">未填写</h4>
            <span v-else>{{ user.username }}</span>
          </span>
          <van-icon name="arrow" />
        </van-cell>

        <van-cell title="昵称">
          <span class="userNickName" @click="updateParam('昵称',user.nickname)">
            <h4 style="color:gray;display: inline-block;" v-if="user.nickname ===''|| user.nickname ===null">未填写</h4>
            <span v-else>{{ user.nickname }}</span>
          </span>
          <van-icon name="arrow" />
        </van-cell>

        <van-cell title="性别">
          <span class="userGender">
            <button class="operation" :class="{selectBtn: user.gender === 1}">男</button>
            <button class="operation" :class="{selectBtn: user.gender === 0}">女</button>
          </span>
        </van-cell>

        <van-cell title="简介">
          <span class="userNickName" @click="updateParam('简介',user.bio)">
            <h4 style="color:gray;display: inline-block;" v-if="user.bio===''|| user.bio ===null">请介绍一下自己吧~</h4>
            <span v-else>{{user.bio}}</span>
          </span>
          <van-icon name="arrow" />
        </van-cell>

        <van-cell title="生日">
          <span class="userNickName" @click="ShowDate = !ShowDate">
            <h4 style="color:gray;display: inline-block;" v-if="user.birthDate ===''|| user.birthDate === null">未填写</h4>
            <span v-else>{{ user.birthDate }}</span>
          </span>
          <van-icon name="arrow" />
        </van-cell>

        <!-- <van-cell title="地区">
          <span class="userNickName">
            <h4 style="color:gray;display: inline-block;" v-if="true" @click="isShowLocal = !isShowLocal">未填写</h4>
            <span v-else>地区</span>
          </span>
          <van-icon name="arrow" />
        </van-cell> -->

        <van-button class="loginOut" round type="warning" @click="loginOut">退出登录</van-button>

      </van-cell-group>
    </div>
    <!-- 遮罩层 -->
    <div>
      <van-popup v-model="isShowUp" round position="bottom" :style="{ height: '30%' }" >
        <div><van-button @click="ShowOverlay = true, isShowUp = false" style="width: 100%; height: 4rem; font-size: 1.2rem;">查看大图</van-button></div>
        <div style="width: 100%;">
          <van-uploader style="width: 100% !important;padding-left: 40%;" :after-read="afterRead" :before-read="beforeRead">
            <div style="width: 100%; height: 4rem; font-size: 1.2rem;">修改头像</div>
          </van-uploader>
        </div>
      </van-popup>
    </div>
    <van-popup v-model="isShowLocal" position="bottom" :style="{ height: '30%' }">
      <van-area title="标题" :area-list="areaList" />
    </van-popup>
    <!-- 日期弹框 -->
    <van-popup v-model="ShowDate" position="bottom" :style="{height: '40%'}">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm = 'dateConfirm'
        @cancel = 'ShowDate = !ShowDate'
      />
    </van-popup>
    <!-- <van-overlay :show="ShowOverlay" @click=" ShowOverlay = false">
      <div class="wrapper">
        <van-image :src="user.avatar"></van-image>
      </div>
    </van-overlay> -->
    <van-image-preview :images="[user.avatar]" v-model="ShowOverlay" :show-index = false>
    </van-image-preview>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { removeInfo } from '@/utils/storage'
import { getUserInfo, updateUserInfo } from '@/api/user'
import { uploadFile } from '@/api/common'

export default {
  name: 'EditUser',
  data () {
    return {
      isShowLocal: false, // 地址弹出的状态
      isShowUp: false, // 更新头像弹出的状态
      ShowOverlay: false,
      ShowDate: false,
      areaList,
      user: {
        avatar: '',
        nickname: '',
        username: '',
        gender: '',
        bio: '',
        birthDate: '',
        addressId: ''
      },
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  created () {
    this.getUserInfoFn()
  },
  methods: {
    // 获取个人信息
    async getUserInfoFn () {
      const res = await getUserInfo()
      this.user = res.data.data
      console.log(res)
    },
    // 上传相关方法
    beforeRead (file) {
      console.log(file)
      if (file.size > 5 * 1024 * 1024) {
        this.$toast.fail('图片不能超过5MB')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('图片必须是jpg格式')
        return false
      }
      return true
    },
    async afterRead (file) {
      const formData = new FormData()
      formData.append('files', file.file)
      const res = await uploadFile(formData)
      console.log(res.data.data)
      this.user.avatar = res.data.data[0]
      const res2 = await updateUserInfo(this.user)
      this.$toast.success('修改成功~')
      console.log(res2)
    },
    // 返回s
    onClickLeft () {
      this.$router.back()
    },
    // 确认日期事件
    async dateConfirm (value) {
      // 获取年、月、日
      const year = value.getFullYear()
      // 月份从0开始，所以需要加1
      const month = (value.getMonth() + 1).toString().padStart(2, '0') // 如果是个位数月份，在前面补0
      const day = value.getDate().toString().padStart(2, '0') // 如果是个位数日期，在前面补0
      // 拼接成 yyyy-mm-dd 格式的字符串
      const formattedDate = year + '-' + month + '-' + day
      this.user.birthDate = formattedDate
      const res = await updateUserInfo(this.user)
      console.log(res)
      console.log(formattedDate)
      this.ShowDate = !this.ShowDate
    },
    // 修改页跳转
    updateParam (type, param) {
      this.$router.push({
        path: '/updateParam',
        query: {
          pa: param,
          type
        }
      })
    },
    // 退出登录
    loginOut () {
      this.$router.push('/login')
      removeInfo()
    },
    showPopup () {
      this.isShowLocal = true
    }
  }
}
</script>
<style lang="less" scoped>
// 退出登录
.loginOut {
  width: 80%;
  padding: 5% 20%;
  margin: 3% 10%;
}
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
.userAvatar {
  margin: 10% 0 0 36%;
}

.userInfoEdit {
  margin-top: 15%;

  .userNickName {
    color: #000;
  }

  .operation {
    width: 3.5rem;
    height: 2rem;
    margin-left: 10px;
    border: none;
    border-radius: 15px;
  }
}

.selectBtn {
  color: #ffffff;
  background-color: #f0672c;
}
</style>
