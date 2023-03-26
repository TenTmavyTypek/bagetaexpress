//@@viewOn:imports
import { createVisualComponent, Utils, useState, useEffect } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import MenuItem from "./menu-item.js";
import MenuForm from "./menu-form.js";
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
    const [isOpen, setIsOpen] = useState(false);

    const startEdit = () => setIsOpen(true);
    const endEdit = () => setIsOpen(false);

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
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuView);

    return currentNestingLevel ? (
      <div {...attrs}>
        {(props.isAdmin || !props.hasPermissions) && (
          <Uu5Elements.Grid justifyContent="center" alignContent="center">
            <Uu5Elements.Text category="expose" segment="default" type="lead">
              {days + " : " + hours + " : " + minutes + " : " + seconds}
            </Uu5Elements.Text>
            {"\xA0"}
          </Uu5Elements.Grid>
        )}
        <Uu5TilesElements.Grid data={props.data} tileMaxWidth={450} tileMinWidth={350}>
          <MenuItem
            supplier={props.supplier}
            hasPermissions={props.hasPermissions}
            editMenu={props.editMenu}
            isAdmin={props.isAdmin}
          />
        </Uu5TilesElements.Grid>
        {props.hasPermissions && (
          <Uu5Elements.Grid justifyContent="center" alignContent="center">
            {"\xA0"}
            <Uu5Elements.Button
              onClick={startEdit}
              size="xl"
              icon="mdi-plus"
              colorScheme="dark-blue"
              significance="distinct"
            >
              Pridať položku
            </Uu5Elements.Button>
          </Uu5Elements.Grid>
        )}
        {"\xA0"}

        <Uu5Elements.Modal
          open={isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={false}
          onClose={() => setIsOpen(false)}
          header={
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text>Pridanie položky</Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
        >
          <MenuForm supplier={props.supplier} onSave={props.createItem} onClose={endEdit} />
        </Uu5Elements.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuView };
export default MenuView;
//@@viewOff:exports
