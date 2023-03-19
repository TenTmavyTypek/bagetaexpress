"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const SUPPLIER_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}supplier/`;

const Create = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}create/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "Supplier does not exists.";
    }
  },
};

const Update = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}update/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "Supplier does not exists.";
    }
  },
};

const Get = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}get/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "Supplier does not exists.";
    }
  },
};

const Delete = {
  UC_CODE: `${SUPPLIER_ERROR_PREFIX}delete/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "Supplier does not exists.";
    }
  },
};

module.exports = {
  Delete,
  Get,
  Update,
  Create,
};
