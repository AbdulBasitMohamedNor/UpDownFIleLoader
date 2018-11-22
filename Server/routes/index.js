var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express()
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const Grid = require('gridfs-stream')
const methodOverRide = require('method-override')
const GridfsStorage = require('multer-gridfs-storage')


//const mongoURL = 'mongodb://Abdulbasit:akunamatata99@ds029456.mlab.com:29456/basit'
const mongoURL = 'mongodb://localhost:27017/fileUploadxxxx'

const conn = mongoose.createConnection(mongoURL)

var gfs = ''
conn.once('open', () => {
  console.log('Database connected')
  //Initialize Stram
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})
//Initialize Storage Engine
var storage = new GridfsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});


/* GET home page. */
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).render('index',{files:false})
    } else if (err) return res.json(err)
    else{
      files.map(file=>{
        if(file.contentType.includes('image')){
          file.isImage = true
        }
        else
        file.isImage = false
      })
      res.render('index',{files:files})
    }
  })
})

/*
 @route: /upload
 desc: uploading file to db
*/
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({file:req.file})
res.redirect('/')
})
/*
@route: /files
desc: get all files from database
*/

router.get('/files', (req, res) => {
 gfs.files.find().toArray((err, files) => {
   if (!files || files.length === 0) {
     return res.status(404).json({
       err: 'No files exist'
     })
   } else if (err) return res.json(err)
   else
     return res.json(files)
 })
})
/*
@route: /files/filename
desc: get single file from database
*/

router.get('/file/:filename', (req, res) => {
 gfs.files.findOne({
   filename: req.params.filename
 }, (err, file) => {
   if (!file) return res.status(404).json({
     err: 'File not exists'
   })
   else if (err) return res.json(err)
   else
     return res.json(file)
 })
})
/*
@route: /image/filename
desc: get single image from database and render as image
*/
router.get('/image/:filename', (req, res) => {
 gfs.files.findOne({
   filename: req.params.filename
 }, (err, file) => {
   if (!file) return res.status(404).json({
     err: 'File not exists'
   })
   else if (err) return res.json(err)
   else {
     if (file.contentType.includes('image')){
      const readStream = gfs.createReadStream(file.filename)
      readStream.pipe(res)
    }
    else if (file.contentType.includes('pdf')) {
       const readStream = gfs.createReadStream(file.filename)
       readStream.pipe(res)
     }
     else
     {
       res.status(404).json({err:'Not an image'})
     }
   }
 })
})
/*
@route: /file/filename
desc: get a file from database and render as image
*/
router.get('/getfile/:filename', (req, res) => {
 gfs.files.findOne({
   filename: req.params.filename
 }, (err, file) => {
   if (!file) return res.status(404).json({
     err: 'File not exists'
   })
   else if (err) return res.json(err)
   else {
       const readStream = gfs.createReadStream(file.filename)
       readStream.pipe(res)
   }
 })
})

/*
@route /files/:id DELETE
@desc delete a file from DB
*/
router.delete('/files/:id',(req,res)=>{
 gfs.remove({_id:req.params.id,root:'uploads'},(err,gridStorage)=>{
   if(err)
   return res.status(404).json({err:err})
 })
 res.redirect('/')
})


module.exports = router;
