const db = require('./db')
module.exports = {
    getUsers:async()=>{
      let users =   await db.q('select * from users',[])
      return users
    },
    findUserByUsername:async(username)=>{
        let users = await db.q('select 1 from users where username = ?',username)
        return users
    },
    registerUsre:async( ...obj)=>{
        let users = await db.q('insert into users (username ,password ,email ,v_code ) values (?,?,?,?)',obj)
        return users
    },
    findUserDataByUsername:async(username)=>{
        let users = await db.q('select * from users where username = ?',username)
        return users
    },
}