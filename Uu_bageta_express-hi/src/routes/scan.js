//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import ScanProvider from "../bricks/scan/scan-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Scan = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Scan",
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

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <ScanProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Scan };
export default Scan;
//@@viewOff:exports
