const { registerSchema } = require("../utils/validation");

const validateRegister = (req, res, next) => {
  // registerSechema를 이용해서 입력데이터를 검증
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }
  next(); // 다음 미들웨어나 컨트롤러로 이동
};

module.exports = {
  validateRegister,
};
