/**
 * 菜品类别相关路由
 */
//创建路由器
const express = require('express')
const pool = require('../../pool')
var router = express.Router()
module.exports = router

/*
*API: GET /admin/category 
*含义:客服端获取所有的菜品类别按编号升序
* [{cid:1,cname:'..'},{...}]
*/

router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err
        var jsonData = JSON.stringify(result)
        res.send(jsonData);
    })
})

/*
*API: DELETE /admin/category/:cid
*含义:根据表示菜品编号的路由参数,删除菜品
*{cid:200,msg: '1 category deleted'}
 {cid:400,msg: '0 category deleted'}
*/

router.delete('/:cid', (req, res) => {
    //删除菜品前先把类别设为NULL
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        //至此类别菜品更改完毕
        pool.query('DELETE FROM xfn_category WHERE cid=?', req.params.cid, (err, result) => {
            if (err) throw err;
            //获取DELETE语句在数据中影响的行数
            if (result.affectedRows > 0) {
                res.send({ cid: 200, msg: '1 category deleted' })
            } else {
                res.send({ cid: 400, msg: '0 category deleted' })
            }
        })
    })
})


/*
*API: POST /admin/category/:cid
*请求参数:{cname:'xxx'}
*含义:添加新的菜品类别
*{cid:200,msg: '1 category added',cid :x}
*/

router.post('/',(req,res)=>{
    var data = req.body;
    pool.query('INSERT INTO xfn_category SET ?',data,(err,result)=>{
        if(err)throw err;
        res.send({cid:200,msg: '1 category added'})
    })
})

/**
*API: PUT /admin/category
*请求参数:{cid:xx,cname:'xxx'}
*含义:根据菜品类别编号修改该类别
*{coed:200,msg: '1 category modified'}
*{coed:400,msg: '0 category modified,not exists'}
*{coed:401,msg: '0 category modified,no modification'}
*/

router.put('/',(req,res)=>{
    var data = req.body;
    pool.query('UPDATE xfn_category SET ? WHERE cid=?', [data,data.cid],(err,result)=>{
        if(err)throw err;
        console.log(result)
        if(result.changedRows>0){
            //实际更新了一行
            res.send({coed:200,msg: '1 category modified'})
        }else if(result.affectedRows==0){
            res.send({coed:400,msg: 'category not exits'})
        }else if(result.affectedRows==1 && result.changedRows==0){
            //影响到一行 修改0行
            res.send({coed:401,msg: 'no category modification'})
        }

    })
})