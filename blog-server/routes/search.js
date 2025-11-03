const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Article = require('../models/Article')
const assert = require('http-assert');
const {pagination} =require('../core/util/util')
const POPULATE_MAP = require('../plugins/POPULATE_MAP')

/*
    文章搜索 search API
*/
router.get('/', async (req, res, next) => {
    
    let q = req.query.query
    let regExp = new RegExp(q, 'i')
    try {
        let page = 1, size = 100,dis = 8 
        let populate = POPULATE_MAP['Article']
        let result={}
        result.list = await Article.find({
            $or: [
                { title: { $regex: regExp } },
                { body: { $regex: regExp } }
            ],
        }).populate(populate)
        result.page=req.query.page||1;
        result.size=req.query.size||100;
        result.display=req.query.display||8;
        assert(result, 400)
        
        console.log(result)
        res.send(200, {
            message: '查询成功',
            data: result
        })
    } catch (err) {
        next(err)
    }

});



module.exports = router;
