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
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
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
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
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
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
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
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
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
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Confirm.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const Summary = {
  UC_CODE: `${ORDER_ERROR_PREFIX}summary/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Summary.UC_CODE}orderDoesNotExist`;
      this.message = "Order with given PIN does not exist.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Summary.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const GetList = {
  UC_CODE: `${ORDER_ERROR_PREFIX}getList/`,
  OrderDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetList.UC_CODE}orderDoesNotExist`;
      this.message = "No order exists.";
    }
  },
  InvalidDtoIn: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetList.UC_CODE}WrongInput`;
      this.message = "Invalid input values.";
    }
  },
};

const UpdateUnclaimed = {
  UC_CODE: `${ORDER_ERROR_PREFIX}updateUnclaimed/`,
};

module.exports = {
  UpdateUnclaimed,
  GetList,
  Summary,
  Init,
  Confirm,
  Get,
  Delete,
  Update,
  Create,
};
