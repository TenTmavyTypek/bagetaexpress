//@@viewOn:imports
import { createVisualComponent, Utils, useRoute } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import CartItem from "./cart-item";
import RouteBar from "../../core/route-bar.js";

//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const CartView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartView",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CartView);

    return currentNestingLevel ? (
      <>
        <RouteBar />
        {props.data && (
          <div {...attrs}>
            <Plus4U5Elements.IdentificationBlock>
              <Uu5Elements.Grid
                templateColumns={{ xs: "0fr 3fr 0fr", m: "0.5fr 2fr 0.5fr" }}
                templateAreas={`
            . Cart .,
            . Cart .,
            . Cart .,
            . Buttons .`}
              >
                <Uu5Elements.Grid.Item gridArea="Cart">
                  <Uu5TilesElements.Grid data={props.data.orderContent} tileMinWidth={310}>
                    <CartItem />
                  </Uu5TilesElements.Grid>
                </Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item gridArea="Buttons">
                  <Uu5Elements.Grid flow="column">
                    <Uu5Elements.Button
                      size="xl"
                      onClick={() => {
                        props.deleteOrder({ pin: props.data.pin });
                      }}
                      colorScheme="red"
                      significance="highlighted"
                    >
                      {" "}
                      {/*button RESET*/}
                      <Uu5Elements.Text colorScheme="building" {...title} type="large">
                        <Uu5Elements.Icon icon="mdi-close" />
                        {"\xA0"}
                        Zrušiť objednávku
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>

                    <Uu5Elements.Button size="xl" onClick={props.cartClose}>
                      <Uu5Elements.Text {...title} type="large">
                        Zavrieť
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>

                    <Uu5Elements.Button size="xl" colorScheme="yellow" significance="highlighted">
                      {" "}
                      {/*button ORDER*/}
                      <Uu5Elements.Text colorScheme="building" {...title} type="large">
                        <Uu5Elements.Icon icon="mdi-check" />
                        {"\xA0"}
                        Upraviť
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>
                  </Uu5Elements.Grid>
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
            </Plus4U5Elements.IdentificationBlock>
          </div>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartView };
export default CartView;
//@@viewOff:exports
