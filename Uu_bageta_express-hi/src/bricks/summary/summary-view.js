//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
import SummaryItem from "./summary-item.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SummaryView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SummaryView",
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
    const [summaryDatetime, setSummaryDatetime] = useState(props.supplier?.summaryDatetime);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SummaryView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Plus4U5Elements.IdentificationBlock>
          <Uu5Elements.Grid
            templateColumns={{ xs: "0fr 1fr 0fr", m: "1fr 40rem 1fr" }}
            templateAreas={`
            . SummaryTime .,
            . Header .,
            . Item .`}
          >
            <Uu5Elements.Grid.Item gridArea="SummaryTime">
              <Uu5Elements.Text category="interface" segment="title" type="major">
                Čas uzavrenia objednávania:
              </Uu5Elements.Text>

              <Uu5Elements.Grid templateColumns={"1.5fr 1fr"}>
                <Uu5Forms.DateTime
                  value={summaryDatetime}
                  size="xl"
                  width="50%"
                  type="datetime-local"
                  onChange={(e) => {
                    setSummaryDatetime(e.data.value);
                  }}
                />
                {summaryDatetime !== props.supplier.summaryDatetime && (
                  <Uu5Elements.Button
                    colorScheme="yellow"
                    size="xl"
                    significance="highlighted"
                    onClick={() => {
                      props.updateSupplier({ supplierId: props.supplier.id, summaryDatetime });
                    }}
                  >
                    Uložiť
                  </Uu5Elements.Button>
                )}
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item gridArea="Header">
              <Uu5Elements.Text category="interface" segment="title" type="major">
                Aktívne objednávky:
              </Uu5Elements.Text>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item gridArea="Item">
              <Uu5TilesElements.Grid data={props.data.data} tileMinWidth={310}>
                <SummaryItem supplierId={props.supplier.id} />
              </Uu5TilesElements.Grid>
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
        </Plus4U5Elements.IdentificationBlock>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryView };
export default SummaryView;
//@@viewOff:exports
