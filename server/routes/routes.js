const Router = require('express')
const tableController = require('../controllers/tableController')
const router = new Router

router.get('/rows',tableController.getRows)
router.post('/rows/edit',tableController.editRow)
router.delete('/rows/delete',tableController.deleteRow)

module.exports = router