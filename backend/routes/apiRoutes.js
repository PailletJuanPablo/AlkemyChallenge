const router = require('express').Router();
const record = require('.././controller/recordControllerApi');
const cors = require('cors')

router.get('/record', cors(), record.getAll)
router.get('/recordsome', cors(), record.getSome)
router.get('/balance', cors(), record.getBalance)
router.get('/record/:id', cors(), record.getOne)
router.post('/record', cors(), record.createRecord);
router.put('/record/:id', cors(), record.modifyRecord)
router.delete('/record/:id', cors(), record.deleteOne)

module.exports = router;