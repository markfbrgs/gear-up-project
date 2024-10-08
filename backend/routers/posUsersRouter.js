const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const multer = require('multer'); 
const upload = multer();
const {
    getPosUsers,
    addPosUser,
    editPosUserName,
    editPosUserPassword,
    editPosUserStatus
} = require('../controllers/posUsersController');

router.get('/get-pos-users', verifyToken, checkRole('admin'), getPosUsers);

router.post('/add-pos-user', verifyToken, checkRole('admin'), upload.none(), addPosUser);

router.put('/edit-pos-name/:id', verifyToken, checkRole('admin'), upload.none(), editPosUserName);

router.put('/edit-pos-pass/:id', verifyToken, checkRole('admin'), upload.none(), editPosUserPassword);

router.put('/edit-pos-status/:id', verifyToken, checkRole('admin'), editPosUserStatus);

module.exports = router;