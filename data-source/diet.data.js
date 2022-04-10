const { DietTypes, UserDietSchedules } = require("../models");
//importing sequlize connection
const db = require("../lib/sequlize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../lib/sequlize");

class Diet {
  constructor() {}

  //get all
  async getAllDietTypes() {
    return await DietTypes.findAll();
  }

  //save diet schedule
  async saveDietSchedule(insertData) {
    return await UserDietSchedules.create(insertData);
  }

  //list of all diet which are incomplete and ready to schedule
  async getSchedules() {
    return await db.sequelize.query(
      `
      select
          distinct(diet_time) ,
          u.email , u.id as user_id
      from
          user_diet_schedules uds
      inner join users u on
          u.id = uds.user_id
      where
          completed = false
          and diet_time >= now()`,
      {
        type: QueryTypes.SELECT,
      }
    );
  }

  //get data for Email Schedule

  async getDataForEmailSchedule(userId, dietTime) {
    __print("dietTime********", dietTime);
    return await db.sequelize.query(`select
	uds.item_name ,
	uds.diet_time :: text as diet_time ,
	uds.completed  :: text as status ,
	mdt.diet_type,
    u.email   
from
	user_diet_schedules uds
inner join master_diet_type mdt on
	mdt.id = uds.diet_type_id inner join users u on u.id =uds.user_id
where
	user_id = '${userId}' and uds.diet_time ='${dietTime}'`);
  }

  //get user diet schedule

  async dietSchedule(userId) {
    __print("userId*****", userId);
    return await db.sequelize.query(`select
	uds.item_name ,
	uds.diet_time ,
	uds.completed as status ,
	mdt.diet_type ,
    uds.id as schedule_id
from
	user_diet_schedules uds
inner join master_diet_type mdt on
	mdt.id = uds.diet_type_id
where
	user_id = '${userId}' and uds.completed =false `);
  }

  //update diet schedule
  async updatedietSchedule(scheduleId) {
    __print("scheduleId*****", scheduleId);
    return await UserDietSchedules.update(
      {
        completed: true,
      },
      {
        where: {
          id: scheduleId,
        },
      }
    );
  }
  //get recommended diet items
  async recommendedDietItems(dietTypeId) {
    return await db.sequelize.query(`select
	mri.item_name as recommended_item_name , mri.id as recommended_item_id
from
	recommended_item_diet_type_mapping ridtm
inner join master_recommended_items mri on
	mri.id = ridtm.recommended_item_id 
where
	ridtm.diet_type_id = ${dietTypeId}  `);
  }
}

module.exports = new Diet();
