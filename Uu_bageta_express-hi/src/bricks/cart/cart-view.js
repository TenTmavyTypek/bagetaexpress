//@@viewOn:imports
import QRCode from "react-qr-code";
import { createVisualComponent, Utils, useRoute, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import CartItem from "./cart-item";
import RouteBar from "../../core/route-bar.js";

//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const CartView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [price, setPrice] = useState(0);
    const [orderDeadline, setOrderDeadline] = useState(new Date(8640000000000000));
    const [, setRoute] = useRoute();

    const [warningOpen, setWarningOpen] = useState(false);

    const endWarning = () => setWarningOpen(false);
    const startWarning = () => setWarningOpen(true);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CartView);

    return currentNestingLevel ? (
      <>
        <RouteBar />
        {props.data ? (
          <div {...attrs}>
            <Plus4U5Elements.IdentificationBlock>
              <Uu5Elements.Grid
                templateColumns={{ xs: "0fr 3fr 0fr", m: "0.5fr 2fr 0.5fr" }}
                templateAreas={`
                . Cart .,
                . Cart .,
                . Cart .,
                . Buttons .`}
              >
                <Uu5Elements.Grid.Item gridArea="Cart">
                  <Uu5Elements.Grid justifyContent="center" justifyItems="center">
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "min(100%, 20rem)",
                        marginBottom: "2rem",
                        margin: "0 auto",
                      }}
                      value={props.data.pin}
                      viewBox={`0 0 256 256`}
                    />
                    <Uu5Elements.Text {...title} type="main">
                      PIN: {props.data.pin}
                    </Uu5Elements.Text>
                    <Uu5Elements.Text {...title} type="major">
                      Cena spolu: {price.toFixed(2)}€
                    </Uu5Elements.Text>
                    {"\xA0"}
                  </Uu5Elements.Grid>
                  <Uu5TilesElements.Grid data={props.data.orderContent} tileMinWidth={310}>
                    <CartItem setPrice={setPrice} setOrderDeadline={setOrderDeadline} />
                  </Uu5TilesElements.Grid>
                </Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item gridArea="Buttons">
                  <Uu5Elements.Grid flow="column" templateColumns="1fr">
                    {orderDeadline > new Date() && (
                      <Uu5Elements.Button size="xl" onClick={startWarning} colorScheme="red" significance="highlighted">
                        <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                          <Uu5Elements.Icon icon="mdi-close" />
                          {"\xA0"}
                          Zrušiť objednávku
                        </Uu5Elements.Text>
                      </Uu5Elements.Button>
                    )}

                    {/* warning modal */}

                    <Uu5Elements.Modal
                      open={warningOpen}
                      headerSeparator={false}
                      closeOnEsc={true}
                      closeOnOverlayClick={true}
                      closeOnButtonClick={false}
                      onClose={() => setWarningOpen(false)}
                      header={
                        <Uu5Elements.Grid justifyContent="center">
                          <Uu5Elements.Text>Určite chcete zrušiť vašu objednávku?</Uu5Elements.Text>
                        </Uu5Elements.Grid>
                      }
                    >
                      <Uu5Elements.Grid justifyContent="center" templateColumns="1fr 1fr">
                        <Uu5Elements.Button onClick={endWarning}>Späť</Uu5Elements.Button>
                        <Uu5Elements.Button
                          onClick={() => {
                            if (orderDeadline > new Date()) props.deleteOrder({ pin: props.data.pin });
                          }}
                          colorScheme="red"
                          significance="highlighted"
                        >
                          <Uu5Elements.Text>Zrušiť objednávku</Uu5Elements.Text>
                        </Uu5Elements.Button>
                      </Uu5Elements.Grid>
                    </Uu5Elements.Modal>
                  </Uu5Elements.Grid>
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
            </Plus4U5Elements.IdentificationBlock>
          </div>
        ) : (
          <Plus4U5Elements.IdentificationBlock>
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
          </Plus4U5Elements.IdentificationBlock>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartView };
export default CartView;
//@@viewOff:exports
