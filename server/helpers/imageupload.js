import multer from "multer";
import path from "path";
import validate from "../helpers/validate";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(
        null,
        req.body.title+validate.retSubstr()+path.extname(file.originalname));
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5
}

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }else{
        req.error = 'image';
        callback(null, false);
    }
}

const upload = multer({storage: storage,
    limits: limits,
    fileFilter: fileFilter
});

export default upload;