import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express Server', welcom: 'callor.com Express' })
})

export default router
