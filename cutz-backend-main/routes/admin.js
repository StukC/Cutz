const router = require("express").Router();
const { SignUpAdmin, LoginAdmin, GetAdmin, UpdateAdmin, DeleteAdmin, GetAllAdmins } = require('../controller/admin');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpAdmin)
router.route('/login').post(LoginAdmin)
router.route('/getall').get(GetAllAdmins)
router.route('/:id').get(CheckUser, GetAdmin).delete(CheckUser, DeleteAdmin).patch(CheckUser, UpdateAdmin)



module.exports = router