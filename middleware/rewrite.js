module.exports = (options) => {
    return async (ctx, next) => {
        for (let i = 0; i < options.length; i++) {
            const rule = options[i];
            if (rule.regex) {
                let result = rule.regex.exec(ctx.url)
                if (result) {
                    if (!rule.dist) {
                        ctx.url = result[1]                    
                    }
                    if (rule.dist) {
                        ctx.url = rule.dist
                    }
                }
            }
            if (rule.src === ctx.url) {
                ctx.url = rule.dist
            }
        }
        await next()
    }
}