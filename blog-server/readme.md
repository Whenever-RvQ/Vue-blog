# express 注册登录案例

>  实现 **前后端分离**的注册登录案例, 实现 **RSA加密** **jwt-Token验证** **前端后端数据校验**

# server 服务端

### 接口

- 登录 login POST √
- 注册 register POST √
- 公钥获取 getPublicKey GET √
- 上传文件 upload POST
- 鉴权
    游客 无登录 无鉴权
      GET 
        articles
        comments
        key
        cloumns
        search
      POST
        comment
        admin/register
    用户 登录 鉴权
      GET 
        articles
        comments
        key
        cloumns
        search
      POST
        article
        upload 
        comment
        User
        admin/login

### 模块

- User管理模块 ['添加','查询','验证']
- Key管理模块 ['生成秘钥','获取公钥','加密','解密'] 
- jsonwebtoken ['创建Token']
- validate 内容校验模块 ['账号格式','密码格式','长度','必填','返回语']
- statusCode管理 自定义状态码 ['账号或密码错误','Token错误','Token失效','账号已存在','账号格式不正确','密码格式不正确','登录成功','注册成功']

### 中间件

- CORS 跨域 携带 Cookie
- express-JWT 验证Token



## client 客户端

### UI 

layerUI 



### 库

jQuery  axios  jsencrypt 



### 页面

login.html

index.html



### 业务流程

![image-20201121210644088](assets/image-20201121210644088.png)





### token

PAYLOAD:DATA

```
{
  "exp": ~~((Date.now() / 1000) + 24 * 3600 * 3), //过期时间
  "user_name": "kyogre", //用户名
  "user_id":"000000", //用户ID
  "iat": ~~(Date.now() / 1000), //签发时间
}
```

分页插件
```
npm install mongoose-sex-page
//调用
await pagination(req.Model).find(query).select(options).size(size).page(page).display(2).exec()

//返回
{
    "page": 1, //当前页码
    "size": 3, //当前页数据数量
    "total": 7, //数据总数量
    //数据list  list rows records
    "records": [
        {
            "avatar": "http://127.0.0.1:3000/public/images/avatar.jpg",
            "_id": "5fd8bc3eaac2672638f9d8dc",
            "username": "999Pyp",
            "nikname": "999皮炎平",
            "email": "999@153.com",
            "__v": 0
        },
        {
            "avatar": "http://127.0.0.1:3000/public/images/avatar.jpg",
            "_id": "5fd8cf96986d644200767c76",
            "username": "9991Pyp",
            "email": "123@123.com",
            "__v": 0
        },
        {
            "avatar": "http://127.0.0.1:3000/public/images/avatar.jpg",
            "_id": "5fd8d01274586c0d889e8dd1",
            "username": "999aAa",
            "email": "1231@23.com",
            "__v": 0
        }
    ],
    //总页数
    "pages": 3,
    // 
    "display": [
        1,
        2
    ]
}
```
##文件上传
 1. 用户头像 avatar  avatar
 2. 文章中的  article
 3. 文章封面  article


  

 所有文件上传前端都走单独接口 单独事件
 
 用户选择文件后 拖拽放入文件后 直接http 上传接口

 路由接收请求后 存储图片到 uploads文件夹

 接口 返回 此文件对应的 静态资源路径


  request query
    file: 文件
    uid: 用户_id  如果 params.classIfy是user 必须给uid



 文章 wangEditor
 插入图片 => http请求 返回url
 <img src=url>

 

 


```
  const storage = multer.diskStorage({
  // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
  destination (req, res, cb) {
    console.log(req.params['classify'].trim())
    const filePath = path.join(__dirname, './upload', req.params['classify'].trim())
    console.log(filePath)
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  filename (req, file, cb) {
      const { ext, base, name } = path.parse(file.originalname)
      cb(null, name + '-' + Date.now() + '.' + ext);
    }
  });
  const upload = multer({ storage })

  app.use('/upload/:classify', upload.single('file'), (req, res, next) => {
  console.log(req.file)
  console.log(req.params['classify'])
  next()
})
```


##API

登录 /admin/login
注册 /admin/register

获取公钥

资源
  /api/rest/:resource

  resource

列表接口 (分页)
  获取文章列表
  获取评论列表
  获取分类列表
  获取用户列表

