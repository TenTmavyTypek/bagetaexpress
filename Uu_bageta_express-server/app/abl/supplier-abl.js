"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/supplier-error.js");

const WARNINGS = {
  unsupportedKeys: {
    CODE: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class SupplierAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("supplier");
  }

  async getList(awid, uuAppErrorMap = {}) {
    const suppliers = await this.dao.list(awid);

    if (!suppliers) {
      throw new Errors.GetList.SupplierDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...suppliers,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("supplierDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let supplier = await this.dao.get(awid, dtoIn.supplierId);

    if (!supplier) {
      throw new Errors.Update.SupplierDoesNotExist({ uuAppErrorMap }, { supplierId: dtoIn.supplierId });
    }

    try {
      await this.dao.remove({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.SupplierCreateFailed({ uuAppErrorMap }, e);
    }
    return {
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("supplierGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let supplier = await this.dao.get(awid, dtoIn.supplierId);

    if (!supplier) {
      throw new Errors.Get.SupplierDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...supplier,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("supplierUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let supplier = await this.dao.get(awid, dtoIn.supplierId);

    if (!supplier) {
      throw new Errors.Update.SupplierDoesNotExist({ uuAppErrorMap }, { supplierid: dtoIn.supplierId });
    }

    let supplierDtoOut;
    try {
      supplierDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.SupplierCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...supplierDtoOut,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("supplierCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.CODE,
      Errors.Get.InvalidDtoIn
    );

    let supplier;
    try {
      supplier = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.SupplierCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...supplier,
      uuAppErrorMap,
    };
  }
}

module.exports = new SupplierAbl();
