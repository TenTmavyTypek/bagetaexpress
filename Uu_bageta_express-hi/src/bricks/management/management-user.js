//@@viewOn:imports
import { createVisualComponent, Utils, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottom: "1px solid #ccc" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ManagementUser = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ManagementUser",
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
    const { identity } = useSession();
    const { data } = props.data;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ManagementUser);

    if (!data.userId) return null;
    if (data.userId === identity.uuIdentity) return null;

    return currentNestingLevel ? (
      <div {...attrs}>
        {"\xA0"}
        <Uu5Elements.Grid flow="column" templateColumns={{ xs: "max-content 1fr" }} templateAreas={{ xs: "id remove" }}>
          <Uu5Elements.Grid.Item gridArea="id" justifySelf="flex-start" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="broad">
              {data.userId}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="remove" justifySelf="flex-end" alignSelf="center">
            <Uu5Elements.Button
              colorScheme="negative"
              significance="highlighted"
              onClick={() => props.data.handlerMap.removePermissions({ userId: data.userId })}
            >
              Odstrániť práva
            </Uu5Elements.Button>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
        {"\xA0"}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementUser };
export default ManagementUser;
//@@viewOff:exports
