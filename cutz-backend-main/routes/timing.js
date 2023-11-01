const router = require("express").Router();
const {
  CreateTiming,
  GetTimings,
  GetSingleTiming,
  UpdateTiming,
  DeleteTiming,
  GetSingleTimingByEventId,
} = require("../controller/timing");
// const { CheckUser } = require('../middleware/checkuser')

router.route("/").post(CreateTiming).get(GetTimings);
router.route("/eventId/:id").get(GetSingleTimingByEventId);
router
  .route("/:id")
  .get(GetSingleTiming)
  .patch(UpdateTiming)
  .delete(DeleteTiming);

module.exports = router;
