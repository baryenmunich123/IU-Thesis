const FormRoutes = require ("./form.routes.js");
const UserRoutes = require ("./user.routes.js");
const route = require ("../constants/routes.js");

module.exports = function routes(app) {
  app.use(route.Form, FormRoutes);
  app.use(route.USER, UserRoutes);
}
// module.exports = routes;
