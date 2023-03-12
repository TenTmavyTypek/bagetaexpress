//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import DetailSummaryOrder from "./detail-summary-order.js";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DetailSummaryView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailSummaryView",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailSummaryView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Uu5TilesElements.Grid data={props.data} tileMinWidth={310}>
          <DetailSummaryOrder />
        </Uu5TilesElements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailSummaryView };
export default DetailSummaryView;
//@@viewOff:exports
