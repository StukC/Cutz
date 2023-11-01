const router = require("express").Router();
const {
  SendOtp,
  VerifyOtp,
  ResetPassword,
} = require("../controller/forgetpasswordadmin");

router.route("/sendotp").post(SendOtp);
router.route("/verifyotp").post(VerifyOtp);
router.route("/resetpass").post(ResetPassword);

module.exports = router;
