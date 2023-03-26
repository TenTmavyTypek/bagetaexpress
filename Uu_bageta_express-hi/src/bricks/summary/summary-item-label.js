//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useEffect, useState } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
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
    let { call, state } = useCall(() => Calls.itemGet({ itemId: props.data.itemId }));

    const [labels, setLabels] = useState();
    const [data, setData] = useState();
    useEffect(() => {
      call().then((data) => {
        let labelList = [];

        const showIngredients = data.ingredients
          .map((num) => {
            const value = props.supplier.ingredientsList.find((obj) => obj.ingretientNumber == num);
            return value !== undefined ? value.name : undefined;
          })
          .join(", ");
        const showAllergens = data.allergens
          .map((num) => {
            const value = props.supplier.allergensList.find((obj) => obj.allergenNumber === num);
            return value !== undefined ? value.name : undefined;
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
            <div style={{ margin: 0, padding: "0.2rem" }}>
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

        setLabels(labelList);
        setData(data);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SummaryItemLabel);

    return currentNestingLevel && state == "ready" && data !== undefined ? (
      data.supplierId === props.supplier.id && labels !== undefined ? (
        <>{labels}</>
      ) : null
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SummaryItemLabel };
export default SummaryItemLabel;
//@@viewOff:exports
