// const URLs = require(`../configs/urls`);
// const { makeAxiosPostRequestSync } = require(`../utils`);

const BasicHelper = require("../helpers/basic.helper");

const Auth = require("../data-source/auth.data");

const { emailService } = require("../other-services/nodemailer");

const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {
    this.errorResult = {
      error: "internal",
      errorMsg: "wrong",
      errorDesc: null,
      line: null,
      file: null,
      result: [],
    };
  }

  async signup(req, res) {
    __print(
      "********************************************* signup service ***********************************************"
    );
    try {
      __print("******body*********", req.body);
      const { email, password, first_name, last_name } = req.body;

      //email validation
      if (!BasicHelper.isValidEmail(email)) {
        return {
          error: "internal",
          errorMsg: "wrong",
          errorDesc: "not a valid email",
        };
      }
      // check if this email already exists in db

      const userExist = await Auth.checkUserExists(email);

      __print("user exists ", userExist);

      if (userExist) {
        return {
          error: "internal",
          errorMsg: "wrong",
          errorDesc: "email already exists",
        };
      }

      // convert password into hashcode

      const hashPassword = BasicHelper.hashPassword(password);
      __print("*******hashpassword*********", hashPassword);

      //storing the information in db
      const insertData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
      };

      const userInfo = await Auth.storeUser(insertData);

      __print("*****userinfo**********", userInfo);

      const token = BasicHelper.generateToken(userInfo.id);

      __print("**********token*****", token);

      const baseUrl = req.protocol + "://" + req.get("host");

      __print("base url*****", baseUrl);

      const data = {
        from: "noreply@gmail.com",
        to: email,
        subject: "Your Activation Link for YOUR APP",
        text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/v1/client/activateAccount/${userInfo.id}/${token}`,
        html: `<p>Please use the following link within the next 12 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/v1/client/activateAccount/${userInfo.id}/${token}" target="_blank">CLICK TO VERIFY</a></strong></p>`,
      };
      await emailService.sendMail(data, (err, info) => {
        if (err) {
          __print("email error", err);
          return;
        }
        __print("email info --", info);
      });

      return {
        successMsg: "accountActivateEmail",
        result: userInfo,
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async activateAccount(req, res) {
    __print(
      "********************************************* activateAccount service ***********************************************"
    );
    try {
      const decoded = await jwt.verify(req.params.token, SECRET);
      __print("decode --", decoded);

      //get user using user_id from jwt token
      const userInfo = await Auth.getUserInfo(decoded.userId);

      __print("userinfo*******", userInfo);

      if (!userInfo) {
        return {
          error: "internal",

          errorMsg: "wrong",
          errorDesc: "The token you provided is invalid",
        };
      } else {
        //update status of the user as is_active =true
        await Auth.updateUserStatus(userInfo.id);

        return {
          successMsg: "success",
          result: {
            message: "account activate successfully",
            userinfo: userInfo,
          },
        };
      }
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async login(req, res) {
    __print(
      "********************************************* login service ***********************************************"
    );
    try {
      __print("******body*********", req.body);
      const { email, password } = req.body;

      if (!email || !password) {
        return {
          error: "internal",
          errorMsg: "wrong",
          errorDesc: "email or password is missing",
        };
      }

      //email validation
      if (!BasicHelper.isValidEmail(email)) {
        return {
          error: "internal",
          errorMsg: "wrong",
          errorDesc: "not a valid email",
        };
      }

      const userInfo = await Auth.getUserInfoUsingEmail(email);
      __print("user_info*********", userInfo);
      //check email provide is correct or not
      if (!userInfo) {
        return {
          error: "internal",

          errorMsg: "wrong",
          errorDesc: "email you provided is incorrect",
        };
      }

      //check password provided is correct or not
      if (!BasicHelper.comparePassword(userInfo.password, password)) {
        return {
          error: "internal",

          errorMsg: "wrong",
          errorDesc: "password you provided is incorrect",
        };
      }

      const token = BasicHelper.generateToken(userInfo.id);
      userInfo.token = token;

      console.log("token***", token);
      const referesh_token = BasicHelper.generateToken(
        userInfo.id,
        process.env.REFERESH_SECRET_KEY
      );
      console.log("referesh token***", referesh_token);
      userInfo.referesh_token = referesh_token;

      return {
        successMsg: "success",
        result: {
          message: "login successfull",
          userinfo: { userInfo, token: token, referesh_token: referesh_token },
        },
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }
}
module.exports = new AuthService();
