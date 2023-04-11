//@@viewOn:imports
import { createVisualComponent, Utils, useEffect, useContext } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import { CartContext } from "../menu-wrapper.js";

import Config from "./config/config.js";
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

const MenuCartItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuCartItem",
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
    const { addToOrder, removeFromOrder } = useContext(CartContext);
    const data = props.data.item;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuCartItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile>
          {"\xA0"}
          <Uu5Elements.Grid
            flow="column"
            templateColumns={{ xs: "100%", m: "1fr 1fr 1fr" }}
            templateAreas={{
              xs: `img, heading, content, count, count`,
              m: `
              img heading count,
              img content count`,
            }}
            rowGap={{ xs: "2rem", m: "1rem" }}
          >
            <Uu5Elements.Grid.Item alignSelf="center" gridArea="img">
              <Uu5Imaging.Image src={data.image} shape="rect2x1" />
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item gridArea="heading" justifySelf="center" alignSelf="center">
              <Uu5Elements.Text category="expose" segment="default" type="lead">
                {data.name}
              </Uu5Elements.Text>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item gridArea="content" alignSelf="center">
              <Uu5Elements.Grid rowGap="0.1rem" justifyContent="center" justifyItems="center">
                <Uu5Elements.Text {...title} type="micro">
                  Hmotnosť:
                  <Uu5Elements.Text {...content} type="large">
                    {" "}
                    {data.weight + "g"}
                  </Uu5Elements.Text>
                </Uu5Elements.Text>
                <Uu5Elements.Text {...title} type="micro">
                  Ingrediencie:
                  <Uu5Elements.Text {...content} type="large">
                    {" "}
                    {data.ingredients + " "}
                  </Uu5Elements.Text>
                </Uu5Elements.Text>
                <Uu5Elements.Text {...title} type="micro">
                  Alergény:
                  <Uu5Elements.Text {...content} type="large">
                    {" "}
                    {data.allergens + " "}
                  </Uu5Elements.Text>
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item gridArea="count" justifySelf="center" alignSelf="center">
              <Uu5Elements.Grid justifyContent="center">
                <Uu5Elements.Text {...title} type="main">
                  {(data.price * props.data.numberOrdered).toFixed(2)}€
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
              <Uu5Elements.Grid justifyContent="center" flow="column" justifyItems="center">
                <Uu5Elements.Button onClick={() => removeFromOrder(data.id)} size="l" icon="mdi-minus" />
                <Uu5Elements.Text {...title} type="major">
                  {props.data.numberOrdered}
                </Uu5Elements.Text>
                <Uu5Elements.Button onClick={() => addToOrder(data)} size="l" icon="mdi-plus" />
              </Uu5Elements.Grid>
              <Uu5Elements.Grid justifyContent="center">
                <Uu5Elements.Text {...content} type="small">
                  bez DPH {(data.price * props.data.numberOrdered * 0.8).toFixed(2)}€
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
          {"\xA0"}
        </Uu5TilesElements.Tile>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuCartItem };
export default MenuCartItem;
//@@viewOff:exports
