const { decrypt, encrypt, generateKeys } = require('../core/util/util')
const fs = require('fs').promises
const { userPath } = require('../config')
const { getUserStatusMsg } = require('./statusControl')

module.exports = {
  //添加用户
  async addUser (username, pwd) {
    //TODO pwd 公钥加密
    let password = encrypt(pwd)

    //查看数据库是否存在同名用户 
    let user = await this.getUserInfo(username)

    //如果用户不存在
    if (user?.['tag'] === 'USER_NOF') {
      let userId = await getUsersNum()
      userId = ('000000' + userId).substr(-6)
      try {
        await appendUser({ user_id: userId, user_name: username, password })
        let resData = getUserStatusMsg('USER_ADD')
        resData.statusCode = 200
        return {
          ...resData,
          data: {
            user_id: userId, user_name: username
          }
        }
      } catch (err) {
        console.log(err)
      }

    }
    if (user?.['tag'] === 'USER_FOND') {
      return {
        ...getUserStatusMsg('USER_DR')
      }
    }

    return {
      statusCode: user.statusCode,
      errMsg: '注册失败'
    }
  },
  //获取用户信息
  async getUserInfo (username) {
    try {
      let users = await getUsers();
      let userInfo = users.find(item => item['user_name']?.trim() === username?.trim())

      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      return {
        ...getUserStatusMsg('USER_FOND'),
        data: {
          ...userInfo
        }
      }
    } catch (err) {
      console.error(err)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  //验证Token信息
  async verifyToken (username, userID) {
    console.log(username, userID)
    try {
      let users = await getUsers();
      let userInfo = users.find(item => item['user_id'].trim() === userID.trim())

      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }

      if (userInfo['user_name'] === username) {
        return {
          ...getUserStatusMsg('USER_FOND'),
        }
      }

    } catch (err) {
      console.error(err)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  //验证用户 账号密码
  async verifyUser (username, pwd) {
    let user = await this.getUserInfo(username)
    //如果不是查询成功
    if (user?.['tag'] !== 'USER_FOND') {
      return user
    }
    let { user_id, password, user_name } = user.data
    //验证密码 库中存储二次加密 和传输 一次加密 对比
    let isVerify = decrypt(decrypt(password.trim())) === decrypt(pwd.trim())

    if (isVerify) {
      return {
        ...getUserStatusMsg('USER_INN'),
        data: {
          user_id, user_name
        }
      }
    }
  }
}

async function getUsers () {
  let users = await fs.readFile(userPath, 'utf8')
  users = JSON.parse(users)
  return users
}

async function setUsers (users) {
  try {
    await fs.writeFile(userPath, JSON.stringify(users), 'utf8')
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

async function appendUser ({ user_id = false, user_name = false, password = false }) {
  let user = await getUsers()
  user.push({
    user_id, user_name, password
  })
  await setUsers(user)
  return true
}


async function getUsersNum () {
  let users = await getUsers()

  return users?.length
}