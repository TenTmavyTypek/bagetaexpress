//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import SummaryProvider from "../bricks/summary/summary-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Summary = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Summary",
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
    return <SummaryProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Summary };
export default Summary;
//@@viewOff:exports
