import multer from "multer";
import fs from "fs";
import path from "path";

// Create folder if not exists
const tempFolder = "./public/temp";
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempFolder);
  },
  filename: function (req, file, cb) {
    // Unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({ storage });

















// import multer from "multer";

// const storage =multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, "./public/temp");
//     },
//     filename: function(req, file, cb){
//         cb(null, file.originalname);
//     },
// });

// export  const upload = multer({storage,});