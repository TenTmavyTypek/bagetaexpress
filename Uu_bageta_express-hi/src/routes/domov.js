//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import DomovProvider from "../bricks/domov/domov-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Domov = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Domov",
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
    return <DomovProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Domov };
export default Domov;
//@@viewOff:exports
