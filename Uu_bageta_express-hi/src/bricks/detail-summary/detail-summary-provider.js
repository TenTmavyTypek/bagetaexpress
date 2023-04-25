//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import DetailSummaryView from "./detail-summary-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DetailSummaryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailSummaryProvider",
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

    const callResult = useDataList({
      handlerMap: {
        load: Calls.orderGetList,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return <Uu5Elements.Pending size="max" />;
      case "itemPending ":
        return <Uu5Elements.Pending size="max" />;
      case "readyNoData":
      case "ready":
        return <DetailSummaryView data={data} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailSummaryProvider };
export default DetailSummaryProvider;
//@@viewOff:exports
