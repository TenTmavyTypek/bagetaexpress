"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const PERMISSIONS_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}permissions/`;

const Get = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}get/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User with userId does not have Permissions.";
    }
  },
};

const Create = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}create/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User with userId does not have Permissions.";
    }
  },
};

module.exports = {
  Create,
  Get,
};
