//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
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

const DomovView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DomovView",
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
    const { children } = props;
    const COLUMN_LIST = [
      {value: "supplier", header: "Dodávateľ"},
      {value: "supplierLogo", header: ""},
      {value: "name", header: "Názov"},
      {value: "ingredients", header: "Ingrediencie"},
      {value: "weight", header: "Hmotnosť"},
      {value: "allergens", header: "Alergény"},
      {value: "Storage", header: "Skladovanie"},
      {value: "Image", header: "Obrazok"},
    ]
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DomovView);
    console.log (props.data.itemList[0].supplier);
    return currentNestingLevel ? (
      <div {...attrs}>
        <Plus4U5Elements.IdentificationBlock>
        <Uu5TilesElements.Table columnList={COLUMN_LIST} data={props.data.itemList}/>
        </Plus4U5Elements.IdentificationBlock>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DomovView };
export default DomovView;
//@@viewOff:exports
