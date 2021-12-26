const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg")

//=================================
//             Video
//=================================

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.mp4') {
          return cb(res.status(400).end('only mp4 is allowed'), false);
      }
      cb(null, true)
  }
})

const upload = multer({ storage: storage }).single("file")


// index.js에서 prefix로 /api/video 붙였음.
router.post("/uploadfiles", (req, res) => {

  //비디오를 서버에 저장한다.
  upload(req, res, err => {
      if(err){
          return res.json({success:false, err})
      }

      return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
  })
});

router.post("/uploadVideo", (req, res) => {

  //비디오 정보들을 저장한다.
  const video = new Video(req.body)
  video.save((err, doc) => {
    if(err) return res.json({success:false, err})
    res.status(200).json({ success: true })
  })
  
});

router.post("/thumbnail", (req, res) => {

  let thumbsFilePath ="";
  let fileDuration ="";

  ffmpeg.ffprobe(req.body.url, function(err, metadata){
      console.dir(metadata);
      console.log(metadata.format.duration);

      fileDuration = metadata.format.duration;
  })


  // 썸네일 생성
  ffmpeg(req.body.url) // 비디오가 저장된 경로
  .on('filenames', function(filenames) { // filenames은 썸네일 파일 이름
    console.log(filenames);
    console.log('will generate ' + filenames.join(', '));

    filePath = "uploads/thumbnails/" + filenames[0];
  })
  .on('end', function() {
    console.log('Screenshots taken')
    return res.json({ success: true, url: filePath, fileDuration: fileDuration })
  })
  .on('err', function(err) {
    console.error(err)
    return res.json({ success: false, err });
  })
  .screenshots({
    count: 3, // 썸네일 3개 저장. Will take screens at 20%, 40%, 60% and 80% of the video
    folder: 'uploads/thumbnails',
    size:'320x240',
    // %b: input basename (filename w/o extension)
    filename: 'thumbnail-%b.png'
  })
});

module.exports = router;
