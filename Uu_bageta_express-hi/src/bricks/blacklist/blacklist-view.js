//@@viewOn:imports
import { QrReader } from "react-qr-reader";
import { createVisualComponent, Utils, useState, useCall } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
import Calls from "../../calls.js";

import BlacklistShowOrder from "./blacklist-show-order.js";
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

const BlacklistView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BlacklistView",
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
    const { call, state } = useCall(Calls.orderGet);

    const [data, setData] = useState();
    let manualPin = "";

    const handleCall = (pin) => {
      call({ pin, orderState: "unclaimed" }).then((data) => setData(data));
    };

    const hideOrder = () => setData(undefined);

    function withControlledInput(Input) {
      return (props) => {
        const { value: propsValue, onChange, onValidationStart, onValidationEnd } = props;

        const [value, setValue] = useState(propsValue);
        const [errorList, setErrorList] = useState(null);

        return (
          <div>
            <Input
              {...props}
              value={value}
              onChange={(e) => {
                typeof onChange === "function" && onChange(e);
                setValue(e.data.value);
              }}
              onValidationStart={(e) => {
                typeof onValidationStart === "function" && onValidationStart(e);
              }}
              onValidationEnd={(e) => {
                typeof onValidationEnd === "function" && onValidationEnd(e);
                setErrorList(e.data.errorList.length ? e.data.errorList : null);
              }}
            />
            {errorList && (
              <div>
                <Uu5Elements.Text colorScheme="negative">
                  {errorList.map(({ code }) => code).join(" ")}
                </Uu5Elements.Text>
              </div>
            )}
          </div>
        );
      };
    }

    const TextInput = withControlledInput(Uu5Forms.Text.Input);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, BlacklistView);

    if (data?.id !== undefined && state === "ready") {
      return <BlacklistShowOrder data={data} hideOrder={hideOrder} />;
    }
    console.log(data, state);
    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Uu5Elements.Grid justifyContent="center">
          {state === "error" || state === "errorNoData" || data?.id === undefined ? (
            <Uu5Elements.Text {...title} type="major" colorScheme="negative">
              Neplatný kód
            </Uu5Elements.Text>
          ) : (
            <Uu5Elements.Text {...title} type="major">
              Pin kód:
            </Uu5Elements.Text>
          )}
          <TextInput
            value={manualPin}
            pattern="[0-9][0-9][0-9][0-9]"
            validateOnChange
            onChange={(x) => (manualPin = x.data.value)}
          />
          <Uu5Elements.Button
            size="xl"
            onClick={() =>
              manualPin !== "" && call({ pin: manualPin, orderState: "unclaimed" }).then((data) => setData(data))
            }
            colorScheme="yellow"
            significance="highlighted"
          >
            {" "}
            <Uu5Elements.Text colorScheme="building" {...title} type="micro">
              <Uu5Elements.Icon icon="mdi-check" />
              {"\xA0"}
              Povrdiť
            </Uu5Elements.Text>
          </Uu5Elements.Button>
        </Uu5Elements.Grid>
        <div style={{ maxWidth: "40rem", width: "100%", margin: "auto" }}>
          <QrReader
            onResult={(result, error) => {
              if (result) {
                handleCall(result?.text);
              }
            }}
          />
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BlacklistView };
export default BlacklistView;
//@@viewOff:exports
