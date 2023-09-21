const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
        
        const tournament = `${req.body.name}`;
        const uploadPath = path.join('public/uploads/tournaments/', tournament);
        
        // if team folder already exist, update file
        if (fs.existsSync(uploadPath)) {

        //read old file
        oldFile = fs.readdirSync(uploadPath);
            
        //delete old file
        fs.unlinkSync(`${uploadPath}/${oldFile}`);

        //upload new file
        cb(uploadError, uploadPath)

        } else { //if team folder doesn't exist

        //make new team folder
        fs.mkdirSync(uploadPath)

        //upload new file
        cb(uploadError, uploadPath)
        }

    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // default
        //const fileName = `${req.body.name}_${req.body.lastname}`;
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${req.body.name}-${Date.now()}.${extension}`)
    }
});

const upload = multer({ storage: storage });

router.get('/', tournamentController.getTournaments);
router.get('/:id', tournamentController.getFixture);
router.post('/fixture/:id', tournamentController.setFixture);
router.post('/', upload.single('image'), tournamentController.addTournament);

module.exports = router;