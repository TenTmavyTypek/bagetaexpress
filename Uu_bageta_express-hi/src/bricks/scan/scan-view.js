//@@viewOn:imports
import { QrReader } from "react-qr-reader";
import { createVisualComponent, Utils, useState, useCall } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
import Calls from "../../calls.js";
import ScanShowOrder from "./scan-show-order.js";
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

const ScanView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ScanView",
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
    let { call, state } = useCall(Calls.orderGet);

    const [data, setData] = useState();

    const handleCall = (pin) => {
      call({ pin }).then((data) => setData(data));
    };

    const hideOrder = () => setData(undefined);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ScanView);

    if (data !== undefined && state === "ready") {
      return <ScanShowOrder data={data} hideOrder={hideOrder} />;
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleCall(result?.text);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ScanView };
export default ScanView;
//@@viewOff:exports
