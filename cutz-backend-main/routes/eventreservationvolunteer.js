const router = require("express").Router();
const {
  CreateEventReservation,
  GetEventReservations,
  GetSingleEventReservation,
  UpdateEventReservation,
  DeleteEventReservation,
  GetAllEventReservations,
} = require("../controller/eventreservationvolunteer");
const { CheckUser } = require("../middleware/checkuser");
const {
  GetAllEventReservationsByUserId,
} = require("../controller/eventreservationclient");

router
  .route("/")
  .post(CheckUser, CreateEventReservation)
  .get(CheckUser, GetEventReservations);
router.route("/getall").get(GetAllEventReservations);
router.route("/reservations").get(CheckUser, GetAllEventReservationsByUserId);
router
  .route("/:id")
  .get(CheckUser, GetSingleEventReservation)
  .patch(CheckUser, UpdateEventReservation)
  .delete(CheckUser, DeleteEventReservation);

module.exports = router;
