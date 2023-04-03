//@@viewOn:imports
import { createComponent, useDataObject, useSession } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import CartView from "../cart/cart-view";
import RouteBar from "../../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const CartProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartProvider",
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

    const callResult = useDataObject({
      handlerMap: {
        load: async () => {
          const inProgress = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "inProgress" });
          if (inProgress !== null) return inProgress;

          const unclaimed = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "unclaimed" });
          if (unclaimed !== null) return unclaimed;
        },
        delete: Calls.orderDelete,
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
      case "errorNoData":
        return <RouteBar />;
      case "ready":
      case "readyNoData":
        return <CartView data={data} deleteOrder={handlerMap.delete} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartProvider };
export default CartProvider;
//@@viewOff:exports
