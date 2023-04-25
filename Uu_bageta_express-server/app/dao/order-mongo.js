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

  async get(awid, { userId, pin, state }) {
    const filter = {
      awid: awid,
      userId,
      pin,
      orderState: { $in: [state] },
    };

    if (state === undefined) delete filter["orderState"];
    if (userId === undefined) delete filter["userId"];
    if (pin === undefined) delete filter["pin"];

    return await super.findOne(filter);
  }

  async update(uuObject) {
    const filter = {
      awid: uuObject.awid,
      id: uuObject.orderId,
      pin: uuObject.pin,
    };

    if (uuObject.orderId === undefined) delete filter["id"];
    if (uuObject.pin === undefined) delete filter["pin"];

    delete uuObject["orderId"];
    delete uuObject["pin"];

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
