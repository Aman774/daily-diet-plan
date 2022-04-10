const dietController = require("../controllers/diet.controller");

module.exports = (app) => {
  app
    .route("/v1/client/dietType/list")
    .get(dietController.getAllDietTypes.bind(dietController));

  app
    .route("/v1/client/save/diet/schedule")
    .post(dietController.saveDietSchedule.bind(dietController));

  app
    .route("/v1/client/diet/schedule/:userId")
    .get(dietController.DietSchedule.bind(dietController));

  app
    .route("/v1/client/update/diet/schedule/:scheduleId")
    .post(dietController.updatedietSchedule.bind(dietController));

  app
    .route("/v1/client/recommended/diet/items/:dietTypeId")
    .get(dietController.recommendedDietItems.bind(dietController));
};
