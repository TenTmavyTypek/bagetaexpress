"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { BinaryComponent, AppBinaryStoreError } = require("uu_appbinarystoreg02");
const Errors = require("../api/errors/item-error.js");

const WARNINGS = {
  unsupportedKeys: {
    CODE: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class ItemAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("item");
    this.binaryComponent = new BinaryComponent();
  }

  async getImage(awid, dtoIn, session, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemGetImageDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    const image = await this.binaryComponent.getData(awid, { code: dtoIn.code }, session);

    if (!image) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { itemid: dtoIn.itemId });
    }

    return image;
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemListDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.List.InvalidDtoIn
    );

    let items = await this.dao.list(awid, dtoIn.supplierId);

    if (!items) {
      throw new Errors.List.ItemDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...items,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, session, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Update.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.itemId);

    if (!item) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { itemid: dtoIn.itemId });
    }

    let createBinaryDtoOut;
    try {
      try {
        await this.binaryComponent.delete(awid, { code: item.image }, session);
      } catch (e) {
        console.log(e);
      }
      createBinaryDtoOut = await this.binaryComponent.create(awid, { data: dtoIn.image }, session);
    } catch (e) {
      if (e instanceof AppBinaryStoreError) {
        console.error(e);
        throw new Errors.Create.createBinaryFailed({ uuAppErrorMap }, e);
      }
    }

    let itemDtoOut;
    try {
      itemDtoOut = await this.dao.update({ ...dtoIn, awid, image: createBinaryDtoOut.code });
    } catch (e) {
      throw new Errors.Update.ItemDoesNotExist({ uuAppErrorMap }, e);
    }

    return {
      ...itemDtoOut,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, session, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.itemId);

    if (!item) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { itemid: dtoIn.itemId });
    }

    return {
      ...item,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Delete.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.itemId);

    if (!item) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { itemid: dtoIn.itemId });
    }

    try {
      await this.dao.remove({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Delete.ItemCreateFailed({ uuAppErrorMap }, e);
    }
    return {
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, session, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Create.InvalidDtoIn
    );

    let createBinaryDtoOut = { code: null };

    try {
      createBinaryDtoOut = await this.binaryComponent.create(awid, { data: dtoIn.image }, session);
    } catch (e) {
      if (e instanceof AppBinaryStoreError) {
        throw new Errors.Create.createBinaryFailed({ uuAppErrorMap }, e);
      }
    }

    let itemDtoOut;
    try {
      itemDtoOut = await this.dao.create({ ...dtoIn, awid, image: createBinaryDtoOut.code });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...itemDtoOut,
      uuAppErrorMap,
    };
  }
}

module.exports = new ItemAbl();
