const FormRoutes = require ("./form.routes.js");
const TicketRoutes = require ("./ticket.routes.js");
// const UserRoutes = require ("./user.routes.js");
// const route = require ("../constants/routes.js");

module.exports = function routes(app) {
  app.use(FormRoutes);
  app.use(TicketRoutes);
  // app.use(route.USER, UserRoutes);
}
// module.exports = routes;
