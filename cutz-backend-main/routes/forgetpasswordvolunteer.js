const router = require("express").Router();
const { SendOtp, VerifyOtp, ResetPassword } = require('../controller/forgetpasswordvolunteer')
// const { CheckUser } = require('../middleware/checkuser')

router.route('/sendotp').post(SendOtp)
router.route('/verifyotp').post(VerifyOtp)
router.route('/resetpass').post(ResetPassword)
// router.route('/:id').get(GetSingleOrganization).patch(UpdateOrganization).delete(DeleteOrganization)


module.exports = router