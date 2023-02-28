//@@viewOn:imports
import { createComponent, useSession } from "uu5g05";
import Config from "./config/config.js";
import Home from "./home.js";
import ManagementProvider from "../bricks/management/management-provider.js"
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Management = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Management",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { state } = useSession();


    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    
    //@@viewOn:render
    if (state != "authenticated") return <Home />;
    return <ManagementProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Management };
export default Management;
//@@viewOff:exports
