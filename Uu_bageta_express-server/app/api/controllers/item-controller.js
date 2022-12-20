"use strict";
const ItemAbl = require("../../abl/item-abl.js");

class ItemController {

  create(ucEnv) {
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ItemController();
