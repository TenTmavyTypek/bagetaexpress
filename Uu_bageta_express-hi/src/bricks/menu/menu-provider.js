//@@viewOn:imports
import { createComponent, useDataList, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import MenuView from "../menu/menu-view";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const MenuProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuProvider",
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
    const callResultOrder = useDataObject({
      handlerMap: {
        createOrder: Calls.orderCreate,
      },
    });
    const callResult = useDataList({
      handlerMap: {
        load: Calls.itemList,
        createItem: Calls.itemCreate,
        createOrder: Calls.orderCreate,
      },
      itemHandlerMap: {
        updateItem: Calls.itemUpdate,
        deleteItem: Calls.itemDelete,
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
        return (
          <MenuView
            data={data}
            createItem={handlerMap.createItem}
            createOrder={callResultOrder.handlerMap.createOrder}
          />
        );
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuProvider };
export default MenuProvider;
//@@viewOff:exports
