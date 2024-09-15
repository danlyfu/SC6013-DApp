const express = require('express');
const { borrow, lend, repay } = require('../controllers/lendingController');
const router = express.Router();

router.post('/borrow', borrow);
router.post('/lend', lend);
router.post('/repay', repay);

module.exports = router;
