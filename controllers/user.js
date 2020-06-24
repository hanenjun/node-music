const userModel = require('../models/user')
const captchapng2 = require('captchapng2')
module.exports = {  
    showRegister: async (ctx, next) => {
        // let users = await userModel.getUsers();
        // console.log(users);
        ctx.render('register');
    },
    checkUsername: async (ctx, next) => {
        let {
            username
        } = ctx.request.body
        let users = await userModel.findUserByUsername(username)
        if (users.length === 0) {
            ctx.body = {
                code: 001,
                msg: "注册成功"
            }
            return
        }
        ctx.body = {
            code: 002,
            msg: "注册失败"
        }
    },
    doRegister: async (ctx, next) => {
        let {
            username,
            password,
            email,
            v_code
        } = ctx.request.body
        console.log(ctx.session.v_code ,v_code)
       if(ctx.session.v_code !=v_code){
        ctx.body = {
            code: 002,
            msg: "验证码不同"
        }
        return
       }
        let users = await userModel.findUserByUsername(username)
        if (users.length != 0) {
            ctx.body = {
                code: 002,
                msg: "注册失败"
            }
            return
        }
        try {
            let result = await userModel.registerUsre(username, password, email, v_code)
            if (result.affectedRows != 0) {
                ctx.body = {
                    code: 001,
                    msg: "注册成功"
                }
            }
        } catch (e) {
            ctx.throw()
        }
    },
    doLogin: async (ctx, next) => {
        let {
            username,
            password
        } = ctx.request.body
        let result = await userModel.findUserDataByUsername(username)
        if (result.length === 0) {

            ctx.body = {
                code: 002,
                msg: '用户或密码错误'
            }
            return
        }
        let user = result[0]
        if (user.username == username && user.password == password) {
            ctx.session.user = user
            ctx.body = {
                code: 001,
                msg: "登入成功"
            }
            return
        } else {
            ctx.body = {

                code: 002,
                msg: "用户或密码错误"
            }
            return
        }
    },
    async getPic(ctx,next){
        let rand = parseInt(Math.random() * 9000 + 1000)
     let png =  new captchapng2(80,30,rand)
     ctx.session.v_code = rand+"";
     ctx.body = png.getBuffer()
    },
    async showLogin(ctx,next){
            ctx.render('login')
    },
    async userLogout(ctx,next){
        ctx.session.user = null
       ctx.redirect('/user/login')
    }
}