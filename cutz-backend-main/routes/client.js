const router = require("express").Router();
const { SignUpClient, LoginClient, GetClient, DeleteClient, UpdateClient, GetAllClients } = require('../controller/client')
const { CheckUser } = require('../middleware/checkuser')

router.route('/signup').post(SignUpClient)
router.route('/login').post(LoginClient)
router.route('/getall').get(GetAllClients)
// router.route('/forgetpassword').patch(ForgetPassword)
router.route('/:id').get(CheckUser, GetClient).delete(CheckUser, DeleteClient).patch(CheckUser, UpdateClient)


module.exports = router