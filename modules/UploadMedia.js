const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/user-data')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

class UploadMedia {

  constructor(app) {
    this.app = app
  }

  handleImageUpload() {
    this.app.post('/admin/upload', upload.single('imageUpload'), (req, res) => {
      res.send({ imageTitle: req.body.imageTitle, imagePath: req.file.path })
    })
  }
  updateServerPlaylist() {
    this.app.post('/admin/playlist-update', upload, (req, res) => {
      // fs.readFile('./public/user-data/showcase-media.json', 'utf8', (err, data) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     const obj = JSON.parse(data)
      //     obj.playlist.push({
      //       id: shortid.generate(),
      //       type: 'Image',
      //       title: req.body.imageTitle,
      //       url: `/${req.file.path}`,
      //       serviceId: '',
      //     })
      //     const updatedJson = JSON.stringify(obj)
      //     fs.writeFile('./public/user-data/showcase-media.json', updatedJson, 'utf8')
      //   }
      // })
      console.log(req.body)
      // res.status(200).send('All Good Baby!')
    })
  }
}

module.exports = UploadMedia
