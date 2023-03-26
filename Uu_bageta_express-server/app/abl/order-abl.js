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

  async getList(awid, uuAppErrorMap = {}) {
    const orders = await this.dao.list(awid);

    if (!orders) {
      throw new Errors.GetList.OrderDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...orders,
      uuAppErrorMap,
    };
  }

  async summary(awid, uuAppErrorMap = {}) {
    const orderList = await this.dao.list(awid);

    if (!orderList) {
      throw new Errors.Summary.OrderDoesNotExist({ uuAppErrorMap });
    }

    let totalSummary = {};
    orderList.itemList.forEach((order) =>
      order.orderContent.forEach((item) => {
        if (totalSummary[item.itemId]) {
          totalSummary[item.itemId] += item.numberOrdered;
          return;
        }
        totalSummary[item.itemId] = item.numberOrdered;
      })
    );

    let finalForm = [];
    Object.entries(totalSummary).forEach(([key, sum]) => finalForm.push({ itemId: key, numberOrdered: sum }));

    return {
      data: finalForm,
      uuAppErrorMap,
    };
  }

  async confirm(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("orderConfirmDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Confirm.InvalidDtoIn
    );

    let order = await this.dao.getWithPin(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Get.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
    }

    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Confirm.OrderConfirmFailed({ uuAppErrorMap }, e);
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
      Errors.Delete.InvalidDtoIn
    );

    let order = await this.dao.getWithPin(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Get.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
    }

    try {
      await this.dao.remove({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Delete.OrderDeleteFailed({ uuAppErrorMap }, e);
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
      Errors.Update.InvalidDtoIn
    );

    let order = await this.dao.get(awid, dtoIn.pin);

    if (!order) {
      throw new Errors.Get.OrderDoesNotExist({ uuAppErrorMap }, { pin: dtoIn.pin });
    }

    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Update.OrderUpdateFailed({ uuAppErrorMap }, e);
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
      if (dtoIn.pin) {
        order = await this.dao.getWithPin(awid, dtoIn.pin);
      } else order = await this.dao.getWithId(awid, dtoIn.userId);
      /*console.log(order); //checks value of the order*/
    } while (order);

    let validationResult = this.validator.validate("orderCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Create.InvalidDtoIn
    );

    let orderDtoOut;
    try {
      orderDtoOut = await this.dao.create({ ...dtoIn, awid, orderState, pin });
    } catch (e) {
      throw new Errors.Create.OrderCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...orderDtoOut,
      uuAppErrorMap,
    };
  }
}

module.exports = new OrderAbl();
