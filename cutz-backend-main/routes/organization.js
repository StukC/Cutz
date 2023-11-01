const router = require("express").Router();
const {
  CreateOrganization,
  GetOrganizations,
  GetSingleOrganization,
  UpdateOrganization,
  DeleteOrganization,
  GetAdminOrganizations,
} = require("../controller/organization");
// const { CheckUser } = require('../middleware/checkuser')

router.route("/").post(CreateOrganization).get(GetOrganizations);
router.route("/admin").get(GetAdminOrganizations);
router
  .route("/:id")
  .get(GetSingleOrganization)
  .patch(UpdateOrganization)
  .delete(DeleteOrganization);

module.exports = router;
