"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const MENU_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}menu/`;

const Get = {
  UC_CODE: `${MENU_ERROR_PREFIX}get/`,
  
};

const Item = {
  UC_CODE: `${MENU_ERROR_PREFIX}item/`,
  
};

module.exports = {
  Item,
  Get
};
