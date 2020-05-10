const Koa = require('koa')
const app = new Koa()
// const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const path = require('path')
const fs = require('fs')
const static = require('koa-static')
const session = require('koa-session')
const formidable = require('koa-formidable')
const musicRouter = require('./routers/music')
const userRouter = require('./routers/user')
let {
    appPort,
    uploadDir,
    staticDir,
    viewDir
} = require('./config')
render(app, {
    root: viewDir,
    debug: process.env.NODE_ENV !== 'production',
    extname: '.html'
})
app.use(formidable({
    uploadDir: uploadDir,
    keepExtensions: true
}))
app.use(require('./middleware/error')())
// app.use(bodyparser())

app.use(require('./middleware/rewrite')([
    {regex:/\/public(.*)/,dist:null},
    // {src:'/',dist:'/user/login'}
    {src:'/',dist:'/music/index'}
    
]))
let store = {
    storage: {

    },
    set: function (key, val) {
        this.storage[key] = val
    },
    get: function (key) {
        return this.storage[key]
    },
    destroy: function (key) {
        delete this.storage[key]
    }
}
app.keys = ['test']
app.use(session({
    store: store
}, app))
app.use(async(ctx,next)=>{
    ctx.state.user = ctx.session.user
    await next()
})
app.use(static(staticDir))

app.use(async (ctx,next)=>{
    if(ctx.request.url.startsWith('/user')){
        await next()
        return
    }
    if(ctx.request.url.startsWith('/music')){
        if(!ctx.session.user){
            ctx.url = '/user/login'
        await next()
        return
        }
        await next()
    }
})

app.use(userRouter.routes())
app.use(musicRouter.routes())

app.use(userRouter.allowedMethods())

app.listen(appPort, () => {
    console.log('服务器启动成功:端口' + require('./config').appPort)
})