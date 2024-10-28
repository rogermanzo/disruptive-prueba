const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    },
});

var upload = multer ({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(
            file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
            file.mimetype == "application/msword" || // .doc
            file.mimetype == "text/plain" || // .txt
            file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            file.mimetype == "application/vnd.ms-excel" || // .xls
            file.mimetype == "application/vnd.ms-excel.sheet.macroEnabled.12" || // .xlsm
            file.mimetype == "application/pdf" || // .pdf
            file.mimetype == "video/x-matroska" || // .mkv
            file.mimetype == "video/mp4" || // .mp4
            file.mimetype == "video/avi" || // .avi
            file.mimetype == "image/jpeg" || // .jpg
            file.mimetype == "image/png" || // .png
            file.mimetype == "image/jpeg" || // .jpeg
            file.mimetype == "image/gif" // .gif
        ) {
            callback(null, true)
        } else {
            console.log('solo jpg, png');
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024// 5 MB 
    }
});

module.exports = upload;