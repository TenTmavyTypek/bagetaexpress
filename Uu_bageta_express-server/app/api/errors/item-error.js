"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const ITEM_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}item/`;

const Create = {
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
