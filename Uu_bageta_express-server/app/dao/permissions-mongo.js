"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PermissionsMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
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
}

module.exports = PermissionsMongo;
