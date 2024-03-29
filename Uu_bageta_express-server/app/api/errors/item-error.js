"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const ITEM_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}item/`;

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
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  OrderCreateFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}itemDoesNotExist`;
      this.message = "Creating item by DAO method create failed.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
  createBinaryFailed: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}WrongInput`;
      this.message = "Error  while creating binary.";
    }
  },
};

const Get = {
  UC_CODE: `${ITEM_ERROR_PREFIX}get/`,
  ItemDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}itemDoesNotExist`;
      this.message = "Item with given id does not exist.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const Update = {
  UC_CODE: `${ITEM_ERROR_PREFIX}update/`,
  ItemDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}itemDoesNotExist`;
      this.message = "Item with given id does not exist.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const Delete = {
  UC_CODE: `${ITEM_ERROR_PREFIX}delete/`,
  ItemDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}itemDoesNotExist`;
      this.message = "Item with given id does not exist.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const List = {
  UC_CODE: `${ITEM_ERROR_PREFIX}list/`,
};

const GetImage = {
  UC_CODE: `${ITEM_ERROR_PREFIX}getImage/`,
};

module.exports = {
  GetImage,
  List,
  Init,
  Update,
  Get,
  Create,
  Delete,
};
