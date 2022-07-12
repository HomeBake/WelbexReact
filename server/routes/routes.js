const Router = require('express')
const tableController = require('../controllers/tableController')
const router = new Router

router.get('/rows',tableController.getRows)

module.exports = router