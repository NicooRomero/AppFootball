const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
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
        
        const teamName = `${req.body.teamLeader}`;
        const uploadPath = path.join('public/uploads/teams/', teamName);
        
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
})

const upload = multer({ storage: storage });

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.post('/', upload.single('image'), teamController.addTeam);
router.post('/send-request', teamController.addPlayerTeam);
router.post('/accept-request', teamController.acceptJoinTeam);
router.put('/:id', upload.single('image'), teamController.updateTeam);
router.patch('/:id', teamController.removePlayerTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;