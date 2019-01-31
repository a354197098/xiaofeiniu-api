/*
*桌台相关路由器
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/**
 * 获取所有的桌台
 * [{tid:xxx,tname:'xxx...}]
 */
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_table ORDER BY tid',(err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})

/**
 * PUT  /admin/settings
 * 修改全局设置信息
 */
router.put('/',(req,res)=>{
    pool.query('UPDATE xfn_settings SET ?',req.body,(err,result)=>{
        if(err)throw err;
        res.send({code:200,msg:'settings updated succ'})
    })
})
