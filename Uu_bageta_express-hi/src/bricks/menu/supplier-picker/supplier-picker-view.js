//@@viewOn:imports
import { createVisualComponent, Utils, useState, useRoute } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import MenuCartModal from "../cart/menu-cart-modal.js";
import RouteBar from "../../../core/route-bar.js";
import Config from "./config/config.js";
import MenuWrapper from "../menu-wrapper.js";
import MenuProvider from "../menu-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SupplierPickerView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SupplierPickerView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const orderExists =
      props.getOrder !== null && props.getOrder.orderState !== "accepted" && props.getOrder.orderState !== "declined";

    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartClose = () => setIsCartOpen(false);
    const cartOpen = () => setIsCartOpen(true);

    const [isNewItem, setIsNewItem] = useState(false);

    const newItem = () => setIsNewItem(true);
    const noNewItem = () => setIsNewItem(false);

    const [selectedSupplier, setSelectedSupplier] = useState(
      !props.hasPermissions
        ? props.data[0].data
        : props.data.filter(({ data }) => data.id === props.userPermissions.supplierId)[0].data
    );
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SupplierPickerView);

    return currentNestingLevel ? (
      <>
        <RouteBar />
        <Plus4U5Elements.IdentificationBlock
          actionList={[
            (props.userPermissions.isAdmin || !props.hasPermissions) && {
              tooltip: "Výber dodávateľa",
              children: selectedSupplier.name,
              significance: "common",
              itemList: props.data.map(({ data }) => ({
                children: data.name,
                onClick: () => setSelectedSupplier(data),
              })),
            },
            (props.userPermissions.isAdmin || !props.hasPermissions) &&
              (!orderExists
                ? {
                    icon: "mdi-cart-outline",
                    children: "Košík",
                    tooltip: "Košík",
                    onClick: () => {
                      cartOpen();
                      noNewItem();
                    },
                    colorScheme: "yellow",
                    significance: "highlighted",
                    iconNotification: isNewItem,
                  }
                : {
                    icon: "mdi-cart-outline",
                    children: "Objednávka",
                    tooltip: "Zobraziť objednávku",
                    onClick: () => setRoute("cart"),
                    colorScheme: "yellow",
                    significance: "highlighted",
                  }),
          ]}
        >
          <MenuWrapper
            cartClose={cartClose}
            cartOpen={cartOpen}
            data={props.data}
            createOrder={props.createOrder}
            orderExists={orderExists}
            newItem={newItem}
          >
            <div {...attrs}>
              <MenuProvider supplier={selectedSupplier} />
              <Uu5Elements.Modal
                header={"Nákupný košík"}
                className={Config.Css.css({
                  width: "fit-content",
                  minWidth: "60%",
                })}
                open={isCartOpen}
                closeOnEsc={true}
                scrollable={true}
                closeOnOverlayClick={true}
                closeOnButtonClick={false}
                onClose={() => setIsCartOpen(false)}
              >
                <MenuCartModal data={props.data} cartClose={cartClose} />
              </Uu5Elements.Modal>
            </div>
          </MenuWrapper>
        </Plus4U5Elements.IdentificationBlock>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SupplierPickerView };
export default SupplierPickerView;
//@@viewOff:exports
