const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
// index.js 에  라우터 등록되어있음(/api/favorite)
router.post('/favoriteNumber', (req, res) => {
    
    // monogoDB에서 favorite 숫자가져오기
    Favorite.find({'movieId' : req.body.movieId})
        .exec((err, info) =>{
            if(err) return res.status(400).send(err);
            // 좋아요 개수만 넘기기
            // 그다음 프론트에 다시 넘겨주기
            res.status(200).json({ success: true, favorieNumber : info.length})
        })
})

module.exports = router;
