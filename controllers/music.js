const musicModel = require('../models/music')
const path = require('path'); 
function optUpload(ctx){
    let {file,filelrc} =  ctx.request.files
    let {title,singer,time} = ctx.request.body
    let saveSingObj = {
        title,singer,time
    }
    if(filelrc){
        saveSingObj.filelrc = ('/public/files/' + path.parse(filelrc.path).base)
    }else{
        saveSingObj.filelrc = 'no file'
    }
    if(!file){
        ctx.throw('需要上传歌曲文件')
        return
    }
    saveSingObj.file = ('/public/files/' + path.parse(file.path).base)
    saveSingObj.uid = 1
    return saveSingObj
}
module.exports = {
    async addMusic(ctx,next){
        let saveSingObj  =await optUpload(ctx)
       let result = await musicModel.addMusicByObj(saveSingObj)
       if(result.affectedRows !=0){
        ctx.body = {
            code:001,
            msg:"ok"
        }
       }else{
        ctx.body = {
            code:002,
            msg:"no"
        }  
       }
    },
    async updateMusic(ctx,next){
        let saveSingObj  =await optUpload(ctx)
        let {id} = ctx.request.body
        saveSingObj = Object.assign(saveSingObj,{id})
        let result = await musicModel.updateMusic(saveSingObj)
        if(result.affectedRows ==0){
            ctx.throw('更新失败')
            return
        }
        ctx.body = {
            code:001,
            msg:"更新成功"
        }
    },
    async deleteMusic(ctx,next){
        let {id} = ctx.request.query
        let result = await musicModel.deleteMusicById(id)
        if(result.affectedRows ==0){
            ctx.throw('删除失败')
            return
        }
        ctx.body = {
            code:001,
            msg:"删除成功"
        }
    },
    async showEdit(ctx,next){
        let {id} = ctx.request.query
        let result = await musicModel.findMusicById(id)
        if(result.length === 0){
            ctx.throw('歌曲不存在')
            return
        }
        let music = result[0]
        ctx.render('edit',{music:music})
    },
    async showIndex(ctx,next){
        let uid = ctx.session.user.id
        let musics = await musicModel.findMusicByUid(uid)
        ctx.render('index',{musics:musics})
    },
    async showAddMusic(ctx,next){
            ctx.render('add')
    }
}