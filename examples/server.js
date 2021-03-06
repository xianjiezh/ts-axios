const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const router = express.Router()
const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})
router.post('/base/post', (req, res) => {
  res.json(req.body)
})
router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    console.log(buf.toJSON())
    res.json(buf.toJSON())
  })
})
router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.json({
      a: 1,
      b: 0,
    })
  }
})
router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.use('/extend', (req, res) => {
  res.json({
    method: req.method,
    path: req.path,
    data: req.body || req.params 
  })
})

router.use('/interceptor', (req, res) => {
  console.log(req.headers)
  res.json({
    method: req.method,
    path: req.path,
    data: req.body || req.params 
  })
})

app.use(router)
const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop\n`)
})