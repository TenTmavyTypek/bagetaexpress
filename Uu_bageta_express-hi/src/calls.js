import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI =
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri;

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  itemDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("item/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  itemCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("item/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  itemUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("item/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  itemList(dtoIn) {
    const commandUri = Calls.getCommandUri("item/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  itemGet(dtoIn) {
    const commandUri = Calls.getCommandUri("item/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  itemGetImage(dtoIn) {
    const commandUri = Calls.getCommandUri("item/getImage");
    return Calls.call("get", commandUri, dtoIn);
  },

  orderCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("order/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  orderGet(dtoIn) {
    const commandUri = Calls.getCommandUri("order/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  orderGetList() {
    const commandUri = Calls.getCommandUri("order/getList");
    return Calls.call("get", commandUri);
  },

  orderUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("order/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  orderDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("order/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  orderConfirm(dtoIn) {
    const commandUri = Calls.getCommandUri("order/confirm");
    return Calls.call("post", commandUri, dtoIn);
  },

  orderSummary(dtoIn) {
    const commandUri = Calls.getCommandUri("order/summary");
    return Calls.call("get", commandUri, dtoIn);
  },

  permissionsGet(dtoIn) {
    const commandUri = Calls.getCommandUri("permissions/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  permissionsUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("permissions/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  permissionsGetList() {
    const commandUri = Calls.getCommandUri("permissions/getList");
    return Calls.call("get", commandUri);
  },

  permissionsCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("permissions/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  permissionsRemove(dtoIn) {
    const commandUri = Calls.getCommandUri("permissions/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  supplierGet(dtoIn) {
    const commandUri = Calls.getCommandUri("supplier/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  supplierGetList() {
    const commandUri = Calls.getCommandUri("supplier/getList");
    return Calls.call("get", commandUri);
  },

  supplierUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("supplier/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  supplierCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("supplier/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  supplierRemove(dtoIn) {
    const commandUri = Calls.getCommandUri("supplier/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  updateUnclaimed() {
    const commandUri = Calls.getCommandUri("order/updateUnclaimed");
    return Calls.call("post", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = CALLS_BASE_URI) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
