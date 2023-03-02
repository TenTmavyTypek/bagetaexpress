//@@viewOn:imports
import { createComponent, useCall, useEffect, useState, useSession, useRoute } from "uu5g05";
import Config from "./config/config.js";
import CartProvider from "../bricks/cart/cart-provider.js";
import Calls from "../calls.js";
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
    const { identity } = useSession();
    const [, setRoute] = useRoute();

    let { call } = useCall(() => Calls.permissionsGet({ userId: identity.uuIdentity }));

    const [hasPermissions, setHasPermissions] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      call().then((data) => {
        setHasPermissions(data.hasPermissions);
        setIsAdmin(data.isAdmin);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (hasPermissions && !isAdmin) return setRoute("menu");
    return <CartProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Cart };
export default Cart;
//@@viewOff:exports
