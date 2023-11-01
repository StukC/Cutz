const router = require("express").Router();
const { SignUpOwner, LoginOwner, GetOwner, UpdateOwner, DeleteOwner, GetAllOwners } = require('../controller/owner');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpOwner)
router.route('/login').post(LoginOwner)
router.route('/getall').get(GetAllOwners)
router.route('/').get(CheckUser, GetOwner).delete(CheckUser, DeleteOwner).patch(CheckUser, UpdateOwner)


module.exports = router