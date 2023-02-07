//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import MenuProvider from "../bricks/menu/menu-provider.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Menu = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Menu",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    // eslint-disable-next-line no-unused-vars
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <MenuProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Menu };
export default Menu;
//@@viewOff:exports
