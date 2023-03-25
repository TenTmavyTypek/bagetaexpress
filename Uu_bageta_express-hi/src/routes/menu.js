//@@viewOn:imports
import { createComponent, useSession } from "uu5g05";
import Config from "./config/config.js";
import Home from "./home.js";
import SupplierPickerProvider from "../bricks/menu/supplier-picker/supplier-picker-provider.js";

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
    const { state } = useSession();

    // eslint-disable-next-line no-unused-vars
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (state != "authenticated") return <Home />;
    return <SupplierPickerProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Menu };
export default Menu;
//@@viewOff:exports
