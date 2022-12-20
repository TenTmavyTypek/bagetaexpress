"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/order-error.js");

const WARNINGS = {

};

class OrderAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("order");
  }

  async confirm(awid, dtoIn) {
    
  }

  async get(awid, dtoIn) {
    
  }

  async delete(awid, dtoIn) {
    
  }

  async update(awid, dtoIn) {
    
  }

  async create(awid, dtoIn) {
    
  }

}

module.exports = new OrderAbl();
