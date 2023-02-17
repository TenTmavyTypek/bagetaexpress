//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import CartProvider from "../bricks/cart/cart-provider.js"
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Cart = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Cart",
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
    return <CartProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Cart };
export default Cart;
//@@viewOff:exports
