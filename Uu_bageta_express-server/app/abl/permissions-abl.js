"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/permissions-error.js");

const WARNINGS = {
  unsupportedKeys: {
    CODE: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class PermissionsAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("permissions");
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("permissionsDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let permissions = await this.dao.get(awid, dtoIn.userId);
    if (!permissions) {
      throw new Errors.Update.permissionsDoesNotExist({ uuAppErrorMap });
    }

    try {
      await this.dao.remove({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("permissionsCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let permission;
    try {
      permission = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.PermissionsCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...permission,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("permissionsGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let user = await this.dao.get(awid, dtoIn.userId);

    return {
      hasPermissions: user ? true : false,
      isAdmin: user ? user.isAdmin : false,
      uuAppErrorMap,
    };
  }
}

module.exports = new PermissionsAbl();
