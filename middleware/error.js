module.exports = (options)=>{
    return async(ctx,next)=>{
        try {
            await next()
        } catch (error) {
            let msg = error.message
            ctx.render('error',{msg})
        }
    }
}