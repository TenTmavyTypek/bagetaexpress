//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import UU5 from "uu5g04";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import DomovView from "../domov/domov-view";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DomovProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DomovProvider",
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

    function itemList(){
      return Calls.itemList();
    }
    //@@viewOff:private

    //@@viewOn:hooks
    const callResult = useDataObject({
      handlerMap: {
        load: itemList
      },
    })
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap, errorData} = callResult;
    
    switch (state) {
      case "pendingNoData":
      case "pending" :
        return "Loading"
      case "ready" :
      case "readyNoData" :
        return <DomovView data={data} />
    }


    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DomovProvider };
export default DomovProvider;
//@@viewOff:exports
