//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import { RouteBar } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ManagementView from "./management-view.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ManagementProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ManagementProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:hooks
    const callResult = useDataList({
      handlerMap: {
        load: Calls.permissionsGetList,
        addPermissions: Calls.permissionsCreate,
      },
      itemHandlerMap: {
        removePermissions: Calls.permissionsRemove,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "itemPending ":
        return "Loading";
      case "readyNoData":
      case "ready":
        return <ManagementView data={data} addPermissions={handlerMap.addPermissions} />;
    }

    return <RouteBar /> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementProvider };
export default ManagementProvider;
//@@viewOff:exports
