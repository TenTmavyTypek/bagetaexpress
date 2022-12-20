"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/menu-error.js");

const WARNINGS = {

};

class MenuAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("menu");
  }

  async item(awid, dtoIn) {
    
  }

  async get(awid, dtoIn) {
    
  }

}

module.exports = new MenuAbl();
