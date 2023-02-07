//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import MenuItem from "./menu-item.js";
import RouteBar from "../../core/route-bar.js";
import Config from "./config/config.js";

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

const MenuView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuView",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuView);

    return currentNestingLevel ? (
      <>
        <RouteBar />

        <div {...attrs}>
          <Plus4U5Elements.IdentificationBlock>
            <Uu5TilesElements.Grid data={props.data.itemList} tileMaxWidth={480} tileMinWidth={310}>
              <MenuItem />
            </Uu5TilesElements.Grid>
          </Plus4U5Elements.IdentificationBlock>
        </div>
      </>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuView };
export default MenuView;
//@@viewOff:exports
