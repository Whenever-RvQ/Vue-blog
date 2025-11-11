<template>
  <div class="blog-chat">
    <div class="blog-chat--header">
      <i class="el-icon-comments"></i>
      <span>实时聊天室</span>
    </div>
    <div class="blog-chat--content">
      <div class="blog-chat--item" :class="chat.dis" v-for="chat in chatList" :key="chat.time + chat.nikname">

        <span v-if="chat.nikname && chat.type !== 'action'" class="blog-chat--nikname">{{ chat.nikname }}</span>
        <div class="blog-chat--box" :class="{ action: chat.type === 'action' }">
          <span class="blog-chat--time" v-if="chat.time && chat.type !== 'action'">{{ chat.time }}</span>
          <p class="blog-chat--msg" v-if="chat.msg">{{ chat.msg }}</p>
        </div>
      </div>
    </div>
    <div class="blog-chat--bottom">
      <el-input v-model="sendMsg" placeholder="请输入聊天内容..." class="chat-input" @keyup.enter="sendChat">
      </el-input>
      <el-button type="primary" @click="sendChat" icon="el-icon-position" class="send-btn">
        发送
      </el-button>
    </div>

    <el-dialog title="设置昵称" :visible="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-input v-model="nikname" placeholder="请输入你的昵称" :maxlength="10" show-word-limit>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import formatDate from '@/util/formatDate'

export default {
  name: 'SocketChat',
  data() {
    return {
      sendMsg: '',
      chatList: [],
      nikname: '',
      ws: null,
      dialogVisible: false
    };
  },
  created() {
    this.$store.commit('RIGHT_LIVE2D_DIS')
    this.getNikname()

    // 连接Socket
    this.ws = io("ws://127.0.0.1:8889", { transports: ['websocket'] })

    this.ws.on('connect', () => {
      console.log('建立连接')
      // 已登录用户自动发送登录状态
      if (this.nikname) {
        this.ws.emit('login', this.nikname)
      }
    })

    this.ws.on('chat', (data) => {
      this.serverChat(data)
    })

    this.ws.on('logout', (nikname) => {
      this.serverLog({ nikname, isLogin: false })
    })

    this.ws.on('logged', (nikname) => {
      this.serverLog({ nikname, isLogin: true })
    })

    // 监听连接错误
    this.ws.on('error', (error) => {
      console.error('Socket连接错误:', error)
      this.addChat({
        type: 'action',
        msg: '连接聊天室失败，请刷新页面重试'
      })
    })
  },
  beforeDestroy() {
    this.$store.commit('LEFT_LIVE2D_DIS')
    // 关闭socket连接
    if (this.ws) {
      this.ws.close()
    }
  },
  updated() {
    // 滚动到底部
    const content = this.$el.querySelector('.blog-chat--content')
    if (content) {
      content.scrollTop = content.scrollHeight
    }
  },
  methods: {
    getNikname() {
      let nikname = this.$store.getters.userInfo?.nikname
      this.dialogVisible = !nikname
      this.nikname = nikname || ''
    },
    login() {
      if (!this.nikname.trim()) {
        this.$message.warning('请输入有效的昵称')
        return
      }
      this.ws.emit('login', this.nikname.trim())
      this.dialogVisible = false
      // 保存昵称到store
      this.$store.commit('SET_USER_INFO', {
        ...this.$store.getters.userInfo,
        nikname: this.nikname.trim()
      })
    },
    addChat({
      type = "msg",
      msg = "",
      nikname = '',
      time = formatDate(),
      isMe = false
    }) {
      let dis = 'left'
      if (type === 'action') {
        dis = 'center'
      }
      if (isMe) {
        dis = 'right'
      }
      this.chatList.push({
        type, msg, nikname, time, isMe, dis
      })
    },
    sendChat() {
      const msg = this.sendMsg.trim()
      if (!msg) {
        this.$message.warning('请输入聊天内容')
        return
      }
      if (!this.nikname) {
        this.dialogVisible = true
        return
      }

      this.addChat({
        isMe: true,
        msg,
        nikname: this.nikname
      })
      this.ws.emit('send', {
        msg,
        nikname: this.nikname,
        time: formatDate()
      })
      this.sendMsg = ''
    },
    serverChat(data) {
      // 解构时增加容错，避免字段缺失导致显示匿名
      console.log('接收到服务器消息：', data);
      const { msg = '', nikname = '', time = '' } = data || {};
      // 新增：如果 nikname 为空，显示「未知用户」（比匿名用户更准确）
      const showNikname = nikname.trim() || '未知用户';

      this.addChat({
        nikname: showNikname,
        msg: msg.trim() || '空消息',
        time: time || formatDate() // 后端没传时间时，前端补全
      })
    },
    serverLog({ nikname, isLogin }) {
      const state = isLogin ? '进入' : '离开'
      const msg = `${nikname} ${state}了聊天室`
      this.addChat({
        type: 'action', msg
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
// 全局样式变量
$primary-color = #409EFF
$secondary-color = #67C23A
$gray-light = #F5F7FA
$gray = #C0C4CC
$gray-dark = #909399
$text-color = #303133
$bg-color = #F7F9FC
$border-radius = 18px
$shadow = 0 2px 12px rgba(0, 0, 0, 0.08)

.blog-chat
  display flex
  flex-direction column
  width 100%
  max-width 800px  // 限制最大宽度
  margin 10px auto
  background-color #fff
  border-radius 12px
  box-shadow 0 4px 20px rgba(0, 0, 0, 0.1)
  height 68vh
  overflow hidden
  transition all 0.3s ease

  // 响应式调整
  @media (max-width: 768px)
    width 95%
    height 75vh

.blog-chat--header
  display flex
  align-items center
  padding 16px 20px
  background-color $primary-color
  color #fff
  font-size 18px
  font-weight 500

  i.el-icon-comments
    margin-right 8px
    font-size 20px

.blog-chat--content
  flex 1
  padding 20px
  overflow-y auto
  background-color $bg-color
  scroll-behavior smooth  // 平滑滚动

  // 滚动条样式（如果需要隐藏，可注释这段）
  &::-webkit-scrollbar
    width 6px
    height 6px

  &::-webkit-scrollbar-thumb
    background-color $gray
    border-radius 3px

  &::-webkit-scrollbar-track
    background-color transparent

// 修复核心：消息项容器样式
.blog-chat--item
  display flex
  margin-bottom 16px
  animation fadeIn 0.3s ease  // 消息出现动画
  width: 100%  // 确保占满宽度

  // 左侧消息（他人）- 靠左
  &.left
    justify-content: flex-start
    flex-direction: row

    .blog-chat--nikname
      margin-right: 8px
      color $gray-dark
      font-size 12px
      align-self: flex-start
      margin-top: 2px

    .blog-chat--box
      background-color #fff
      border 1px solid #E5E6EB
      margin-left: 0  // 移除多余边距

  // 右侧消息（自己）- 靠右（关键修复）
  &.right
    justify-content: flex-end  // 整体靠右
    flex-direction: row  // 不需要反向，直接调整内部顺序
    align-items: flex-start

    // 自己的昵称在右边，所以margin-left
    .blog-chat--nikname
      margin-left: 8px
      color $gray-dark
      font-size 12px
      align-self: flex-start
      margin-top: 2px
      order: 2  // 让昵称在消息框右边

    .blog-chat--box
      background-color $primary-color
      color #fff
      margin-right: 0  // 移除多余边距
      order: 1  // 让消息框在昵称左边

  // 中间系统消息
  &.center
    justify-content: center
    flex-direction: row

    .blog-chat--box
      background-color #F0F2F5
      color $gray-dark
      font-size 13px
      padding 6px 12px
      border-radius 12px
      max-width: 60%

.blog-chat--nikname
  font-size 12px
  font-weight 500
  margin-bottom 4px
  display: inline-block

.blog-chat--box
  max-width: 70%  // 限制消息最大宽度
  padding: 10px 14px
  border-radius $border-radius
  box-shadow $shadow
  position: relative
  transition all 0.2s ease
  word-wrap: break-word  // 确保长文本换行

  // 系统消息样式
  &.action
    background-color #F0F2F5
    color $gray-dark
    text-align: center
    box-shadow: none
    border-radius: 12px

  // 气泡尖角 - 左侧消息
  .left &::before
    content: ''
    position: absolute
    left: -8px
    top: 12px
    width: 0
    height: 0
    border-top: 8px solid transparent
    border-bottom: 8px solid transparent
    border-right: 8px solid #fff
    z-index: 1

  // 气泡尖角 - 右侧消息（修复方向）
  .right &::before
    content: ''
    position: absolute
    right: -8px  // 尖角在右侧
    top: 12px
    width: 0
    height: 0
    border-top: 8px solid transparent
    border-bottom: 8px solid transparent
    border-left: 8px solid $primary-color  // 与自己消息框颜色一致
    z-index: 1

.blog-chat--time
  font-size: 11px
  color $gray
  margin-bottom: 4px
  display: block

  // 自己消息的时间颜色
  .right &
    color: rgba(255, 255, 255, 0.7)

.blog-chat--msg
  font-size: 14px
  line-height: 1.6
  margin: 0
  word-break: break-all  // 自动换行
  white-space: normal

.blog-chat--bottom
  display: flex
  gap: 12px
  padding: 16px 20px
  background-color #fff
  border-top: 1px solid #F0F2F5
  align-items: center  // 输入框和按钮垂直居中

.chat-input
  flex: 1
  border-radius: 24px !important
  border-color: #E5E6EB !important

  &:focus-within
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important

.send-btn
  border-radius: 24px !important
  padding: 0 24px !important
  height: 40px !important
  font-size: 14px !important
  transition all 0.2s ease

  &:hover
    background-color: #3391FF !important
    transform: translateY(-1px)

  &:active
    transform: translateY(0)

// 动画效果
@keyframes fadeIn
  from
    opacity: 0
    transform: translateY(10px)
  to
    opacity: 1
    transform: translateY(0)

// 对话框样式优化
.el-dialog__header
  background-color $primary-color
  color: #fff !important
  border-radius: 8px 8px 0 0

.el-dialog__title
  color: #fff !important
  font-size: 16px !important

.el-dialog__body
  padding: 20px !important

.el-input__inner
  border-radius: 20px !important
  height: 40px !important
  line-height: 40px !important

.el-button--primary
  border-radius: 20px !important
  padding: 0 20px !important

// 兼容其他浏览器的滚动条隐藏（可选）
@media screen and (-webkit-min-device-pixel-ratio: 0)
  .blog-chat--content
    scrollbar-width: none
    -ms-overflow-style: none

.blog-chat--content::-webkit-scrollbar
  display: none !important
</style>