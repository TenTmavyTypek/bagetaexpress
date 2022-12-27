"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const ORDER_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}order/`;

const Init = {
  UC_CODE: `${BagetaExpressUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

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
  Init,
  Confirm,
  Get,
  Delete,
  Update,
  Create
};
