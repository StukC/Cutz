const router = require("express").Router();
const { UploadImage } = require('../controller/upload');
const multer = require("multer");

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});


const upload = multer({
    storage: storageEngine,
});


router.route('/').post(upload.single("image"), UploadImage)


module.exports = router