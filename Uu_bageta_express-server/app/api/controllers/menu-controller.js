"use strict";
const MenuAbl = require("../../abl/menu-abl.js");

class MenuController {

  item(ucEnv) {
    return MenuAbl.item(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return MenuAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new MenuController();
