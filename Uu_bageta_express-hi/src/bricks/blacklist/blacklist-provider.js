//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import BlacklistView from "./blacklist-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const BlacklistProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BlacklistProvider",
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
    return <BlacklistView /> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BlacklistProvider };
export default BlacklistProvider;
//@@viewOff:exports
