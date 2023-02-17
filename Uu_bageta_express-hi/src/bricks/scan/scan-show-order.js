//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import ScanShowOrderItem from "./scan-show-order-item.js";
import Calls from "../../calls.js";
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

const ScanShowOrder = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ScanShowOrder",
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
    let { call } = useCall(Calls.orderConfirm);

    const handleDecline = () => {
      call({ pin: props.data.pin, orderState: "declined" }).then(props.hideOrder);
    };

    const handleConfirm = () => {
      call({ pin: props.data.pin, orderState: "accepted" }).then(props.hideOrder);
    };

    const [price, setPrice] = useState(0);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ScanShowOrder);

    return currentNestingLevel ? (
      <>
        {props.data && (
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
                  <Uu5TilesElements.Grid data={props.data.orderContent} tileMinWidth={310}>
                    <ScanShowOrderItem setPrice={setPrice} />
                  </Uu5TilesElements.Grid>

                  <Uu5Elements.Text {...title} type="main">
                    Cena spolu: {price.toFixed(2)}€
                  </Uu5Elements.Text>
                </Uu5Elements.Grid.Item>
                <Uu5Elements.Grid.Item gridArea="Buttons">
                  <Uu5Elements.Grid flow="column">
                    <Uu5Elements.Button size="xl" onClick={handleDecline} colorScheme="red" significance="highlighted">
                      {" "}
                      {/*button RESET*/}
                      <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                        <Uu5Elements.Icon icon="mdi-close" />
                        {"\xA0"}
                        Zrušiť
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>
                    <Uu5Elements.Button size="xl" onClick={props.hideOrder}>
                      <Uu5Elements.Text {...title} type="micro">
                        Vrátiť sa
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>

                    <Uu5Elements.Button
                      size="xl"
                      onClick={handleConfirm}
                      colorScheme="yellow"
                      significance="highlighted"
                    >
                      {" "}
                      {/*button ORDER*/}
                      <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                        <Uu5Elements.Icon icon="mdi-check" />
                        {"\xA0"}
                        Povrdiť
                      </Uu5Elements.Text>
                    </Uu5Elements.Button>
                  </Uu5Elements.Grid>
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
            </Plus4U5Elements.IdentificationBlock>
          </div>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ScanShowOrder };
export default ScanShowOrder;
//@@viewOff:exports
