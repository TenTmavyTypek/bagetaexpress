"use strict";

const BagetaExpressUseCaseError = require("./bageta-express-use-case-error.js");
const PERMISSIONS_ERROR_PREFIX = `${BagetaExpressUseCaseError.ERROR_PREFIX}permissions/`;

const Get = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}get/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User does not exists.";
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

const Delete = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}delete/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User with userId does not exists.";
    }
  },
};

const GetList = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}getList/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User with permissions does not exists.";
    }
  },
};

const Update = {
  UC_CODE: `${PERMISSIONS_ERROR_PREFIX}update/`,
  PermissionsDoesNotExist: class extends BagetaExpressUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}permissionsDoesNotExist`;
      this.message = "User does not exists.";
    }
  },
};

module.exports = {
  Update,
  GetList,
  Delete,
  Create,
  Get,
};
