/**
 * 管理员相关路由
 */
const express = require('express')
const pool = require('../../pool')
var router = express.Router()
module.exports = router


/**
 * API: GET /admin/login/:aname/:apwd
 * 
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 完成用户登录验证
 * {code:200,msg:'login succ'}
 * {code:400,msg'aname or apwd err'}
 */

 router.get('/login/:aname/:apwd',(req,res)=>{
    var aname = req.params.aname
    var apwd = req.params.apwd
    console.log(aname,apwd)
    //对密码加密操作
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:200,msg:'login succ'})
        }else{
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
 })

 /**
 * API: PATCH /admin/login
 * 请求数据：{aname:'xxx',oldPwd:'xxx',newPwd:'xxx'}
 * 根据管理员和密码修改管理员密码
 * {code:200,msg:'modified succ'}
 * {code:400,msg:'aname or apwd err'}
 * {code:401,msg:'apwd not modified'}
 */
router.patch('/',(req,res)=>{
    var data = req.body;
    //根据用户是否存在
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send({code:400,msg:'aname or apwd err'})
            return
        }
        //查询成功修改密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
            if(err)throw err;
            if(result.changedRows>0){
                res.send({code:200,msg:'modified succ'})
            }else{
                res.send({code:401,msg:'apwd not modified'})
            }
        })
    })
    
})