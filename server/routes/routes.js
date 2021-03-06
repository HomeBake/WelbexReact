const Router = require('express')
const tableController = require('../controllers/tableController')
const router = new Router

//Энд-поинты

router.get('/rows',tableController.getRows)
router.post('/rows/edit',tableController.editRow)
router.delete('/rows/delete',tableController.deleteRow)
router.post('/rows/add',tableController.addRow)

module.exports = router