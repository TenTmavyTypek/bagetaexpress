//@@viewOn:imports
import { createVisualComponent, Utils, useState, useSession, useRoute } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import MenuCartModal from "../cart/menu-cart-modal.js";
import RouteBar from "../../../core/route-bar.js";
import Config from "./config/config.js";
import MenuProvider from "../menu-provider.js";
//@@viewOff:imports

//@@viewOn:constants
const [CartContext] = Utils.Context.create();
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
    const { identity } = useSession();
    const [, setRoute] = useRoute();
    const orderExists = props.getOrder !== null;

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNewItem, setIsNewItem] = useState(false);

    const [order, setOrder] = useState([]);
    const [orderDeadline, setOrderDeadline] = useState(new Date(8640000000000000));
    const [totalOrdered, setTotalOrdered] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [selectedSupplier, setSelectedSupplier] = useState(
      !props.hasPermissions
        ? props.data[0].data
        : props.data.filter(({ data }) => data.id === props.userPermissions.supplierId)[0].data
    );

    const addToOrder = (newItem) => {
      let altered = false;

      if (totalOrdered < 5) {
        setTotalOrdered(totalOrdered + 1);
      } else return;

      let alteredOrder = order.map((item) => {
        if (item.item.id === newItem.id) {
          altered = true;
          return { numberOrdered: item.numberOrdered + 1, item: item.item };
        }
        return item;
      });

      if (!altered) {
        const newItemDeadline = new Date(
          props.data.find(({ data }) => data.id === newItem.supplierId).data.summaryDatetime
        );
        if (orderDeadline > newItemDeadline) setOrderDeadline(newItemDeadline);

        alteredOrder.push({ numberOrdered: 1, item: newItem });
      }

      setTotalPrice((price) => price + newItem.price);
      setOrder(alteredOrder);
    };

    const removeFromOrder = (itemId) => {
      const itemIndex = order.findIndex((item) => item.item.id === itemId);

      if (totalOrdered > 0) {
        setTotalOrdered(totalOrdered - 1);
      } else return;

      setTotalPrice((price) => price - order[itemIndex].item.price);
      if (order[itemIndex].numberOrdered === 1) {
        setOrder((newOrder) => newOrder.filter((item) => item.item.id !== itemId));
        return;
      }

      setOrder((newOrder) =>
        newOrder.map((item) =>
          item.item.id === itemId ? { numberOrdered: item.numberOrdered - 1, item: item.item } : item
        )
      );
    };

    const createOrder = () => {
      if (order.length === 0) return;

      const finalOrder = {
        userId: identity.uuIdentity,
        orderContent: order.map((item) => ({ numberOrdered: item.numberOrdered, itemId: item.item.id })),
      };

      props.createOrder(finalOrder);
      resetOrder();
    };

    const resetOrder = () => {
      setOrder([]);
      setIsCartOpen(false);
      setTotalPrice(0);
    };

    const cartClose = () => setIsCartOpen(false);
    const cartOpen = () => setIsCartOpen(true);
    const newItem = () => setIsNewItem(true);
    const noNewItem = () => setIsNewItem(false);
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
          <CartContext.Provider
            value={{
              order,
              orderDeadline,
              orderExists,
              addToOrder,
              removeFromOrder,
              createOrder,
              resetOrder,
              totalPrice,
              newItem,
            }}
          >
            <div {...attrs}>
              <MenuProvider supplier={selectedSupplier} />
              <Uu5Elements.Modal
                header={"Nákupný košík"}
                open={isCartOpen}
                closeOnEsc={true}
                scrollable={true}
                fullscreen={true}
                closeOnOverlayClick={true}
                closeOnButtonClick={false}
                onClose={() => setIsCartOpen(false)}
              >
                <MenuCartModal data={props.data} cartClose={cartClose} />
              </Uu5Elements.Modal>
            </div>
          </CartContext.Provider>
        </Plus4U5Elements.IdentificationBlock>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SupplierPickerView, CartContext };
export default SupplierPickerView;
//@@viewOff:exports
