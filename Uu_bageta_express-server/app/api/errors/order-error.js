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
  OrderCreateFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}orderCreateFailed`;
      this.message = "Creating order by DAO method create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${ORDER_ERROR_PREFIX}update/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}orderDoesNotExist`;
      this.message = "Order with given PIN does not exist.";
    }
  },
};

const Delete = {
  UC_CODE: `${ORDER_ERROR_PREFIX}delete/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}orderDoesNotExist`;
      this.message = "Order with given PIN does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${ORDER_ERROR_PREFIX}get/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}orderDoesNotExist`;
      this.message = "Order with given id does not exist.";
    }
  },
};

const Confirm = {
  UC_CODE: `${ORDER_ERROR_PREFIX}confirm/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Confirm.UC_CODE}orderDoesNotExist`;
      this.message = "Order with given PIN does not exist.";
    }
  },
};

module.exports = {
  Init,
  Confirm,
  Get,
  Delete,
  Update,
  Create
};
