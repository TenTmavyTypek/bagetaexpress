//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import MenuForm from "./menu-form.js";
import Config from "./config/config.js";
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

const MenuItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuItem",
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
    const { data } = props.data;
    const [isOpen, setIsOpen] = useState(false);

    const startEdit = () => setIsOpen(true);
    const endEdit = () => setIsOpen(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile
        
          headerColorScheme="yellow" headerSignificance="highlighted"
          header={
            <Uu5Elements.Grid justifyItems="center" alignItems="center" rowGap="0.2rem">
              <Uu5Elements.Text {...title} type="common">
                {data.name}
              </Uu5Elements.Text>
              <Uu5Elements.Text {...content} type="medium">
                <Uu5Elements.Icon icon="mdi-truck" />
                {"\xA0"}
                {data.supplier}
              </Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
          borderRadius="elementary"
        >
          <Uu5Imaging.Image src={data.image} width="100%" shape="rect16x10" />
          <Uu5Elements.Grid flow="column" justifyItems="center" alignItems="center">
            <Uu5Elements.Grid rowGap="0.4rem">
              <Uu5Elements.Text {...title} type="micro">
                Hmotnosť:
                <Uu5Elements.Text {...content}>{" " + data.weight + "g"}</Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Ingrediencie:
                <Uu5Elements.Text {...content}>{" " + data.ingredients + " "}</Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Alergény:
                <Uu5Elements.Text {...content}>{" " + data.allergens + " "}</Uu5Elements.Text>
              </Uu5Elements.Text>
            </Uu5Elements.Grid>

            <Uu5Elements.Text {...title} type="main">
              {data.price + " €"}
            </Uu5Elements.Text>
          </Uu5Elements.Grid>
          {"\xA0"}
          <Uu5Elements.Grid flow="column">
            <Uu5Elements.Button size="xl" colorScheme="yellow" significance="highlighted">
              <Uu5Elements.Text colorScheme="building" {...title} type="large">
                <Uu5Elements.Icon icon="mdi-cart-arrow-right" /> Pridať do košíka
              </Uu5Elements.Text>
            </Uu5Elements.Button>
            <Uu5Elements.Button onClick={startEdit} size="xl" colorScheme="dark-blue" significance="distinct">
              <Uu5Elements.Text colorScheme="building" {...title} type="large">
                Upraviť
              </Uu5Elements.Text>
            </Uu5Elements.Button>
          </Uu5Elements.Grid>
          {"\xA0"}
        </Uu5TilesElements.Tile>
        <Uu5Elements.Modal
          header={"Upravenie bagety"}
          open={isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={true}
        >
          <MenuForm onSave={props.data.handlerMap.updateItem} onClose={endEdit} data={data} />
        </Uu5Elements.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuItem };
export default MenuItem;
//@@viewOff:exports
