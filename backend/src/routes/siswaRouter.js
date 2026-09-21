const express = require('express');
const {getAll,create,update,getById,remove} = require('../controllers/siswaController')
const router = express.Router();

router.get('/',getAll);
router.post('/',create);
router.put('/:id',update);
router.get('/:id',getById);
router.delete('/:id',remove);

module.exports = router;