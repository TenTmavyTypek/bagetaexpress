//@@viewOn:imports
import { createVisualComponent, Utils, useState, useCall } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar.js";
import Calls from "../../calls.js";
import ManagementUser from "./management-user.js";
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
    const [userId, setUserId] = useState("");
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ManagementView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Uu5Elements.Grid
          templateColumns={{ xs: "0 1fr 0", m: "1fr 40rem 1fr" }}
          templateAreas={`
            . users .,
            . add .`}
        >
          <Uu5Elements.Grid.Item gridArea="users">
            <Uu5TilesElements.Grid data={props.data} tileMinWidth={310}>
              <ManagementUser />
            </Uu5TilesElements.Grid>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="add" templateColumns={"1fr 1fr"}>
            <Uu5Elements.Grid templateColumns={"1fr 1fr"} justifyContent="center" alignItems="center">
              <Uu5Elements.Input
                placeholder="XXX-XXX-XXX"
                value={userId}
                onChange={({ data }) => setUserId(data.value)}
              />
              <Uu5Elements.Button
                size="xl"
                onClick={() => props.addPermissions({ userId: userId, isAdmin: false })}
                colorScheme="yellow"
                significance="highlighted"
              >
                {" "}
                <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                  <Uu5Elements.Icon icon="mdi-check" />
                  {"\xA0"}
                  Pridať
                </Uu5Elements.Text>
              </Uu5Elements.Button>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementView };
export default ManagementView;
//@@viewOff:exports
