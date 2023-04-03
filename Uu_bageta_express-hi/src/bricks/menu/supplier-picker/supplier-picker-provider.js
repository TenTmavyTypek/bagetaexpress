//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useSession } from "uu5g05";
import Calls from "../../../calls.js";
import Config from "./config/config.js";
import SupplierPickerView from "./supplier-picker-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SupplierPickerProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SupplierPickerProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:hooks
    const { identity } = useSession();

    const callResultPermissions = useDataObject({
      handlerMap: {
        load: () => Calls.permissionsGet({ userId: identity.uuIdentity }),
      },
    });

    const callResultOrder = useDataObject({
      handlerMap: {
        load: () => Calls.orderGet({ userId: identity.uuIdentity }),
        createOrder: Calls.orderCreate,
      },
    });

    const callResult = useDataList({
      handlerMap: {
        load: Calls.supplierGetList,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "itemPending ":
        return "Loading";
      case "readyNoData":
      case "ready":
        if (callResultPermissions.state === "ready")
          return (
            <SupplierPickerView
              data={data}
              getOrder={callResultOrder.data}
              hasPermissions={callResultPermissions.data?.hasPermissions ?? false}
              editMenu={callResultPermissions.data.access?.editMenu ?? false}
              userPermissions={callResultPermissions.data}
              createOrder={callResultOrder.handlerMap.createOrder}
            />
          );
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SupplierPickerProvider };
export default SupplierPickerProvider;
//@@viewOff:exports
