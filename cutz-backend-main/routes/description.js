const router = require("express").Router();
const {
  AddDescription,
  GetDescription,
  UpdateDescription,
} = require("../controller/description");
const { CheckUser } = require("../middleware/checkuser");

router
  .route("/")
  .post(CheckUser, AddDescription)
  .get(CheckUser, GetDescription);

router.route("/:id").put(CheckUser, UpdateDescription);

module.exports = router;
