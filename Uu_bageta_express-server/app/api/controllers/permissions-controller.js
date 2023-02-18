"use strict";
const PermissionsAbl = require("../../abl/permissions-abl.js");

class PermissionsController {
  create(ucEnv) {
    return PermissionsAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return PermissionsAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PermissionsController();
