"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class OrderMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, pin) {
    let filter = {
      awid: awid,
      pin: pin,
      orderState: { $in: ["inProgress"] },
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      //id: uuObject.orderId,
      pin: uuObject.pin,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      //id: uuObject.orderId,
      pin: uuObject.pin,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = OrderMongo;
