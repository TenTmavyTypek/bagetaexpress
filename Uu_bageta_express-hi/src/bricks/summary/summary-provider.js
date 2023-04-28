//@@viewOn:imports
import { createComponent, useDataObject, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import SummaryView from "./summary-view.js";
import RouteBar from "../../core/route-bar.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SummaryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SummaryProvider",
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

    const callResultSupplier = useDataObject({
      handlerMap: {
        load: async () => {
          const permissions = await Calls.permissionsGet({ userId: identity.uuIdentity });
          const supplier = await Calls.supplierGet({ supplierId: permissions.supplierId });
          return supplier;
        },
        updateSupplier: (dtoIn) => Calls.supplierUpdate(dtoIn),
      },
    });
    const callResult = useDataObject({
      handlerMap: {
        load: Calls.orderSummary,
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
        return <Uu5Elements.Pending size="max" />;
      case "errorNoData":
        return <RouteBar />;
      case "ready":
        if (callResultSupplier.state === "ready") {
          return (
            <SummaryView
              updateSupplier={callResultSupplier.handlerMap.updateSupplier}
              supplier={callResultSupplier.data}
              data={data}
            />
          );
        }
        return null;
      case "readyNoData":
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryProvider };
export default SummaryProvider;
//@@viewOff:exports
