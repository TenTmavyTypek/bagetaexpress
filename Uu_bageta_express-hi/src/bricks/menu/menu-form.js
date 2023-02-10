//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import Uu5Forms from "uu5g05-forms";
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

const MenuForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MenuForm",
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
    const { data } = props;

    const [name, setName] = useState(data.name ?? "");
    const [supplier, setSupplier] = useState(data.supplier ?? "");
    const [weight, setWeight] = useState(data.weight ?? "");
    const [ingredients, setIngredients] = useState(data.ingredients.toString() ?? "");
    const [allergens, setAllergens] = useState(data.allergens.toString() ?? "");
    const [price, setPrice] = useState(data.price ?? "");

    function onSubmit() {
      const toNumArray = (str) => str.split(",").map((x) => parseInt(x));
      const sendData = {
        name,
        supplier,
        weight: parseInt(weight),
        ingredients: toNumArray(ingredients),
        allergens: toNumArray(allergens),
        price: parseFloat(price.replace(",", ".")),
      };
      console.log(sendData);
      //props.onSave(sendData);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MenuForm);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <Uu5Imaging.Image src={data.image} width="100%" shape="rect16x10" />
            <Uu5Elements.Grid flow="row" justifyItems="center" alignItems="center">
              <Uu5Elements.Grid
                rowGap={10}
                columnGap={16}
                justifyItems="flex-end"
                alignItems="center"
                templateColumns="auto 1fr"
              >
                <Uu5Elements.Text {...title} type="micro">
                  {"Názov: "}
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input {...content} value={name} onChange={(x) => setName(x.data.value)} type="large" />
                <Uu5Elements.Text {...title} type="micro">
                  {"Doávateľ: "}
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input
                  {...content}
                  value={supplier}
                  onChange={(x) => setSupplier(x.data.value)}
                  type="large"
                />
                <Uu5Elements.Text {...title} pattern="\d*\.?\,?\d*" validateOnChange={true} type="micro">
                  {"Cena: "}
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input {...content} value={price} onChange={(x) => setPrice(x.data.value)} type="large" />
                <Uu5Elements.Text {...title} type="micro">
                  {"Hmotnosť (g): "}
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input
                  {...content}
                  value={weight}
                  onChange={(x) => setWeight(x.data.value)}
                  type="large"
                />
                <Uu5Elements.Text {...title} type="micro">
                  Ingrediencie:
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input
                  {...content}
                  value={ingredients}
                  onChange={(x) => setIngredients(x.data.value)}
                  type="large"
                />
                <Uu5Elements.Text {...title} type="micro">
                  Alergény:
                </Uu5Elements.Text>
                <Uu5Forms.Text.Input
                  {...content}
                  value={allergens}
                  onChange={(x) => setAllergens(x.data.value)}
                  type="large"
                />
              </Uu5Elements.Grid>

              <Uu5Elements.Grid flow="column">
                <Uu5Forms.CancelButton size="xl" onClick={props.onClose}>
                  Zrušiť
                </Uu5Forms.CancelButton>
                <Uu5Forms.SubmitButton size="xl"> Upravit item </Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MenuForm };
export default MenuForm;
//@@viewOff:exports
