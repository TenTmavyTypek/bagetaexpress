"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const ORDER_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}order/`;

const Create = {
  UC_CODE: `${ORDER_ERROR_PREFIX}create/`,
  
};

const Update = {
  UC_CODE: `${ORDER_ERROR_PREFIX}update/`,
  
};

const Delete = {
  UC_CODE: `${ORDER_ERROR_PREFIX}delete/`,
  
};

const Get = {
  UC_CODE: `${ORDER_ERROR_PREFIX}get/`,
  
};

const Confirm = {
  UC_CODE: `${ORDER_ERROR_PREFIX}confirm/`,
  
};

module.exports = {
  Confirm,
  Get,
  Get,
  Delete,
  Update,
  Create
};
