//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
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

const CartItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartItem",
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
    const { data } = props;
    const { children } = props;
    const [count, setCount] = useState(1);
    const[cena, setCena] = useState(data.price)
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CartItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile>
        {"\xA0"}
          <Uu5Elements.Grid flow="column" templateColumns={{xs: "100%", m: "1fr 2fr"}} 
          templateAreas={{
          xs: `img, ., count`,
          m:`img . count`
          }}>
            <Uu5Elements.Grid.Item alignSelf="center" gridArea="img">
              <Uu5Imaging.Image src={data.image} shape="rect2x1" />
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid flow="row" justifyItems="start" alignItems="center">
              <Uu5Elements.Text {...title} type="common">
                {data.name}
              </Uu5Elements.Text>
              <Uu5Elements.Grid rowGap="0.1rem">
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
            </Uu5Elements.Grid>
            <Uu5Elements.Grid.Item gridArea="count" alignSelf="center">
              <Uu5Elements.Grid alignContent="center" >
                  <Uu5Elements.Text>
                    {cena}
                  </Uu5Elements.Text>
                <Uu5Elements.Input value={count} 
                  onChange={(x) => {
                    if(x.data.value <= 0) setCount(0) /*not working, fix needed*/
                    setCount(x.data.value) 
                    setCena((data.price * x.data.value).toFixed(2))
                  }} type="number"/>
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
export { CartItem };
export default CartItem;
//@@viewOff:exports
