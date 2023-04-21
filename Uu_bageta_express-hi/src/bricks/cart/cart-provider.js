//@@viewOn:imports
import { createComponent, useDataObject, useSession, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import CartView from "../cart/cart-view";
import RouteBar from "../../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const CartProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartProvider",
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
    const [, setRoute] = useRoute();

    //@@viewOff:private

    //@@viewOn:hooks
    const { identity } = useSession();

    const callResult = useDataObject({
      handlerMap: {
        load: async () => {
          try {
            const inProgress = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "inProgress" });
            if (inProgress !== null) return inProgress;
          } catch (e) {
            console.error(e);
          }

          try {
            const unclaimed = await Calls.orderGet({ userId: identity.uuIdentity, orderState: "unclaimed" });
            if (unclaimed !== null) return unclaimed;
          } catch (e) {
            console.error(e);
          }
          return null;
        },
        delete: Calls.orderDelete,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return <Uu5Elements.Pending size="max" />;
      case "errorNoData":
        return (
          <>
            <RouteBar />
            <Uu5Elements.Grid
              justifyContent="center"
              alignContent="center"
              templateColumns={{ xs: "0fr 3fr 0fr", m: "0.5fr 2fr 0.5fr" }}
              templateAreas={`
            . Text .,
            . Button .`}
            >
              <Uu5Elements.Grid.Item gridArea="Text" justifySelf="center">
                <Uu5Elements.Text {...title} type="common">
                  {"\xA0"}
                  Vaša objednávka bola zrušená, prosím kliknite na tlačidlo pre návrat do menu.
                </Uu5Elements.Text>
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item gridArea="Button" justifySelf="center">
                <Uu5Elements.Button
                  size="xl"
                  colorScheme="yellow"
                  significance="highlighted"
                  onClick={() => setRoute("menu")}
                >
                  Návrat do menu
                </Uu5Elements.Button>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </>
        );
      case "ready":
      case "readyNoData":
        return <CartView data={data} deleteOrder={handlerMap.delete} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartProvider };
export default CartProvider;
//@@viewOff:exports
