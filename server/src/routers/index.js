import  FormRoutes from "./form.routes.js";
import  UserRoutes from "./user.routes.js";
import  route from "../constants/routes";
function routes(app) {
  app.use(route.FORM, FormRoutes);
  app.use(route.USER, UserRoutes);
}
module.exports = routes;
