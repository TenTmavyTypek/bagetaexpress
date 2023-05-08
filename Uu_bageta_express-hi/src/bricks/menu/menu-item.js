//@@viewOn:imports
import { createVisualComponent, Utils, useState, useContext, useScreenSize } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import { Environment } from "uu5g05";
import MenuForm from "./menu-form.js";
import { CartContext } from "./menu-wrapper.js";
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
    const { addToOrder, orderExists, cartOpen } = useContext(CartContext);
    const isBeforeDeadline = new Date(props.supplier.summaryDatetime) > new Date();

    const { data } = props.data;
    if (data?.id === undefined) return <></>;

    const [editOpen, setEditOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);

    const toggleEdit = () => setEditOpen(!editOpen);
    const toggleInfo = () => setInfoOpen(!infoOpen);
    const toggleWarning = () => setWarningOpen(!warningOpen);

    const [screenSize] = useScreenSize();

    const showIngredients = data.ingredients
      .map((num) => {
        const value = props.supplier.ingredientsList.find((obj) => obj.ingredientNumber == num);
        return value !== undefined ? value.name : undefined;
      })
      .join(", ");

    const showAllergens = data.allergens
      .map((num) => {
        const value = props.supplier.allergensList.find((obj) => obj.allergenNumber == num);
        return value !== undefined ? value.name : undefined;
      })
      .join(", ");

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
            <Uu5Elements.Grid
              templateColumns={screenSize === "xs" || screenSize === "s" ? "1fr 1fr" : "1fr"}
              alignItems="center"
            >
              <Uu5Elements.Grid justifyItems="center" alignItems="center" rowGap="0.2rem">
                <Uu5Elements.Text {...title} type="common">
                  {data.name}
                </Uu5Elements.Text>
                <Uu5Elements.Text {...content} type="medium">
                  <Uu5Elements.Icon icon="mdi-truck" />
                  {"\xA0"}
                  {props.supplier.name}
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
              {(screenSize === "xs" || screenSize === "s") && (
                <Uu5Elements.Button onClick={toggleInfo} size="xl" colorScheme="dark-blue" significance="distinct">
                  <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                    Zobraziť viac
                  </Uu5Elements.Text>
                </Uu5Elements.Button>
              )}
            </Uu5Elements.Grid>
          }
        >
          <Uu5Elements.Grid
            templateColumns={"1fr 1fr"}
            templateAreas={
              screenSize === "xs" || screenSize === "s"
                ? "img img, price buttons"
                : "img img, detail price, buttons buttons"
            }
          >
            <Uu5Elements.Grid.Item gridArea="img">
              <Uu5Imaging.Image src={`${Environment.appBaseUri}item/getImage?code=${data.image}`} width="100%" />
              {/* <Uu5Imaging.Image src={data.image} width="100%" shape="rect16x10" /> */}
            </Uu5Elements.Grid.Item>
            {!(screenSize === "xs" || screenSize === "s") && (
              <Uu5Elements.Grid.Item gridArea="detail">
                <Uu5Elements.Grid rowGap="0.4rem">
                  <Uu5Elements.Text {...title} type="micro">
                    Hmotnosť:
                    {" " + data.weight} g
                  </Uu5Elements.Text>
                  <Uu5Elements.Text {...title} type="micro">
                    Ingrediencie:
                    {" " + data.ingredients.join(", ") + " "}
                    <Uu5Elements.Icon icon="mdi-information-outline" onClick={toggleInfo} tooltip="Viac.." />
                  </Uu5Elements.Text>

                  <Uu5Elements.Text {...title} type="micro">
                    Alergény:
                    {" " + data.allergens.join(", ") + " "}
                    <Uu5Elements.Icon icon="mdi-information-outline" onClick={toggleInfo} tooltip="Viac.." />
                  </Uu5Elements.Text>
                </Uu5Elements.Grid>
              </Uu5Elements.Grid.Item>
            )}
            <Uu5Elements.Grid.Item gridArea="price" justifySelf="center">
              <Uu5Elements.Grid justifyContent="center">
                <Uu5Elements.Text {...title} type="main">
                  {data.price + " €"}
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
              <Uu5Elements.Grid justifyContent="center">
                <Uu5Elements.Text {...content} colorScheme="grey" type="small">
                  {"bez DPH " + (data.price * 0.8).toFixed(2) + " €"}
                </Uu5Elements.Text>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>

            <Uu5Elements.Grid.Item gridArea="buttons">
              <Uu5Elements.Grid flow="row">
                {(props.isAdmin || !props.hasPermissions) && (
                  <Uu5Elements.Button
                    onClick={() => {
                      cartOpen();
                      addToOrder(data);
                    }}
                    disabled={orderExists || !isBeforeDeadline}
                    size="xl"
                    colorScheme="yellow"
                    significance="highlighted"
                  >
                    <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                      <Uu5Elements.Icon icon="mdi-cart-arrow-right" /> Pridať do košíka
                    </Uu5Elements.Text>
                  </Uu5Elements.Button>
                )}
              </Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
          {"\xA0"}
          {props.editMenu && (
            <Uu5Elements.Grid flow="column">
              <Uu5Elements.Button onClick={toggleEdit} size="xl" colorScheme="dark-blue" significance="distinct">
                <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                  Upraviť
                </Uu5Elements.Text>
              </Uu5Elements.Button>
              <Uu5Elements.Button onClick={toggleWarning} size="xl" colorScheme="dark-blue" significance="distinct">
                <Uu5Elements.Text colorScheme="building" {...title} type="micro">
                  Odstrániť
                </Uu5Elements.Text>
              </Uu5Elements.Button>
            </Uu5Elements.Grid>
          )}
          {"\xA0"}
        </Uu5TilesElements.Tile>

        {/* Edit item modal */}

        <Uu5Elements.Modal
          open={editOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={false}
          onClose={() => setEditOpen(false)}
          header={
            <Uu5Elements.Grid justifyContent="center">
              <Uu5Elements.Text>Upravenie položky</Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
        >
          <MenuForm
            supplier={props.supplier}
            onSave={props.data.handlerMap.updateItem}
            onClose={toggleEdit}
            data={data}
          />
        </Uu5Elements.Modal>

        {/* Information modal */}

        <Uu5Elements.Modal
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
                {props.supplier.name}
              </Uu5Elements.Text>
            </Uu5Elements.Grid>
          }
        >
          <Uu5Imaging.Image src={`${Environment.appBaseUri}item/getImage?code=${data.image}`} width="100%" />
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
            <Uu5Elements.Button size="xl" onClick={toggleInfo}>
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
            <Uu5Elements.Button onClick={toggleWarning}>Zrušiť</Uu5Elements.Button>
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
