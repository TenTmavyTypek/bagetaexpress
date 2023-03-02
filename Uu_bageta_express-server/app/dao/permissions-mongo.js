"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PermissionsMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
  async list(awid) {
    return await super.find({ awid });
  }
  async get(awid, userId) {
    let filter = {
      awid,
      userId,
    };
    return await super.findOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      userId: uuObject.userId,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = PermissionsMongo;
