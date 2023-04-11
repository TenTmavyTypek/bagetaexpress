//@@viewOn:imports
import { createVisualComponent, Utils, useContext } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import { CartContext } from "../menu-wrapper.js";
import MenuCartItem from "./menu-cart-item.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
const content = { category: "interface", segment: "content" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const MenuCartModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuCartModal",
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
    const { order, orderDeadline, createOrder, resetOrder, totalPrice } = useContext(CartContext);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuCartModal);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Grid
          templateColumns={{ xs: "0fr 3fr 0fr", m: "0.5fr 2fr 0.5fr" }}
          templateAreas={`
            . Cart .,
            . Sum .,
            . Buttons .`}
        >
          <Uu5Elements.Grid.Item gridArea="Cart">
            <Uu5TilesElements.Grid data={order} tileMinWidth={310}>
              <MenuCartItem />
            </Uu5TilesElements.Grid>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="Sum" justifySelf="center">
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text {...title} type="main">
                Cena spolu: {totalPrice.toFixed(2)}€
              </Uu5Elements.Text>
            </Uu5Elements.Grid>
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text {...content}>Cena spolu bez DPH: {(totalPrice * 0.8).toFixed(2)}€</Uu5Elements.Text>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="Buttons">
            <Uu5Elements.Grid flow="column">
              <Uu5Elements.Button size="xl" onClick={resetOrder} colorScheme="red" significance="highlighted">
                {" "}
                {/*button RESET*/}
                <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                  <Uu5Elements.Icon icon="mdi-close" />
                  {"\xA0"}
                  Resetovať
                </Uu5Elements.Text>
              </Uu5Elements.Button>

              <Uu5Elements.Button size="xl" onClick={props.cartClose}>
                <Uu5Elements.Text {...title} type="micro">
                  Zavrieť
                </Uu5Elements.Text>
              </Uu5Elements.Button>
              {orderDeadline > new Date() && (
                <Uu5Elements.Button
                  size="xl"
                  onClick={() => orderDeadline > new Date() && createOrder()}
                  colorScheme="yellow"
                  significance="highlighted"
                >
                  {" "}
                  {/*button ORDER*/}
                  <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                    <Uu5Elements.Icon icon="mdi-check" />
                    {"\xA0"}
                    Objednať
                  </Uu5Elements.Text>
                </Uu5Elements.Button>
              )}
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuCartModal };
export default MenuCartModal;
//@@viewOff:exports
