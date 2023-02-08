//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import CartView from "../cart/cart-view";
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

    function itemList() {
      return Calls.itemList();
    }
    //@@viewOff:private

    //@@viewOn:hooks
    const callResult = useDataObject({
      handlerMap: {
        load: itemList,
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
      case "ready":
      case "readyNoData":
        return <CartView data={data} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartProvider };
export default CartProvider;
//@@viewOff:exports
