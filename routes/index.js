const glob = require("glob");

const initRoutes = (app) => {
  __print("***********inside init routes*************");
  const routers = glob.sync(__root_path(`/routes/*.route.js`));
  routers.forEach((route) => {
    __print("Route: ", route);
    require(route)(app);
  });
};

module.exports = { initRoutes };
