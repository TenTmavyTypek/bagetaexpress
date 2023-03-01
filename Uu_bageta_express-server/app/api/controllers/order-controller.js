"use strict";
const OrderAbl = require("../../abl/order-abl.js");

class OrderController {

  getList(ucEnv) {
    return OrderAbl.getList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  summary(ucEnv) {
    return OrderAbl.summary(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  confirm(ucEnv) {
    return OrderAbl.confirm(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return OrderAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return OrderAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return OrderAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return OrderAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new OrderController();
