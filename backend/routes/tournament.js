const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Tipo de imagen no válido. Solo se aceptan png/jpeg/jpg.');

        if (isValid) {
            uploadError = null
        }
        console.log(file);
        
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
        const fileName = file.originalname;
        const noExtName = fileName.slice(0, fileName.lastIndexOf('.'));
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${noExtName}.${extension}`)
    }
});

const upload = multer({ storage: storage });

router.get('/', tournamentController.getTournaments);
router.get('/:id', tournamentController.getGame);
router.get('/fixture/:id', tournamentController.getFixture);
router.post('/teams/reset', tournamentController.resetTeamsValues);
router.put('/:id', tournamentController.updateGame);
router.put('/delete/fixture/:id', tournamentController.deleteFixture);
router.post('/fixture/:id', tournamentController.setFixture);
router.post('/', upload.single('image'), tournamentController.addTournament);
router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;