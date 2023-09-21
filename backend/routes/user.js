const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Tipo de imagen no válido. Solo se aceptan png/jpeg/jpg.');

        if (isValid) {
            uploadError = null
        }

        const playerDoc = `${req.body.document}`;
        const uploadPath = path.join('public/uploads/players/', playerDoc);

        // if user folder already exist, update file
        if (fs.existsSync(uploadPath)) {

        //read old file
        oldFile = fs.readdirSync(uploadPath);
            
        //delete old file
        fs.unlinkSync(`${uploadPath}/${oldFile}`);

        //upload new file
        cb(uploadError, uploadPath)

        } else { //if user folder doesn't exist

        //make new user folder
        fs.mkdirSync(uploadPath)

        //upload new file
        cb(uploadError, uploadPath)
        }

    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // default
        //const fileName = `${req.body.name}_${req.body.lastname}`;
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${Date.now()}.${extension}`)
    }
})

const upload = multer({ storage: storage });

router.get('/', userController.getUsers);
router.get('/search/player', userController.searchUsers);
router.get('/:id', userController.getUser);
router.post('/', upload.single('image'), userController.addUsers);
router.post('/login', userController.loginUser);
router.post('/changePw/:id', userController.changePassword);
router.put('/:id', upload.single('image'), userController.editUser);
router.put('/set-state/:id', userController.setState);
router.delete('/:id', userController.deletePlayer);

module.exports = router;