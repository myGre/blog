// 1.导入
let express = require("express");
let path = require("path");
let template = require("express-art-template");
let router = require("./router");
let bodyParser = require("body-parser");

// 2.创建app服务器
let app = express();

// 3.配置静态资源
app.use("/public/", express.static(path.join(__dirname, "public/")));
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules/")));
// 配置模板引擎
app.engine("html", template);
// 配置中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// app.get("/", function(req, res) {
//     // res.send("hello");
//     res.render("./index.html", {
//         cmt: "我是内容"
//     })
// })

// 5.将路由挂载到app服务器上
app.use(router);
// 4.监听
app.listen(3000, function() {
    console.log("running~~~~~~~");
})