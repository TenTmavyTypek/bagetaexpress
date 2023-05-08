//@@viewOn:imports
import { createVisualComponent, Utils, useMemo } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SummaryItemLabel = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SummaryItemLabel",
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

    const labels = useMemo(() => {
      const data = props.data.item;

      let labelList = [];

      const showIngredients = data.ingredients
        .map((num) => {
          const value = props.supplier.ingredientsList.find((obj) => obj.ingredientNumber == num);
          return value?.name;
        })
        .join(", ");
      const showAllergens = data.allergens
        .map((num) => {
          const value = props.supplier.allergensList.find((obj) => obj.allergenNumber == num);
          return value?.name;
        })
        .join(", ");

      const formatDate = (unformated) => {
        const yyyy = unformated.getFullYear();
        let mm = unformated.getMonth() + 1;
        let dd = unformated.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        return dd + "." + mm + "." + yyyy;
      };

      const dateFrom = new Date(props.supplier.summaryDatetime);
      const dateTo = new Date(dateFrom.getTime() + 24 * 60 * 60 * 1000);

      const pStyle = { margin: 0, padding: 0, fontSize: "0.8rem" };

      for (let i = 0; i < props.data.numberOrdered; i++) {
        labelList.push(
          <div key={i} style={{ margin: 0, padding: "0.2rem" }}>
            <h2 style={{ margin: 0, paddingBottom: "0.3em", textAlign: "center" }}>{props.supplier.name}</h2>
            <h4 style={{ margin: 0, padding: 0, textDecoration: "underline" }}>{data.name + " " + data.weight} g:</h4>

            <p style={pStyle}>
              <strong>Zloženie: </strong>
              {showIngredients}
            </p>
            <p style={pStyle}>Skladujte pri teplote do 6°C.</p>
            <p style={pStyle}>
              <strong>Výrobok obsahuje: </strong>
              {showAllergens}
            </p>
            <p style={pStyle}>Spotrebujte od-do: {formatDate(dateFrom) + " - " + formatDate(dateTo)}</p>
          </div>
        );
      }

      return labelList;
    }, [props.data, props.supplier]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SummaryItemLabel);

    return currentNestingLevel && props.data.item.supplierId === props.supplier.id ? <>{labels}</> : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryItemLabel };
export default SummaryItemLabel;
//@@viewOff:exports
