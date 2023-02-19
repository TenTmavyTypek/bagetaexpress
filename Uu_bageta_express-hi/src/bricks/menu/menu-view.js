//@@viewOn:imports
import { createVisualComponent, Utils, useState, useSession, useRoute } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import MenuItem from "./menu-item.js";
import MenuForm from "./menu-form.js";
import RouteBar from "../../core/route-bar.js";
import Config from "./config/config.js";
import MenuCartModal from "./cart/menu-cart-modal.js";

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

const MenuView = createVisualComponent({
  //@@viewOn:statics

  uu5Tag: Config.TAG + "MenuView",
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

    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNewItem, setIsNewItem] = useState(false);

    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToOrder = (newItem) => {
      let altered = false;
      let maxNum = false;

      let alteredOrder = order.map((item) => {
        if (item.item.id === newItem.id) {
          altered = true;
          if (item.numberOrdered === 5) {
            maxNum = true;
          }
          return { numberOrdered: item.numberOrdered + 1, item: item.item };
        }
        return item;
      });

      if (maxNum) return;

      if (!altered) {
        alteredOrder.push({ numberOrdered: 1, item: newItem });
      }

      setTotalPrice((price) => price + newItem.price);
      setOrder(alteredOrder);
    };

    const removeFromOrder = (itemId) => {
      const itemIndex = order.findIndex((item) => item.item.id === itemId);

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

    const startEdit = () => setIsOpen(true);
    const endEdit = () => setIsOpen(false);
    const cartOpen = () => setIsCartOpen(true);
    const cartClose = () => setIsCartOpen(false);
    const newItem = () => setIsNewItem(true);
    const noNewItem = () => setIsNewItem(false);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuView);

    return currentNestingLevel ? (
      <>
        <RouteBar />
        <Plus4U5Elements.IdentificationBlock
          actionList={[
            (props.isAdmin || !props.hasPermissions) &&
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
          <div {...attrs}>
            <CartContext.Provider
              value={{ order, orderExists, addToOrder, removeFromOrder, createOrder, resetOrder, totalPrice, newItem }}
            >
              <Uu5TilesElements.Grid data={props.data} tileMaxWidth={480} tileMinWidth={310}>
                <MenuItem hasPermissions={props.hasPermissions} isAdmin={props.isAdmin} />
              </Uu5TilesElements.Grid>
              {props.hasPermissions && (
                <Uu5Elements.Grid justifyContent="center" alignContent="center">
                  {"\xA0"}
                  <Uu5Elements.Button
                    onClick={startEdit}
                    size="xl"
                    icon="mdi-plus"
                    colorScheme="dark-blue"
                    significance="distinct"
                  >
                    Pridať položku
                  </Uu5Elements.Button>
                </Uu5Elements.Grid>
              )}
              {"\xA0"}

              <Uu5Elements.Modal
                open={isOpen}
                closeOnEsc={true}
                closeOnOverlayClick={true}
                closeOnButtonClick={false}
                onClose={() => setIsOpen(false)}
                header={
                  <Uu5Elements.Grid justifyContent="center">
                    <Uu5Elements.Text>Pridanie položky</Uu5Elements.Text>
                  </Uu5Elements.Grid>
                }
              >
                <MenuForm onSave={props.createItem} onClose={endEdit} />
              </Uu5Elements.Modal>

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
            </CartContext.Provider>
          </div>
        </Plus4U5Elements.IdentificationBlock>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuView, CartContext };
export default MenuView;
//@@viewOff:exports
