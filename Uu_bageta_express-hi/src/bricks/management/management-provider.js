//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import ManagementView from "./management-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ManagementProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ManagementProvider",
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
    return <ManagementView /> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementProvider };
export default ManagementProvider;
//@@viewOff:exports
