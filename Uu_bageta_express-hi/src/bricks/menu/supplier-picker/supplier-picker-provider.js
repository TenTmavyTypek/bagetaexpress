//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
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
    const { identity, login, logout } = useSession();

    const callResultPermissions = useDataObject({
      handlerMap: {
        load: () => Calls.permissionsGet({ userId: identity.uuIdentity }),
      },
    });

    const callResultOrder = useDataObject({
      handlerMap: {
        load: async () => {
          try {
            const inProgress = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "inProgress" });
            if (inProgress !== null) return inProgress;
          } catch (e) {
            console.error(e);
          }

          try {
            const unclaimed = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "unclaimed" });
            if (unclaimed !== null) return unclaimed;
          } catch (e) {
            console.error(e);
          }

          return null;
        },
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
        return <Uu5Elements.Pending size="max" />;
      case "itemPending ":
        return <Uu5Elements.Pending size="max" />;
      case "readyNoData":
      case "ready":
        if (callResultPermissions.state === "ready") {
          if (callResultPermissions.data?.hasPermissions && !callResultPermissions.data.isSchoolEmail)
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
          return (
            <Uu5Elements.Box
              className={Config.Css.css({
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                justifyContent: "center",
                alignItems: "center",
                padding: "1.5rem",
              })}
              width="100%"
              height="100%"
              shape="background"
              significance="subdued"
            >
              <Uu5Imaging.Image
                className={Config.Css.css({
                  width: "25rem",
                  maxWidth: "100%",
                })}
                src={"assets/logos/bagetaExpress_logo_vector.svg"}
              />
              <Uu5Elements.Text
                className={Config.Css.css({
                  maxWidth: "35ch",
                })}
                textAlign="center"
                category="expose"
                segment="default"
                type="lead"
              >
                Pre registráciu a prihlásenie použite e-mail, ktorý Vám bol poskytnutý Vašou školou.
              </Uu5Elements.Text>
              <Uu5Elements.Button
                onClick={async () => {
                  await logout();
                  void login();
                }}
                size="xl"
                colorScheme="blue"
                significance="highlighted"
              >
                <Uu5Elements.Text colorScheme="building" category="interface" segment="title" type="major">
                  Prihlásiť sa do iného konta
                </Uu5Elements.Text>
              </Uu5Elements.Button>
            </Uu5Elements.Box>
          );
        }
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SupplierPickerProvider };
export default SupplierPickerProvider;
//@@viewOff:exports
