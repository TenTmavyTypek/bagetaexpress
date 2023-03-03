/* eslint-disable prettier/prettier */
//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useCall, useEffect, useState, useSession } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Calls from "../calls.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const { identity } = useSession();

    let { call } = useCall(() => Calls.permissionsGet({ userId: identity.uuIdentity }));

    const [access, setAccess] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      call().then((data) => {
        setIsAdmin(data.isAdmin);
        setAccess(data.access);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    let appActionList = [{ children: "Menu", onClick: () => setRoute("menu") }];
    if (access?.summary) appActionList.push({ children: "Zhrnutie", onClick: () => setRoute("summary") });
    if (access?.detailSummary) appActionList.push({ children: "Detailne zhrnutie", onClick: () => setRoute("detailSummary") });
    if (access?.management) appActionList.push({ children: "Manažment", onClick: () => setRoute("management")});
    if (access?.scan) appActionList.push({ children: "Naskenuj", onClick: () => setRoute("scan") });

    if (isAdmin) appActionList.push({ children: "Objednávka", onClick: () => setRoute("cart") });

    appActionList.push({ children: "O nás", onClick: () => setRoute("about") })
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (<Plus4U5App.RouteBar appActionList={appActionList } {...props}/>);
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
