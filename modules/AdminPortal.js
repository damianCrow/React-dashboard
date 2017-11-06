const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')
// const imagemin = require('imagemin')
// const imageminJpegtran = require('imagemin-jpegtran')
// const imageminPngquant = require('imagemin-pngquant')
const gm = require('gm')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/user-data')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

const imageFormatting = (file, processedFileName) => [
  new Promise((resolve) => {
    gm(file.path)
      .autoOrient()
      .noProfile()
      .resize('16', '9', '^')
      .gravity('Center')
      .crop('16', '9')
      .quality(10)
      .toBuffer('jpg', (error, buffer) => {
        // console.log(buffer.toString('base64'))
        resolve(buffer.toString('base64'))
      })
  }),
  new Promise((resolve, reject) => {
    gm(file.path)
      .autoOrient()
      .resize('32', '18', '^')
      .gravity('Center')
      .crop('32', '18')
      .quality(50)
      .write(`${file.destination}/thumbnail-${processedFileName}`, err => err ? reject() : resolve())
  }),
  new Promise((resolve, reject) => {
    gm(file.path)
      .autoOrient()
      .resize('1760', '990', '^')
      .gravity('Center')
      .crop('1760', '990')
      .quality(70)
      .write(`${file.destination}/${processedFileName}`, err => err ? reject() : resolve())
  }),
]

class AdminPortal {
  constructor(app, sockets) {
    this.app = app
    this.sockets = sockets
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    this.handleRequests()
  }

  handleRequests() {
    this.app.post('/admin/upload', upload.single('imageUpload'), (req, res) => {
      console.log('req.file', req.file)
      const processedFileName = `${Date.now()}-${req.file.originalname.substring(0, req.file.originalname.indexOf('.'))}-crop.jpg`
      Promise.all(imageFormatting(req.file, processedFileName))
        .then((preview) => {
          res.end(JSON.stringify({
            imageTitle: req.body.imageTitle,
            imagePath: `/${req.file.destination}/${processedFileName}`,
            preview: `data:image/jpeg;base64,${preview[0]}`,
          }))
        })
    })

    this.app.post('/admin/playlist-update', upload.array(), (req, res) => {
      fs.readFile('./public/user-data/showcase-media.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          const obj = JSON.parse(data)
          let count = 0

          obj.playlists.map((playlist, idx) => {
            if(req.body.overideQueue !== undefined) {
              Object.assign(playlist, {isCurrent: false})
            }
            
            if(playlist.id === req.body.playlist.id) {
              obj.playlists.splice(idx, 1, req.body.playlist)
            } else {
              count++

              if(count === obj.playlists.length) {
                obj.playlists.push(req.body.playlist)
              }
            }
          })
          fs.writeFile('./public/user-data/showcase-media.json', JSON.stringify(obj), 'utf8', (err) => {
            if (err) {
              console.log(err)
            } else {
              const activePlaylistItems = []
              req.body.playlist.data.forEach((item) => {
                if (item.hidden === false) {
                  activePlaylistItems.push(item)
                }
              })
              if(req.body.overideQueue) {
                this.sockets.emit('SOCKET_DATA_EMIT', { service: 'ADMIN', description: 'PLAYLIST', payload: { overideQueue: req.body.overideQueue, playlist: activePlaylistItems } })
              }
            }
          })
        }
      })
      res.end('All Good Baby!')
    })

    this.app.post('/admin/files-index-update', upload.array(), (req, res) => {
      fs.readFile('./public/user-data/uploaded-files-index.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          const obj = JSON.parse(data)
          obj.uploadedFiles.push(req.body)
          fs.writeFile('./public/user-data/uploaded-files-index.json', JSON.stringify(obj), 'utf8', (err) => {
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

module.exports = AdminPortal
