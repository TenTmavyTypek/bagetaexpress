//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useCall } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import RouteBar from "../../core/route-bar.js";
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

const ManagementView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ManagementView",
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
    let { call, state } = useCall(Calls.permissionsCreate);

    const [data, setData] = useState();
    let userId = "";

    function withControlledInput(Input) {
      return (props) => {
        const { value: propsValue, onChange, onValidationStart, onValidationEnd } = props;

        const [value, setValue] = useState(propsValue);
        const [errorList, setErrorList] = useState(null);

        return(
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ManagementView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Plus4U5Elements.IdentificationBlock>
          <Uu5Elements.Grid justifyContent="center">
            {state === "error" ||
              (state === "errorNoData" ? (
                <Uu5Elements.Text {...title} type="major" colorScheme="negative">
                  Neplatné ID
                </Uu5Elements.Text>
              ) : (
                <Uu5Elements.Text {...title} type="major">
                  Id používateľa:
                </Uu5Elements.Text>
              ))}
            <TextInput
              value={userId}
              validateOnChange
              onChange={(x) => (userId = x.data.value)}
            />
            <Uu5Elements.Button
              size="xl"
              onClick={() => call({ userId: userId , isAdmin: false }).then((data) => setData(data))}
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
        </Plus4U5Elements.IdentificationBlock>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementView };
export default ManagementView;
//@@viewOff:exports
