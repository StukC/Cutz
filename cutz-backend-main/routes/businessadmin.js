const router = require("express").Router();
const { SignUpBusinessAdmin, LoginBusinessAdmin, GetBusinessAdmin, UpdateBusinessAdmin, DeleteBusinessAdmin, GetAllBusinessAdmin } = require('../controller/businessadmin');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpBusinessAdmin)
router.route('/login').post(LoginBusinessAdmin)
router.route('/getall').get(GetAllBusinessAdmin)
router.route('/').get(CheckUser, GetBusinessAdmin).delete(CheckUser, DeleteBusinessAdmin).patch(CheckUser, UpdateBusinessAdmin)


module.exports = router