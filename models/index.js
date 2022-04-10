"use strict";
const db = require("../lib/sequlize");
module.exports = {
  Registration: db.users,
  DietTypes: db.master_diet_type,
  UserDietSchedules: db.user_diet_schedules,
};
