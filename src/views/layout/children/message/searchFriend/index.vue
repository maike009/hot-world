<template>
    <div>
        <van-search
        v-model="keyWord"
        placeholder="请输入用户名称"
        @search="onSearch"
        >
        </van-search>
        <div class="friend_li" v-for="item in searchFriendList" :key="item.cuserId">
            <div class="friend" @click="getUserInfoFn(item.cuserId)">
                <img :src="item.avatar" alt="Friend 1">
                <span>{{ item.nickname }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserInfoByNick } from '@/api/user'
export default {
  name: 'SearchFriend',
  data () {
    return {
      searchFriendList: [],
      total: 0,
      keyWord: ''
    }
  },
  methods: {
    async onSearch (keyWord) {
      const res = await getUserInfoByNick(keyWord)
      console.log(res.data)
      this.searchFriendList = res.data.data
    },
    getUserInfoFn (userId) {
      this.$router.push({
        path: '/userDetail',
        query: {
          userId
        }
      })
    }
  },
  async created () {

  }
}
</script>

<style scoped>
 .friend {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .friend img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .friend span {
        font-weight: bold;
    }
</style>
