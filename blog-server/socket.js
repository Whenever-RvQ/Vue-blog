var app = require('./app');
var http = require('http');
let webSocketServer = http.Server(app)
let socketIo = require('socket.io')
let io = socketIo(webSocketServer, { transports: ['websocket'] })
let { formatDate } = require('./core/util/util')

const users = {}

io.on('connection', (socket) => {
  console.log('连接已经建立', `id:${socket.id}`)

  socket.on('login', (nikname) => {
    if (users[nikname]) {
      socket.emit('repeat')
      return
    }
    socket.nikname = nikname
    users[nikname] = {
      name: nikname,
      socket: socket,
      loginTime: formatDate()
    }
    io.sockets.emit('logged', nikname)
  })

  socket.on('disconnect', () => {
    let nikname = socket?.nikname
    if (nikname && users[nikname]) {
      delete users[nikname]
      io.sockets.emit('logout', nikname)
    }
  })

  // 修正核心：处理消息发送逻辑
  socket.on('send', (data) => {
    // 后端可以接收前端传的 msg（兼容旧逻辑），也可以接收完整对象
    const msg = typeof data === 'string' ? data : data.msg;
    const msgTime = formatDate();
    const sendData = {
      nikname: socket.nikname, // 关键：字段名改为 nikname，与前端一致
      msg: msg,
      time: msgTime
    };

    // 1. 向其他客户端广播消息（除了发送者）
    socket.broadcast.emit('chat', sendData);
  })

})

webSocketServer.listen(8889, () => {
  console.log('websocket聊天室开启 端口8889')
})

module.exports = webSocketServer