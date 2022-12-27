"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/order-error.js");

const WARNINGS = {
  unsupportedKeys: {
    CODE: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class OrderAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("order");
  }

  async confirm(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderConfirmDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderGetDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderDeleteDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let order = await this.dao.get(awid, dtoIn.id);

    if (!order) {
      throw new Errors.Update.OrderDoesNotExist({ uuAppErrorMap }, { orderId: dtoIn.id });
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

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderUpdateDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let order = await this.dao.get(awid, dtoIn.id);

    if (!order) {
      throw new Errors.Update.OrderDoesNotExist({ uuAppErrorMap }, { orderId: dtoIn.id });
    }
    
    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...orderDtoOut,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderCreateDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    
    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...orderDtoOut,
      uuAppErrorMap,
    };
  }

}

module.exports = new OrderAbl();
