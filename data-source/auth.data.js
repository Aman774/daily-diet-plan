const { Registration } = require("../models");
//importing sequlize connection
const db = require("../lib/sequlize");
const { QueryTypes } = require("sequelize");

class Auth {
  constructor() {}

  //storing users details
  async storeUser(insertData) {
    return await Registration.create(insertData);
  }

  //get user registration info
  async checkUserExists(email) {
    const user = await Registration.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    return user ? true : false;
  }

  //get user info
  async getUserInfo(userId) {
    return await Registration.findOne({
      where: {
        id: userId,
      },
    });
  }

  //update user status
  async updateUserStatus(userId) {
    await Registration.update(
      {
        is_active: true,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  //get userinfo using email
  async getUserInfoUsingEmail(email) {
    return await Registration.findOne({
      where: {
        email: email,
      },
    });
  }
}

module.exports = new Auth();
