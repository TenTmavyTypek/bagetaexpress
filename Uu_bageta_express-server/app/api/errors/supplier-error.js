"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const SUPPLIER_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}supplier/`;

const Create = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}create/`,
  SupplierDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SupplierDoesNotExist`;
      this.message = "Supplier does not exists.";
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
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}update/`,
  SupplierDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}SupplierDoesNotExist`;
      this.message = "Supplier does not exists.";
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

const Get = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}get/`,
  SupplierDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}SupplierDoesNotExist`;
      this.message = "Supplier does not exists.";
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

const Delete = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}delete/`,
  SupplierDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}SupplierDoesNotExist`;
      this.message = "Supplier does not exists.";
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

const GetList = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}getList/`,
  SupplierDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetList.UC_CODE}SupplierDoesNotExist`;
      this.message = "Supplier does not exists.";
    }
  },
};

module.exports = {
  GetList,
  Delete,
  Get,
  Update,
  Create,
};
