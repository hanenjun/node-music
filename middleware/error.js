module.exports = (options)=>{
    return async(ctx,next)=>{
        try {
            await next()
        } catch (error) {
            
            // ctx.render('error',{msg})
        }
    }
}