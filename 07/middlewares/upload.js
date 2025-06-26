// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");
const uploadDir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${uploadDir}`,
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB로 파일사이즈 제한
  },
});
const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5); //최대 5개 파일까지 업로드 가능

module.exports = {
  uploadSingle,
  uploadMultiple,
};
