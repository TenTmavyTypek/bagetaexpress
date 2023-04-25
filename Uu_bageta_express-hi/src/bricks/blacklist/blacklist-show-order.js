//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";

import BlacklistShowOrderItem from "./blacklist-show-order-item.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
const content = { category: "interface", segment: "content" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const BlacklistShowOrder = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BlacklistShowOrder",
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
    let { call } = useCall(Calls.orderUpdate);

    const handleUnblock = () => {
      call({ pin: props.data.pin, orderState: "accepted" }).then(props.hideOrder);
    };

    const [warningOpen, setWarningOpen] = useState(false);

    const endWarning = () => setWarningOpen(false);
    const startWarning = () => setWarningOpen(true);

    const [price, setPrice] = useState(0);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, BlacklistShowOrder);

    return currentNestingLevel ? (
      <>
        {props.data && (
          <div {...attrs}>
            <Plus4U5Elements.IdentificationBlock>
              <Uu5Elements.Grid
                templateColumns={{ xs: "0fr 3fr 0fr", m: "0.5fr 2fr 0.5fr" }}
                templateAreas={`
                . Cart .,
            . Sum .,
            . Buttons .`}
              >
                <Uu5Elements.Grid.Item gridArea="Cart">
                  <Uu5TilesElements.Grid data={props.data.orderContent} tileMinWidth={310}>
                    <BlacklistShowOrderItem setPrice={setPrice} />
                  </Uu5TilesElements.Grid>
                </Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item gridArea="Sum" justifySelf="center">
                  <Uu5Elements.Grid justifyContent="center">
                    <Uu5Elements.Text {...title} type="main">
                      Cena spolu: {price.toFixed(2)}€
                    </Uu5Elements.Text>
                  </Uu5Elements.Grid>
                  <Uu5Elements.Grid justifyContent="center">
                    <Uu5Elements.Text {...content}>Cena spolu bez DPH: {(price * 0.8).toFixed(2)}€</Uu5Elements.Text>
                  </Uu5Elements.Grid>
                </Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item gridArea="Buttons">
                  <Uu5Elements.Grid flow="column">
                    <Uu5Elements.Button size="xl" onClick={props.hideOrder}>
                      <Uu5Elements.Text {...title} type="micro">
                        Vrátiť sa
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>

                    <Uu5Elements.Button
                      size="xl"
                      onClick={startWarning}
                      colorScheme="yellow"
                      significance="highlighted"
                    >
                      {" "}
                      <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                        Odblokovať účet
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>
                  </Uu5Elements.Grid>
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
              <Uu5Elements.Modal
                open={warningOpen}
                headerSeparator={false}
                closeOnEsc={true}
                closeOnOverlayClick={true}
                closeOnButtonClick={false}
                onClose={() => setWarningOpen(false)}
                header={
                  <Uu5Elements.Grid justifyContent="center">
                    <Uu5Elements.Text>Určite chcete odblokovať tento účet?</Uu5Elements.Text>
                  </Uu5Elements.Grid>
                }
              >
                <Uu5Elements.Grid justifyContent="center" templateColumns="1fr 1fr">
                  <Uu5Elements.Button onClick={endWarning}>Zrušiť</Uu5Elements.Button>
                  <Uu5Elements.Button colorScheme="negative" significance="highlighted" onClick={handleUnblock}>
                    Odblokovať
                  </Uu5Elements.Button>
                </Uu5Elements.Grid>
              </Uu5Elements.Modal>
            </Plus4U5Elements.IdentificationBlock>
          </div>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BlacklistShowOrder };
export default BlacklistShowOrder;
//@@viewOff:exports
