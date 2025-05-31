const express = require('express');
const router = express.Router();
const {createProperty,getProperty , getPropertyById, updateProperty, deleteProperty}  = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

//public routes
router.get('/', getProperty);
router.get('/:id', getPropertyById);

//protected routes
router.post('/' ,protect ,createProperty);
router.delete('/:id',protect, deleteProperty);
router.put('/:id',protect, updateProperty);

module.exports=router;
