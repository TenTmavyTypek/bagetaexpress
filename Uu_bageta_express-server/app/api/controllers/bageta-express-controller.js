"use strict";
const BagetaExpressAbl = require("../../abl/bageta-express-abl.js");

class BagetaExpressController {
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
