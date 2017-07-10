const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')

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
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
  }

  handleImageUpload() {
    return this.app.post('/admin/upload', upload.single('imageUpload'), (req, res) => {
      res.end(JSON.stringify({ imageTitle: req.body.imageTitle, imagePath: `/${req.file.path}` }))
    })
  }
  updateServerPlaylist() {
    return this.app.post('/admin/playlist-update', upload.array(), (req, res) => {
      fs.readFile('./public/user-data/showcase-media.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          const obj = JSON.parse(data)
          obj.playlist = req.body
          fs.writeFile('./public/user-data/showcase-media.json', JSON.stringify(obj), 'utf8', (err) => {
            if (err) {
              console.log(err)
            }
          })
        }
      })
      res.end('All Good Baby!')
    })
  }
}

module.exports = UploadMedia
