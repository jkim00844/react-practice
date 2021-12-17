const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User' // 이걸로 user 정보를 가져올수있음
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
},  {timestamps: true})


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }