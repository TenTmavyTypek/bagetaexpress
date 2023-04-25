//@@viewOn:imports
import { createVisualComponent, Utils, Fragment, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import DetailSummaryOrderItem from "./detail-summary-order-item.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
const content = { category: "interface", segment: "content" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottom: "1px solid #ccc", paddingTop: "1rem" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DetailSummaryOrder = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailSummaryOrder",
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
    const [hidden, setHidden] = useState(true);

    const [price, setPrice] = useState(0);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailSummaryOrder);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Grid
          templateColumns={{ xs: "0 1fr 0", m: "1fr 40rem 1fr" }}
          templateAreas={`
            . Sum .,
            . Cart .`}
        >
          <Uu5Elements.Grid.Item gridArea="Cart" css={Config.Css.css({ borderBottom: "1px solid #000" })}>
            <Uu5Elements.CollapsibleBox collapsed={hidden}>
              <Uu5TilesElements.Grid data={props.data.data.orderContent} tileMinWidth={310}>
                <DetailSummaryOrderItem setPrice={setPrice} />
              </Uu5TilesElements.Grid>
            </Uu5Elements.CollapsibleBox>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="Sum">
            <Uu5Elements.Grid
              flow="column"
              templateColumns={{ xs: "1fr 1fr, 1fr 1fr", m: "1fr 1fr 1fr" }}
              templateAreas={{ xs: "pin price, . hide", m: "pin price hide" }}
              rowGap={{ xs: "1rem" }}
            >
              <Uu5Elements.Grid.Item gridArea="hide" justifySelf="center" alignSelf="center">
                <Uu5Elements.Button onClick={() => setHidden((hidden) => !hidden)}>
                  {hidden ? "zobraziť objednávku" : "skryť objednávku"}
                </Uu5Elements.Button>
              </Uu5Elements.Grid.Item>

              <Uu5Elements.Grid.Item gridArea="price" justifySelf="center" alignSelf="center">
                <Uu5Elements.Grid justifyContent="center">
                  <Uu5Elements.Text {...title} type="main">
                    Cena: {price.toFixed(2)}€
                  </Uu5Elements.Text>
                </Uu5Elements.Grid>
                <Uu5Elements.Grid justifyContent="center">
                  <Uu5Elements.Text {...content} type="medium">
                    Cena spolu bez DPH: {(price * 0.8).toFixed(2)}€
                  </Uu5Elements.Text>
                </Uu5Elements.Grid>
              </Uu5Elements.Grid.Item>

              <Uu5Elements.Grid.Item gridArea="pin" alignSelf="center">
                <Uu5Elements.Text {...title} type="main">
                  Pin: {props.data.data.pin}
                </Uu5Elements.Text>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailSummaryOrder };
export default DetailSummaryOrder;
//@@viewOff:exports
