//@@viewOn:imports
import { Utils, useState, useSession } from "uu5g05";
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const [CartContext] = Utils.Context.create();
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const MenuWrapper = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuWrapper",
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
    const { identity } = useSession();

    const [order, setOrder] = useState([]);
    const [orderDeadline, setOrderDeadline] = useState(new Date(8640000000000000));
    const [totalOrdered, setTotalOrdered] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToOrder = (newItem) => {
      let altered = false;

      if (totalOrdered < 5) {
        setTotalOrdered(totalOrdered + 1);
      } else return;

      let alteredOrder = order.map((item) => {
        if (item.item.id === newItem.id) {
          altered = true;
          return { numberOrdered: item.numberOrdered + 1, item: item.item };
        }
        return item;
      });

      if (!altered) {
        const newItemDeadline = new Date(
          props.data.find(({ data }) => data.id === newItem.supplierId).data.summaryDatetime
        );
        if (orderDeadline > newItemDeadline) setOrderDeadline(newItemDeadline);

        alteredOrder.push({ numberOrdered: 1, item: newItem });
      }

      setTotalPrice((price) => price + newItem.price);
      setOrder(alteredOrder);
    };

    const removeFromOrder = (itemId) => {
      const itemIndex = order.findIndex((item) => item.item.id === itemId);

      if (totalOrdered > 0) {
        setTotalOrdered(totalOrdered - 1);
      } else return;

      setTotalPrice((price) => price - order[itemIndex].item.price);
      if (order[itemIndex].numberOrdered === 1) {
        setOrder((newOrder) => newOrder.filter((item) => item.item.id !== itemId));
        return;
      }

      setOrder((newOrder) =>
        newOrder.map((item) =>
          item.item.id === itemId ? { numberOrdered: item.numberOrdered - 1, item: item.item } : item
        )
      );
    };

    const resetOrder = () => {
      setOrder([]);
      props.cartClose();
      setTotalOrdered(0);
      setTotalPrice(0);
    };

    const createOrder = () => {
      if (order.length === 0) return;

      const finalOrder = {
        userId: identity.uuIdentity,
        orderContent: order.map((item) => ({ numberOrdered: item.numberOrdered, itemId: item.item.id })),
      };

      props.createOrder(finalOrder);
      resetOrder();
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      (
        <CartContext.Provider
          value={{
            order,
            orderDeadline,
            orderExists: props.orderExists,
            addToOrder,
            removeFromOrder,
            createOrder,
            resetOrder,
            totalPrice,
            newItem: props.newItem,
          }}
        >
          {children}
        </CartContext.Provider>
      ) ?? null
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuWrapper, CartContext };
export default MenuWrapper;
//@@viewOff:exports
