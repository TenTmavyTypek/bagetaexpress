"use strict";
const ItemAbl = require("../../abl/item-abl.js");

class ItemController {

  update(ucEnv) {
    return ItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ItemAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getMenu(ucEnv) {
    return ItemAbl.getMenu(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }  
  
  delete(ucEnv) {
    return ItemAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }




}

module.exports = new ItemController();
