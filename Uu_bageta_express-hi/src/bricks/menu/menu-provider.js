//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
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
    const { identity } = useSession();

    const callResultPermissions = useDataObject({
      handlerMap: {
        load: () => Calls.permissionsGet({ userId: identity.uuIdentity }),
      },
    });

    const callResult = useDataList({
      handlerMap: {
        load: () => Calls.itemList({ supplierId: props.supplier.id }),
        createItem: Calls.itemCreate,
        createOrder: Calls.orderCreate,
      },
      itemHandlerMap: {
        updateItem: Calls.itemUpdate,
        deleteItem: Calls.itemDelete,
      },
    });

    useEffect(() => {
      if (callResult.state === "ready") callResult.handlerMap.load();
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, [props.supplier.id]);
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return <Uu5Elements.Pending size="max" />;
      case "itemPending ":
        return <Uu5Elements.Pending size="max" />;
      case "readyNoData":
      case "ready":
        if (callResultPermissions.state === "ready")
          return (
            <MenuView
              data={data}
              supplier={props.supplier}
              createItem={handlerMap.createItem}
              hasPermissions={callResultPermissions.data?.hasPermissions ?? false}
              editMenu={callResultPermissions.data.access?.editMenu ?? false}
              isAdmin={callResultPermissions.data.isAdmin}
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
