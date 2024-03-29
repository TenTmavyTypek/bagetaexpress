//@@viewOn:imports
import { useReactToPrint } from "react-to-print";
import { createVisualComponent, Utils, useState, useRef, useEffect } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
import SummaryItem from "./summary-item.js";
import SummaryItemLabel from "./summary-item-label.js";
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

    const [isLabelsHidden, setIsLabelsHidden] = useState(true);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = props.supplier.summaryDatetime;

    const getTime = () => {
      const time = Date.parse(deadline) - Date.now();

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
      getTime(deadline);
      const interval = setInterval(() => {
        getTime(deadline);
      }, 1000);

      return () => clearInterval(interval);
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
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
            . PrintLabels .,
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
                <Uu5Elements.Button
                  colorScheme="yellow"
                  size="xl"
                  significance="highlighted"
                  disabled={summaryDatetime === props.supplier.summaryDatetime}
                  onClick={() => {
                    props.updateSupplier({ supplierId: props.supplier.id, summaryDatetime });
                  }}
                >
                  Uložiť
                </Uu5Elements.Button>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>

            <Uu5Elements.Grid.Item gridArea="PrintLabels">
              <Uu5Elements.Block>
                {Date.parse(deadline) > Date.now() ? (
                  <Uu5Elements.Text category="interface" segment="title" type="minor">
                    Objednávky sa uzatvárajú o{"  "}
                    {Date.parse(deadline) > Date.now()
                      ? (days !== 0 ? (days < 10 ? "0" + days : days) + "d : " : "") +
                        (hours !== 0 ? (hours < 10 ? "0" + hours : hours) + "h : " : "") +
                        (minutes !== 0 ? (minutes < 10 ? "0" + minutes : minutes) + "m : " : "") +
                        (seconds < 10 ? "0" + seconds : seconds) +
                        "s"
                      : "00 : 00 : 00 : 00"}
                  </Uu5Elements.Text>
                ) : (
                  <Uu5Elements.Text category="interface" segment="title" type="minor">
                    Objednávky už boli uzavreté, môžete vytlačiť štítky.
                  </Uu5Elements.Text>
                )}
              </Uu5Elements.Block>
              <Uu5Elements.Grid templateColumns={"1fr 1fr"}>
                <Uu5Elements.Button colorScheme="yellow" size="xl" significance="highlighted" onClick={handlePrint}>
                  Vytlačiť štítky
                </Uu5Elements.Button>
                <Uu5Elements.Button size="xl" onClick={() => setIsLabelsHidden(!isLabelsHidden)}>
                  {isLabelsHidden ? "Zobraziť štítky" : "Skryť štítky"}
                </Uu5Elements.Button>
              </Uu5Elements.Grid>

              <Uu5Elements.CollapsibleBox collapsed={isLabelsHidden}>
                <div ref={componentRef}>
                  <Uu5Elements.Grid templateColumns={"1fr 1fr 1fr"}>
                    {props.data.data.map((itemSum, i) => (
                      <SummaryItemLabel key={i} data={itemSum} supplier={props.supplier} />
                    ))}
                  </Uu5Elements.Grid>
                </div>
              </Uu5Elements.CollapsibleBox>
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
