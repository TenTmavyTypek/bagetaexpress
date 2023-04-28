//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import { Environment } from "uu5g05";
import Config from "./config/config.js";
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
    const item = props.data.item;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SummaryItem);

    return currentNestingLevel && item.supplierId === props.supplierId ? (
      <div {...attrs}>
        <Uu5Elements.Grid
          flow="column"
          templateColumns={{ xs: "1fr 1fr", m: "min-content 1fr 1fr" }}
          templateAreas={{ xs: "name img, count img", m: "count name img" }}
          rowGap={{ xs: "0", m: "1rem" }}
        >
          <Uu5Elements.Grid.Item gridArea="count" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="lead">
              {props.data.numberOrdered}x
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="name" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="broad">
              {item.name}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="img" alignSelf="center">
            <Uu5Imaging.Image src={`${Environment.appBaseUri}item/getImage?code=${item.image}`} shape="rect2x1" />
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    ) : null;

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryItem };
export default SummaryItem;
//@@viewOff:exports
