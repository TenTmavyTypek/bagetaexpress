//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useEffect, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import Config from "./config/config.js";
import Calls from "../../calls.js";
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

const SummaryItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SummaryItem",
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
    let { call, state } = useCall(() => Calls.itemGet({ itemId: props.data.itemId }));

    const [data, setData] = useState();
    useEffect(() => {
      call().then((data) => {
        setData(data);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SummaryItem);

    return currentNestingLevel && state == "ready" && data !== undefined ? (
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
                <Uu5Elements.Text {...title} type="major">
                  {props.data.numberOrdered}x
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
export { SummaryItem };
export default SummaryItem;
//@@viewOff:exports
