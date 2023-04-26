//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import { Environment } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
const title = { category: "interface", segment: "title" };
const content = { category: "interface", segment: "content" };
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottom: "1px solid #ccc", paddingTop: "1rem" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const CartItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CartItem",
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
    const item = props.data.item;
    let supplierResult = useCall((supplierId) => Calls.supplierGet({ supplierId }));

    useEffect(() => {
      supplierResult.call(item.supplierId).then((supplier) => {
        props.setOrderDeadline((date) =>
          date > new Date(supplier.summaryDatetime) || date === undefined ? new Date(supplier.summaryDatetime) : date
        );
      });
      props.setPrice((oldPrice) => oldPrice + item.price * props.data.numberOrdered);
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CartItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Grid
          flow="column"
          templateColumns={{ xs: "100%", m: "0.2fr 1fr 1fr 0.2fr" }}
          templateAreas={{
            xs: `img, heading, content, price, count`,
            m: `
          count img heading price,
          count img content price`,
          }}
          rowGap={{ xs: "2rem", m: "1rem" }}
        >
          <Uu5Elements.Grid.Item alignSelf="center" gridArea="img">
            <Uu5Imaging.Image src={`${Environment.appBaseUri}item/getImage?code=${item.image}`} shape="rect2x1" />
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="heading" justifySelf="center" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="lead">
              {item.name}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="content" alignSelf="center">
            <Uu5Elements.Grid rowGap="0.1rem" justifyContent="center" justifyItems="center">
              <Uu5Elements.Text {...title} type="micro">
                Hmotnosť:
                <Uu5Elements.Text {...content} type="large">
                  {" "}
                  {item.weight + "g"}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Ingrediencie:
                <Uu5Elements.Text {...content} type="large">
                  {" "}
                  {item.ingredients.join(", ") + " "}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
              <Uu5Elements.Text {...title} type="micro">
                Alergény:
                <Uu5Elements.Text {...content} type="large">
                  {" "}
                  {item.allergens.join(", ") + " "}
                </Uu5Elements.Text>
              </Uu5Elements.Text>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="price" justifySelf="center" alignSelf="center">
            <Uu5Elements.Grid justifyItems="center">
              <Uu5Elements.Text category="expose" segment="default" type="lead">
                {item.price * props.data.numberOrdered}€{"\xA0"}
              </Uu5Elements.Text>
            </Uu5Elements.Grid>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item gridArea="count" justifySelf="center" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="lead">
              {props.data.numberOrdered}x
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CartItem };
export default CartItem;
//@@viewOff:exports
