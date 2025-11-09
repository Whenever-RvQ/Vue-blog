const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const Comment = require('../models/Comment')

const createError = require('http-errors')
const assert = require('http-assert')
const app = require('../app')
const expressJwt = require('express-jwt')
const { getPublicKeySync } = require('../core/rsaControl')

const { pagination } = require('../core/util/util')

const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')
const RESOURCE_POST_MAP = require('../plugins/RESOURCE_POST_MAP')
const { model } = require('mongoose')

// /api/rest/:resource?query 
// /api/rest/users?query  users => User
// /api/rest/articles?query  articles => Article

//创建资源
router.post('/', async (req, res, next) => {


  try {

    let modelName = req.Model.modelName
    let body = req.body
    if (modelName in RESOURCE_POST_MAP) {
      body = RESOURCE_POST_MAP[modelName]['body'](body, req._id)
    }
    const model = await req.Model.create(body)
    console.log(model)
    if (modelName in POP_POST_MAP) {
      let handlers = POP_POST_MAP[modelName]
      //这里改写支持数组形式，因为涉及到对多个数据操作
      for (let handle in handlers) {
        let item = handlers[handle]
        let _id = model._id
        let { _refId, _model, queryAct, options, content } = item
        let refId = model?.[_refId]
        assert(refId, 422, `${_refId} not found`)
        await _model[queryAct](refId, options(_id))
      }
    }

    res.send(200, {
      message: '提交成功',
      data: model
    })
  } catch (err) {
    console.log(err)
    next(err || createError(400, '提交失败'))
  }
})

//更新资源
// /api/rest/articles/83827123/query?..
router.put('/:id', async (req, res, next) => {
  try {
    let putData = req.body
    let modelName = req.Model.modelName
    console.log(req.params)
    let id = req.params.id
    let updateData, result
    let isValidate = (modelName in POP_PUT_MAP)
    let data = await req.Model.findById(id)
    assert(isValidate, 400, "无权限修改，请联系管理员")
    // assert.equal(data[authField], userId,400, "无权限修改，请联系管理员")
    let { revisable } = POP_PUT_MAP[modelName]
    updateData = Object.fromEntries(Object.entries(putData).filter(([key, value]) => {
      return revisable.includes(key)
    }))

    updateData['date'] = new Date().toISOString()
    console.log(updateData)
    result = await req.Model.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
    console.log(result,'123')
    res.send(200, {
      message: '修改成功',
      data: result
    })



  } catch (err) {
    console.log(err)
    next(createError(400, '添加失败'))
  }

})

//删除资源
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'ok'
  })
})

//查询资源列表
router.get('/', async (req, res, next) => {
  let modelName = req.Model.modelName
  let { options = {}, page = 1, size = 100, query = '', populate = '', dis = 8 } = req.query
  // 注意这里使用 req.query 而不是 req

  console.log(query)
  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }
    let result = await pagination({ model: req.Model, query, options, populate, size, page, dis })
    console.log(result)
    res.send(200, {
      message: 'ok',
      data: result
    })
  } catch (err) {
    console.log(err)
    next(createError(422, "请求错误"))
  }
})

//查询资源详情
router.get('/:id', async (req, res) => {
  try {
    let modelName = req.Model.modelName
    let _id = req.params.id
    let result;
    let querys = req.Model.findById(_id)//此处使用await会导致返回的是一个document对象而不是mongoose query对象，document对象没有exec方法，返回的是一个promise对象才有exec方法

    if (modelName in POP_GET_MAP) {
      let { queryAct, options } = POP_GET_MAP[modelName]
      result = await req.Model[queryAct](_id, options(_id))
    }
    if (modelName in POPULATE_MAP) {
      let populates = POPULATE_MAP[modelName]
      result = await querys.populate(populates).exec()
      // res.send(result)
    }
    console.log(result)
    res.send(200, {
      message: '查询成功',
      data: result
    })
  } catch (err) {
    console.log(err)
  }


})


module.exports = router


/*
  响应

  response

  成功:
     GET: 200 OK
     POST: 201 Created
     PUT: 200 OK
     PATCH: 200 OK
     DELETE: 204 No Content

    获取多条
    {
      message: 'ok',
      data:{
        count: 返回条目数量
        list:[ //请求列表
          {},{},{}
        ]
      }
    }
    单条数据
    {
      message: 'ok',
      data: {数据内容}
    }
    操作反馈 更新 添加
    {
       message: '用户注册成功|数据更新成功|文章提交成功',
    }

  错误
    statusCode
    400: 请求参数错误 请求路径错误
    401: jwt验证未通过 账号面错误
    403: 无权访问 权限不够
    404: 访问资源不存在 resource img file
    422: 用户不存在 密码错误 token过期

    {
      message:"响应错误文本"
    }
*/


/*
  setOptions
    new：bool-如果返回修改后的文档而不是原始文档，则为true。默认为false
    upsert：bool-创建对象（如果不存在）。默认为false。
    runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
    setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
    sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
    select：设置要返回的文档字段
    rawResult：如果为true，则返回MongoDB驱动程序的原始结果
    strict：覆盖此更新的架构的严格模式选项
 
*/
