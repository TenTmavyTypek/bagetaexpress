"use strict";
const ItemAbl = require("../../abl/item-abl.js");

class ItemController {

  getMenu(ucEnv) {
    return ItemAbl.getMenu(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ItemController();
