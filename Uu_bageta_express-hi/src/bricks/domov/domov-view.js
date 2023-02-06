//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
function getInfoRow(content, name) {
  return (
    content && (
      <span>
        {name}
        {"\xA0"}
        <strong>{content}</strong>
      </span>
    )
  );
}
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
    const CSS = {
      header: () =>
        Config.Css.css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }),
      paragraph: () =>
        Config.Css.css({
          textAlign: "center",
          fontSize: "1.2rem",
        }),
      image: () =>
        Config.Css.css({
          width: "100%",
          display: "block",
          objectFit: "cover",
        }),
      popis_text: () =>
        Config.Css.css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }),
      button: () =>
        Config.Css.css({
          display: "flex",
          justifyContent: "center",
        }),
    };
    const Tile = createVisualComponent({
      render(props) {
        const { data } = props;

        return (
          <>
            <Uu5TilesElements.Tile
              header={
                <div className={CSS.header()}>
                  <span className={CSS.paragraph()}>
                    <strong>{data.name}</strong>
                  </span>
                  <em>
                    <Uu5Elements.Icon icon="mdi-truck" />
                    <small>
                      {"\xA0"}
                      {data.supplier}
                    </small>
                  </em>
                </div>
              }
              borderRadius="elementary"
            >
              {({ padding }) => {
                return (
                  <>
                    <img src={data.Image} alt={data.name} className={CSS.image(false)} />
                    <div
                      className={Config.Css.css({
                        paddingTop: padding.top,
                        paddingRight: padding.right,
                        paddingBottom: "2rem",
                        paddingLeft: padding.left,
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      })}
                    >
                      <small>
                        <div className={CSS.popis_text()}>
                          {getInfoRow(data.weight + "g", "Hmotnosť:")}
                          {getInfoRow(data.ingredients, "Ingrediencie:")}
                          {getInfoRow(data.allergens + "", "Alergény:")}
                        </div>
                      </small>
                      <div className={CSS.button()}>
                        <Uu5Elements.Button colorScheme="highest" icon="mdi-cart-arrow-down">
                          <Uu5Elements.Text colorScheme="building">Pridať do košíka</Uu5Elements.Text>
                        </Uu5Elements.Button>
                      </div>
                    </div>
                  </>
                );
              }}
            </Uu5TilesElements.Tile>
          </>
        );
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DomovView);
    //console.log (props.data.itemList[0].supplier);
    return currentNestingLevel ? (
      <div {...attrs}>
        <Plus4U5Elements.IdentificationBlock>
          <Uu5TilesElements.Grid data={props.data.itemList} tileMaxWidth={480} tileMinWidth={310}>
            <Tile />
          </Uu5TilesElements.Grid>
          {/* <img src={"http://www.sunfood.sk/images/image-22.jpg"} /> */}
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
