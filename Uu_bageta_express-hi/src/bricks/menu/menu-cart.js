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

const MenuCart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuCart",
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
    const { data } = props.data;
    const { children } = props;
    const [count, setCount] = useState(1); //počet kusov
    const [cena, setCena] = useState(data.price); //cena kusov
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuCart);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile>
          {"\xA0"}
          <Uu5Elements.Grid
            flow="column"
            templateColumns={{ xs: "100%", m: "1fr 2fr" }}
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
                  {cena}€
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
              <Uu5Elements.Grid justifyContent="center" justifyItems="center">
                <Uu5Elements.Input
                  width="50%"
                  value={count}
                  onChange={(x) => {
                    if (x.data.value < 1) {
                      setCount(1); // Ošetrenie proti nulovému alebo zápornemu počtu kusov
                    } else if (x.data.value > 30) {
                      setCount(30); // Ošetrenie proti počtu kusov > 30
                    } else {
                      setCount(x.data.value);
                      setCena((data.price * x.data.value).toFixed(2)); //Výpočet ceny podľa počtu kusov
                    }
                  }}
                  type="number"
                />
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
export { MenuCart };
export default MenuCart;
//@@viewOff:exports
