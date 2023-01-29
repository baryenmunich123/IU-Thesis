const UserService = require("../services/user.service");

module.exports = {
  getInfor: async (req, res) => {
    UserService.getInfor(req, res);
  },
  saveRecord: async (req, res) => {
    UserService.saveRecord(req, res);
  },
};
