<template>
  <div>
    <van-nav-bar
      :title="'AI聊天室'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div id="app" class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-for="message in messages" :key="message.id">
          <div class="nickname">{{ message.sender === 'bot' ? 'AI机器人' : 'You' }}</div>
          <div :class="'message ' + message.sender">
            {{ message.text }}
          </div>
        </div>

      </div>
      <div class="input-container">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="input-message">
        <van-button @click="sendMessage" :disabled="!textVal" class="send-button">{{textVal ?  "发送" : (needTime).toFixed(2) }}</van-button>
      </div>
    </div>

    <!-- <button @click="run">{{textVal ?  "写诗" : (needTime).toFixed(2) }}</button> -->
  </div>
</template>

<script>
import { GoogleGenerativeAI } from '@google/generative-ai'
export default {
  name: 'GminiView',
  data () {
    return {
      textVal: true,
      needTime: 0,
      timer: null,
      newMessage: '',
      messages: [
        { sender: 'bot', text: 'Hello! How can I help you?' }
      ]
    }
  },
  methods: {
    async sendMessage () {
      if (this.newMessage.trim() !== '') {
        this.textVal = !this.textVal
        this.timer = setInterval(() => {
          this.needTime = this.needTime + 0.1
        }, 100)
        const genAI = new GoogleGenerativeAI('AIzaSyAam_YJci7t6cVJ2Mr2h7t0_mf_G9g-pmg')
        // google模型
        const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro-latest' })
        // dd

        const newId = this.messages.length + 1
        // 发送问题
        this.messages.push({ id: newId, sender: 'user', text: this.newMessage })
        const result = await model.generateContent(this.newMessage)
        const response = await result.response
        // 响应的数据
        const text = response.text()
        if (text) {
          // 计算器开关
          clearInterval(this.timer)
          this.needTime = 0
          this.textVal = !this.textVal
        }
        this.text = text
        console.log('Gemini', text, response)
        console.log(result)
        this.newMessage = ''
        this.$nextTick(() => {
          this.scrollToEnd()
        })
        // Simulate bot response
        setTimeout(() => {
          const newId = this.messages.length + 1
          this.messages.push({ id: newId, sender: 'bot', text: this.text })
          this.$nextTick(() => {
            this.scrollToEnd()
          })
        }, 10)
      }
    },
    scrollToEnd () {
      const container = this.$refs.messagesContainer
      container.scrollTop = container.scrollHeight
    },
    onClickLeft () {
      console.log(this.messages)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nickname {
  width: 90%;
  padding: 2%;
  margin-bottom: 2px;
  border-bottom: 1px solid #ccc;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  /* Make sure the text wraps */
}

.message.user {
  background-color: #d1ecf1;
  align-self: flex-end;
}

.message.bot {
  background-color: #d4edda;
  align-self: flex-start;
}

.input-container {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.input-container .input-message {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 10px;
}

.input-container .send-button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
}

/* Adjust max-width to ensure messages do not stretch too wide */
.message.user,
.message.bot {
  max-width: 90%;
}

/* optional:AddMediaQueryForBetterResponsiveness */
@media (max-width: 600px) {
  .message {
    max-width: 70%;
  }
}
</style>
