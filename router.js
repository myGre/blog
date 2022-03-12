// 1.导入
let express = require("express");
let User = require("./modules/user");
// 2.创建路由对象
let router = express.Router();

// 3.配置路由
// ① 渲染首页
router.get("/", function(req, res) {
    res.render("./index.html");
})
// ② 渲染登录页面
router.get("/login", function(req, res) {
    res.render("./login.html", {
        cmt: "内容"
    });
})
// ③ 处理登录请求
router.post("/login", function(req, res) {
    
})
// ④ 渲染注册页面
router.get("/register", function(req, res) {
    res.render("./register.html", {

    });
})
// ⑤ 处理注册请求
router.post("/register", function(req, res) {
    // 1.获取表单数据
    // console.log(req.body);
    let body = req.body;

    // 2.操作数据库
    // 判断如果邮箱或者用户名存在，不允许注册
    User.findOne({
        // 判断其中一个条件满足，账号存在
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    }, function(err, data) {
        // 查询失败
        if(err) return res.status(500).json({
            code: 1005,
            message: '服务器繁忙， 请稍后重试'
        })

        // 查询成功，有数据
        // console.log(data + "OK!");
        if(data) {
            return res.status(200).json({
                code: 1001,
                message: '邮箱或昵称已存在'
            })
        }

        // 查询成功，没数据
        // 添加数据并保存
        new User(body).save(function(err, user) {
            if(err) return res.status(500).json({
                code: 1005,
                message: '服务器繁忙， 请稍后重试'
            })
            // 说明注册成功，给前端发消息
            res.status(200).json({
                code: 1000,
                message: 'OK!'
            })// 给前台必须发送json数据，express提供的json()方法

            // 重定向首页
            // res.redirect('/');// 异步请求，重定向没用，这个只针对于同步请求
        })
    })
})

// 4.导出路由对象
module.exports = router;