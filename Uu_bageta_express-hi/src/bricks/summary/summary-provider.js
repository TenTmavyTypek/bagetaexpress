//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import SummaryView from "./summary-view.js";
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <SummaryView />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryProvider };
export default SummaryProvider;
//@@viewOff:exports
