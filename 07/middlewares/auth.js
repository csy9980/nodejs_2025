const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;
  // authorization : Beaerer eyxxxxxxx
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "not authorized" });
  }
  // 토큰 검증
  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "not authorized" });
    }
    req.user = user;
    next(); // 다음 미들웨어 또는 핸들러 함수로 이동
  });
};

module.exports = {
  authenticate,
};
