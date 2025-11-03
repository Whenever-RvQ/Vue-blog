const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')
const { decrypt, encrypt } = require('../core/util/util')
const jwt = require('jsonwebtoken') //token生成包  JWT
const { sendToken } = require('../core/sendToken')
const User = require('../models/User');
const createError = require('http-errors');
const assert = require('http-assert');


router.post('/', async (req, res, next) => {

  let { username, password } = req.body
  // +password 设置追加返回password内容 password Schema设置select为false时使用
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, "用户不存在")
    //校验密码
    assert.equal(decrypt(password), decrypt(user.password), 422, '账号密码错误')

    //生成token
    let token = await sendToken(user)
    res.send(200, {

      message: '登录成功',
      data: {
        userId: user._id,
        token: token
      }

    })
  } catch (err) {
    console.log(err)
    // next(createError(422,err))
    res.send(422,{
      message: err
    })
  }

  /*
     查询不到 user: null
       assert 触发 throw error(422,"用户不存在")
       进入catch next传递error到 错误处理中间件 返回错误响应
     查询到 user 不为null
       assert 不触发 跳过
       res.send(成功信息)
   */


  // let result = await userControl.verifyUser(username, pwd)
  // //如果验证账号密码失败
  // if (result.statusCode !== getUserStatusMsg('USER_INN')?.['statusCode']) {
  //   res.send(200, { ...result })
  //   return
  // }
  // console.log(result)
  // //如果验证成功 签发Token
  // if (result.statusCode === '4020' && result.data) {


  //   let backRes = getUserStatusMsg('USER_LOGIN')
  //   backRes.statusCode = 200
  //   res.send(200, {
  //     ...backRes,
  //     data: {
  //       token
  //     }
  //   })
  // }
});



module.exports = router;
