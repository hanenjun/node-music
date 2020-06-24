const db  = require('../models/db')
module.exports = {
    async addMusicByObj(saveSingObj){
        let data = Object.values(saveSingObj)
        console.log(data)
       return await db.q('insert into musics (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)',data)
    },
    async updateMusic(saveSingObj){
        let data = Object.values(saveSingObj)
        return await db.q('update musics set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id = ?',data)
    },
    async deleteMusicById(id){
      return  await db.q('delete from musics where id =? ',[id])
    },
    async findMusicById(id){
        return  await db.q('select * from musics where id = ?',[id])
    },
    async findMusicByUid(uid){
        return  await db.q('select * from musics where uid = ?',[uid])
    },
    async findFile(id){
        return  await db.q('select file from musics where id = ?',[id])
    },
    async findFileLrc(id){
        return  await db.q('select filelrc from musics where id = ?',[id])
    }
}