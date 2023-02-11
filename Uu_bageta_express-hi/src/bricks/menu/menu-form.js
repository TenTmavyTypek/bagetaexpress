//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
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

    const item = {
      name: props.data.name,
      supplier: props.data.supplier,
      ingredients: props.data.ingredients,
      weight: props.data.weight,
      price: props.data.price,
      allergens: props.data.allergens,
      image: props.data.image,
    };
    const itemValidate = {
      ingredients: true,
      weight: true,
      price: true,
      allergens: true,
    };

    function onSubmit() {
      if (!itemValidate.ingredients || !itemValidate.weight || !itemValidate.price || !itemValidate.allergens) return;

      const toNumArray = (str) => str.split(",").map((x) => parseInt(x));
      const sendData = {
        itemId: data.id,
        name: item.name,
        supplier: item.supplier,
        weight: parseInt(item.weight),
        ingredients: toNumArray(item.ingredients.toString()),
        allergens: toNumArray(item.allergens.toString()),
        price: parseFloat(item.price.toString().replace(",", ".")),
      };
      props.onSave(sendData);
    }

    function withControlledInput(Input) {
      return (props) => {
        const { value: propsValue, onChange, onValidationStart, onValidationEnd } = props;

        const [value, setValue] = useState(propsValue);
        const [errorList, setErrorList] = useState(null);

        return (
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
                justifyItems="end"
                alignItems="center"
                templateColumns="auto 1fr"
              >
                <Uu5Elements.Text {...title} type="micro">
                  {"Názov: "}
                </Uu5Elements.Text>
                <TextInput value={item.name} onChange={(x) => (item.name = x.data.value)} />
                <Uu5Elements.Text {...title} type="micro">
                  {"Doávateľ: "}
                </Uu5Elements.Text>
                <TextInput value={item.supplier} onChange={(x) => (item.supplier = x.data.value)} />
                <Uu5Elements.Text {...title} type="micro">
                  {"Cena: "}
                </Uu5Elements.Text>
                <TextInput
                  value={item.price}
                  pattern="^[0-9]+\.?\,?[0-9]*$"
                  validateOnChange
                  onValidationEnd={(e) => (itemValidate.price = e.data.errorList.length ? false : true)}
                  onChange={(x) => (item.price = x.data.value)}
                />
                <Uu5Elements.Text {...title} type="micro">
                  {"Hmotnosť (g): "}
                </Uu5Elements.Text>
                <TextInput
                  value={item.weight}
                  pattern="^[0-9]+$"
                  validateOnChange
                  onValidationEnd={(e) => (itemValidate.weight = e.data.errorList.length ? false : true)}
                  onChange={(x) => (item.weight = x.data.value)}
                />
                <Uu5Elements.Text {...title} type="micro">
                  Ingrediencie:
                </Uu5Elements.Text>
                <TextInput
                  value={item.ingredients}
                  pattern="^([a-zA-Z]+\ *\,?\ *)*$"
                  validateOnChange
                  onValidationEnd={(e) => (itemValidate.ingredients = e.data.errorList.length ? false : true)}
                  onChange={(x) => (item.ingredients = x.data.value)}
                />
                <Uu5Elements.Text {...title} type="micro">
                  Alergény:
                </Uu5Elements.Text>
                <TextInput
                  value={item.allergens}
                  pattern="^([0-9]+\ *\,?\ *)*$"
                  validateOnChange
                  onValidationEnd={(e) => (itemValidate.allergens = e.data.errorList.length ? false : true)}
                  onChange={(x) => (item.allergens = x.data.value)}
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
