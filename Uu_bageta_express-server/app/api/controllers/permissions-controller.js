"use strict";
const PermissionsAbl = require("../../abl/permissions-abl.js");

class PermissionsController {

  getList(ucEnv) {
    return PermissionsAbl.getList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return PermissionsAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    return PermissionsAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return PermissionsAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PermissionsController();
