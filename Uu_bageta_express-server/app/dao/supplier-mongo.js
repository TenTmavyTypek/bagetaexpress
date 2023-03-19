"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SupplierMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async get(awid, supplierId) {
    let filter = {
      awid,
      supplierId,
    };
    return await super.findOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    const filter = {
      awid: uuObject.awid,
      supplierId: uuObject.userId,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      supplierId: uuObject.userId,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = SupplierMongo;