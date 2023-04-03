"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class OrderMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async list(awid) {
    const filter = {
      awid: awid,
      orderState: { $in: ["inProgress"] },
    };
    return await super.find(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getWithId(awid, id, state) {
    const filter = {
      awid: awid,
      userId: id,
      orderState: { $in: [state] },
    };
    if (state === undefined) delete filter["orderState"];
    return await super.findOne(filter);
  }

  async getWithPin(awid, pin, state) {
    const filter = {
      awid: awid,
      pin: pin,
      orderState: { $in: [state] },
    };
    if (state === undefined) delete filter["orderState"];
    return await super.findOne(filter);
  }

  async getInProgress(awid) {
    const filter = {
      awid: awid,
      orderState: { $in: ["inProgress"] },
    };
    return await super.findOne(filter);
  }

  async updateToUnclaimed(awid) {
    const filter = {
      awid: awid,
      orderState: { $in: ["inProgress"] },
    };
    return await super.findOneAndUpdate(filter, { orderState: "unclaimed" }, "NONE");
  }

  async update(uuObject) {
    const filter = {
      awid: uuObject.awid,
      //id: uuObject.orderId,
      pin: uuObject.pin,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    const filter = {
      awid: uuObject.awid,
      pin: uuObject.pin,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = OrderMongo;
