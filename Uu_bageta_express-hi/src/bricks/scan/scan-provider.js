//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import ScanView from "./scan-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ScanProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ScanProvider",
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
    return <ScanView /> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ScanProvider };
export default ScanProvider;
//@@viewOff:exports
