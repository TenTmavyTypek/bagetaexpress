//@@viewOn:imports
import { createVisualComponent, Utils, useState, useContext } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import MenuForm from "./menu-form.js";
import { CartContext } from "./menu-view.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
const content = { category: "interface", segment: "content" };
const wordIngredients = [
  " dressing",
  " paradajka",
  " uhorka",
  " vajce",
  " šunka",
  " syr",
  " čínska kapusta",
  " klobása",
  " chilli",
  " údený syr",
  " kuracie nugetky",
  " kukurica",
  " údené mäso",
];
const wordAllergens = [
  " obilniny",
  " kôrovce",
  " vajcia",
  " ryby",
  " arašídy",
  " sója",
  " laktóza",
  " orechy",
  " zelér",
  " horčica",
  " sezam",
];
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
    const { addToOrder, orderExists, newItem } = useContext(CartContext);

    const { data } = props.data;
    if (data?.id === undefined) return <></>;

    const [isOpen, setIsOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);

    const startEdit = () => setIsOpen(true);
    const endEdit = () => setIsOpen(false);
    const showInfo = () => setInfoOpen(true);
    const hideInfo = () => setInfoOpen(false);
    const endWarning = () => setWarningOpen(false);
    const startWarning = () => setWarningOpen(true);

    const showIngredients = data.ingredients.map((item) => wordIngredients[item - 1]);
    const showAllergens = data.allergens.map((item) => wordAllergens[item - 1]);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile
          headerColorScheme="yellow"
          headerSignificance="highlighted"
          borderRadius="elementary"
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
                <Uu5Elements.Text {...content}>
                  {" " + data.ingredients + " "}
                  <Uu5Elements.Icon icon="mdi-information-outline" onClick={showInfo} tooltip="Viac.." />
                </Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Alergény:
                <Uu5Elements.Text {...content}>
                  {" " + data.allergens + " "}
                  <Uu5Elements.Icon icon="mdi-information-outline" onClick={showInfo} tooltip="Viac.." />
                </Uu5Elements.Text>
              </Uu5Elements.Text>
            </Uu5Elements.Grid>

            <Uu5Elements.Grid>
              <Uu5Elements.Grid.Item justifySelf="center" alignSelf="end">
                <Uu5Elements.Text {...title} type="main">
                  {data.price + " €"}
                </Uu5Elements.Text>
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item justifySelf="center" alignSelf="start">
                <Uu5Elements.Text {...content} colorScheme="grey">
                  {"bez DPH " + (data.price * 0.8).toFixed(2) + " €"}
                </Uu5Elements.Text>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid>
          {"\xA0"}
          <Uu5Elements.Grid flow="column">
            {!orderExists && (props.isAdmin || !props.hasPermissions) && (
              <Uu5Elements.Button
                onClick={() => {
                  addToOrder(data);
                  newItem();
                }}
                size="xl"
                colorScheme="yellow"
                significance="highlighted"
              >
                <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                  <Uu5Elements.Icon icon="mdi-cart-arrow-right" /> Pridať do košíka
                </Uu5Elements.Text>
              </Uu5Elements.Button>
            )}
            {props.hasPermissions && (
              <>
                <Uu5Elements.Button onClick={startEdit} size="xl" colorScheme="dark-blue" significance="distinct">
                  <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                    Upraviť
                  </Uu5Elements.Text>
                </Uu5Elements.Button>
                <Uu5Elements.Button onClick={startWarning} size="xl" colorScheme="dark-blue" significance="distinct">
                  <Uu5Elements.Text colorScheme="building" {...title}>
                    Odstrániť
                  </Uu5Elements.Text>
                </Uu5Elements.Button>
              </>
            )}
          </Uu5Elements.Grid>
          {"\xA0"}
        </Uu5TilesElements.Tile>

        <Uu5Elements.Modal //Edit item modal
          open={isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={false}
          onClose={() => setIsOpen(false)}
          header={
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text>Upravenie položky</Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
        >
          <MenuForm onSave={props.data.handlerMap.updateItem} onClose={endEdit} data={data} />
        </Uu5Elements.Modal>
        <Uu5Elements.Modal //Info modal
          open={infoOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={false}
          onClose={() => setInfoOpen(false)}
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
        >
          <Uu5Imaging.Image src={data.image} width="100%" shape="rect16x10" />
          <Uu5Elements.Grid flow="column" justifyItems="center" alignItems="center">
            <Uu5Elements.Grid rowGap="0.4rem">
              <Uu5Elements.Text {...title} type="micro">
                Hmotnosť:
                <Uu5Elements.Text {...content} type="medium">
                  {" " + data.weight + "g"}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Ingrediencie:
                <Uu5Elements.Text {...content} type="medium">
                  {" " + showIngredients}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Alergény:
                <Uu5Elements.Text {...content} type="medium">
                  {" " + showAllergens}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
            </Uu5Elements.Grid>

            <Uu5Elements.Text {...title} type="main">
              {data.price + " €"}
            </Uu5Elements.Text>
          </Uu5Elements.Grid>
          <Uu5Elements.Grid justifyContent="center">
            {"\xA0"}
            <Uu5Elements.Button size="xl" onClick={hideInfo}>
              Zatvoriť
            </Uu5Elements.Button>
          </Uu5Elements.Grid>
        </Uu5Elements.Modal>

        <Uu5Elements.Modal
          open={warningOpen}
          headerSeparator={false}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={false}
          onClose={() => setWarningOpen(false)}
          header={
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text>Určite chcete odstrániť túto položku z ponuky?</Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
        >
          <Uu5Elements.Grid justifyContent="center" templateColumns="1fr 1fr">
            <Uu5Elements.Button onClick={endWarning}>Zrušiť</Uu5Elements.Button>
            <Uu5Elements.Button
              colorScheme="negative"
              significance="highlighted"
              onClick={() => props.data.handlerMap.deleteItem({ itemId: data.id })}
            >
              Odstrániť položku
            </Uu5Elements.Button>
          </Uu5Elements.Grid>
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
