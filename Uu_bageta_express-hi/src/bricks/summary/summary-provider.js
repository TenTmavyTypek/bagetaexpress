//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import SummaryView from "./summary-view.js";
import RouteBar from "../../core/route-bar.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SummaryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SummaryProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:hooks
    const callResult = useDataObject({
      handlerMap: {
        load: Calls.ordeSummary,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "errorNoData":
        return <RouteBar />;
      case "ready":
      case "readyNoData":
        return <SummaryView data={data} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryProvider };
export default SummaryProvider;
//@@viewOff:exports