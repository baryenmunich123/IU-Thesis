const FormService = require("../services/form.service.js");

module.exports = {
  _getFormList: async (req, res) => {
    FormService._getFormList(req, res);
  },
};
