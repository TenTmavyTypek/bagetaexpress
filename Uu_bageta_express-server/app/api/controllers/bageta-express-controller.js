"use strict";
const BagetaExpressAbl = require("../../abl/bageta-express-abl.js");

class BagetaExpressController {
  confirmOrder(ucEnv) {
    return BagetaExpressAbl.confirmOrder(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getOrder(ucEnv) {
    return BagetaExpressAbl.getOrder(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  deleteOrder(ucEnv) {
    return BagetaExpressAbl.deleteOrder(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  editOrder(ucEnv) {
    return BagetaExpressAbl.editOrder(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getItem(ucEnv) {
    return BagetaExpressAbl.getItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getMenu(ucEnv) {
    return BagetaExpressAbl.getMenu(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createOrder(ucEnv) {
    return BagetaExpressAbl.createOrder(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createItem(ucEnv) {
    return BagetaExpressAbl.createItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  init(ucEnv) {
    return BagetaExpressAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return BagetaExpressAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return BagetaExpressAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new BagetaExpressController();
