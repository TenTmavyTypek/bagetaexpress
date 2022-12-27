"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const ITEM_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}item/`;

const Create = {
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  
};

const GetMenu = {
  UC_CODE: `${ITEM_ERROR_PREFIX}getMenu/`,
  
};

const Get = {
  UC_CODE: `${ITEM_ERROR_PREFIX}get/`,
  
};

const Update = {
  UC_CODE: `${ITEM_ERROR_PREFIX}update/`,
  
};

const Delete = {
  UC_CODE: `${ITEM_ERROR_PREFIX}delete/`,

};

module.exports = {
  Update,
  Get,
  GetMenu,
  Create
};
