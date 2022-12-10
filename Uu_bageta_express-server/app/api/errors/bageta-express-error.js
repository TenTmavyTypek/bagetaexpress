"use strict";
const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");

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

const CreateItem = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}createItem/`,
  
};

const CreateOrder = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}createOrder/`,
  
};

const GetMenu = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}getMenu/`,
  
};

const GetItem = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}getItem/`,
  
};

const EditOrder = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}editOrder/`,
  
};

const DeleteOrder = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}deleteOrder/`,
  
};

const GetOrder = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}getOrder/`,
  
};

const ConfirmOrder = {
  UC_CODE: `${BAGETA_EXPRESS_ERROR_PREFIX}confirmOrder/`,
  
};

module.exports = {
  ConfirmOrder,
  GetOrder,
  DeleteOrder,
  EditOrder,
  GetItem,
  GetMenu,
  CreateOrder,
  CreateItem,
  Init,
};
