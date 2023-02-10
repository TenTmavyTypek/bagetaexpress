//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
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
    console.log(props);
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CartView);

    return currentNestingLevel ? (
      <>
        <RouteBar />

        <div {...attrs}>
          <Plus4U5Elements.IdentificationBlock>
            <Uu5Elements.Grid templateColumns={{xs: "90%", m: "repeat(4, 1fr)"}} alignContent="center" justifyContent="center">
              <Uu5TilesElements.Grid data={props.data.itemList} tileMaxWidth={480} tileMinWidth={310}>
                <CartItem />
              </Uu5TilesElements.Grid>
            </Uu5Elements.Grid>

            <Uu5Elements.Button size="xl">
              <Uu5Elements.Text colorScheme="building" {...title} type="large">
                <Uu5Elements.Icon icon="mdi-close" />
                {"\xA0"}
                Resetovať
              </Uu5Elements.Text>
            </Uu5Elements.Button>

            <Uu5Elements.Button size="xl" colorScheme="highest">
              <Uu5Elements.Text colorScheme="building" {...title} type="large">
                <Uu5Elements.Icon icon="mdi-check" />
                {"\xA0"}
                Objednať
              </Uu5Elements.Text>
            </Uu5Elements.Button>
          </Plus4U5Elements.IdentificationBlock>
        </div>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartView };
export default CartView;
//@@viewOff:exports
