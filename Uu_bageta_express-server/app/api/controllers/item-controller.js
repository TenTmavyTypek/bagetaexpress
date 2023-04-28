"use strict";
const ItemAbl = require("../../abl/item-abl.js");

class ItemController {
  async getImage(ucEnv) {
    const dtoOut = await ItemAbl.getImage(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    return ucEnv.setBinaryDtoOut(dtoOut, ucEnv.parameters.contentDisposition);
  }
  list(ucEnv) {
    return ItemAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return ItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
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
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ItemController();
