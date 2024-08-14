import express from 'express'
const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  return res.send('respond with a resource')
})

export default router
