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

    const [order, setOrder] = useState([]);

    const addToOrder = (newItem) => {
      let altered = false;

      let alteredOrder = order.map((item) => {
        if (item.item.id === newItem.id) {
          altered = true;
          return { numberOrdered: item.numberOrdered + 1, item: item.item };
        }
        return item;
      });

      if (!altered) {
        alteredOrder.push({ numberOrdered: 1, item: newItem });
      }

      setOrder(alteredOrder);
    };

    const removeFromOrder = (itemId) => {
      const itemIndex = order.findIndex((item) => item.item.id === itemId);

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
    };

    const startEdit = () => setIsOpen(true);
    const endEdit = () => setIsOpen(false);
    const cartOpen = () => setIsCartOpen(true);
    const cartClose = () => setIsCartOpen(false);

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
            !orderExists
              ? {
                  icon: "mdi-cart-arrow-right",
                  children: "Košík",
                  tooltip: "Košík",
                  onClick: () => cartOpen(),
                  colorScheme: "yellow",
                  significance: "highlighted",
                }
              : {
                  icon: "mdi-cart-arrow-right",
                  children: "Objednávka",
                  tooltip: "Zobraziť bojednávku",
                  onClick: () => setRoute("cart"),
                  colorScheme: "yellow",
                  significance: "highlighted",
                },
          ]}
        >
          <div {...attrs}>
            <CartContext.Provider value={{ order, orderExists, addToOrder, removeFromOrder, createOrder, resetOrder }}>
              <Uu5TilesElements.Grid data={props.data} tileMaxWidth={480} tileMinWidth={310}>
                <MenuItem />
              </Uu5TilesElements.Grid>
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
              {"\xA0"}

              <Uu5Elements.Modal
                header={"Pridanie bagety"}
                open={isOpen}
                closeOnEsc={true}
                closeOnOverlayClick={true}
                closeOnButtonClick={true}
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
                closeOnButtonClick={true}
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
