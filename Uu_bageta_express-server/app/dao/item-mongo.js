"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ItemMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async list(awid, id) {
    const filter = {
      awid: awid,
      supplierId: id,
    };
    return await super.find(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    const filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    const filter = {
      awid: uuObject.awid,
      id: uuObject.itemId,
    };
    delete uuObject["itemId"];
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    const filter = {
      awid: uuObject.awid,
      id: uuObject.itemId,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = ItemMongo;
