"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");

const WARNINGS = {

};

class ItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("bageta-express");
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.id);

    if (!item) {
      throw new Errors.Update.ItemDoesNotExist({ uuAppErrorMap }, { itemId: dtoIn.id });
    }
    
    let itemDtoOut;
    try {
      itemDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...itemDtoOut,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.id);

    if (!item) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { itemId: dtoIn.id });
    }

    return {
      ...item,
      uuAppErrorMap,
    };
  }
  
  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.id);

    if (!item) {
      throw new Errors.Update.ItemDoesNotExist({ uuAppErrorMap }, { itemId: dtoIn.id });
    }

    try{
      await this.dao.remove({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap}, e);
    }
    return {
      uuAppErrorMap,
    };
  }

  async getMenu(awid, dtoIn) {
    return;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
    
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let itemDtoOut;
    try {
      itemDtoOut = await this.dao.create({ ...dtoIn, awid });
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
