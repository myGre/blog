// 1.下载并导入
let mongoose = require("mongoose");
// 2.连接数据库
mongoose.connect("mongodb://localhost/blog");
// 3.储存Schema构造函数
let Schema = mongoose.Schema;
// 4.设计文档结构
let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意：千万不要加括号，会在new的时候立即执行并调用，所以只需要写方法名，当用户没有传递这个值时，mongoose就会调用default指定的Date.now方法，其返回值就会作为默认值
        default: Date.now
    },
    last_time: {
        type: Date,
        default: Date.now
    },
    // 默认头像
    user_pic: {
        type: String,
        default: '/public/img/avatar-max-img.png'
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
})

// 创建模型
module.exports = mongoose.model('User', userSchema);