//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useEffect, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderTop: "1px solid #ccc", paddingTop: "1rem" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DetailSummaryOrderItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailSummaryOrderItem",
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
        props.setPrice((price) => price + data.price * props.data.numberOrdered);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []); //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailSummaryOrderItem);

    return currentNestingLevel && state == "ready" && data !== undefined ? (
      <div {...attrs}>
        <Uu5Elements.Grid
          flow="column"
          templateColumns={{ xs: "min-content max-content 1fr" }}
          templateAreas={{ xs: "count heading price" }}
        >
          <Uu5Elements.Grid.Item gridArea="count" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="broad">
              {props.data.numberOrdered}x
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="heading" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="distinct">
              {data.name}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="price" justifySelf="end" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="broad">
              {(data.price * props.data.numberOrdered).toFixed(2)}€{"\xA0"}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
        {"\xA0"}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailSummaryOrderItem };
export default DetailSummaryOrderItem;
//@@viewOff:exports
