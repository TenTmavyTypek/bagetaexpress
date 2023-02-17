"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/order-error.js");
const gpc = require("generate-pincode");

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

    let order = await this.dao.get(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Update.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
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

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let order;
    if (dtoIn.pin) {
      order = await this.dao.getWithPin(awid, dtoIn.pin);
    } else order = await this.dao.getWithId(awid, dtoIn.userId);

    if (!order) {
      throw new Errors.Get.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
    }

    return {
      ...order,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let order = await this.dao.get(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Update.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
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

    let order = await this.dao.get(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Update.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
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

  async create(awid, dtoIn, uuAppErrorMap = {}, orderState, pin) {
    orderState = "inProgress";
    //pin generator, loop for checking if generated pin already exists and is in the inProgress state
    let order;
    do {
      pin = gpc(4); //generates 4 digit pin code
      order = await this.dao.get(awid, pin);
      /*console.log(order); //checks value of the order*/
    } while (order);

    let validationResult = this.validator.validate("orderCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.create({ ...dtoIn, awid, orderState, pin });
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
