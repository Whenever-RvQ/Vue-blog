const express = require('express');
const router = express.Router();
const User = require('../models/User');
const assert = require('http-assert');
const Article = require('../models/Article');
/*
    POST 文章点赞
*/
router.post('/:id', async (req, res, next) => {

    try {
        let id = req.params.id
        let result = await Article.findByIdAndUpdate(id, {
            '$inc': {
                "like_num": 1
            }
        })
        console.log(result)
        assert(result, 400)
        res.send(200, {

            message: '已点赞',
            data: ++result.like_num


        })
    } catch (err) {
        next(err)
    }

});



module.exports = router;
