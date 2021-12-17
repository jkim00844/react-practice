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
            res.status(200).json({ success: true, favoriteNumber : info.length})
        })
})

router.post('/favorited', (req, res) => {

    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    // monogoDB에서 favorite 숫자가져오기
    Favorite.find({"movieId" : req.body.movieId,  "userFrom" : req.body.userFrom })
        .exec((err, info) =>{
            if(err) return res.status(400).send(err);
            
            let result = false;
            if(info.length !== 0 ){
                result = true;
            }
            // 그다음 프론트에 다시 넘겨주기
            res.status(200).json({ success: true, favorited : result })
        })
})

module.exports = router;
