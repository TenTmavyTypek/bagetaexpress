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

    const [hasPermissions, setHasPermissions] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      call().then((data) => {
        setHasPermissions(data.hasPermissions);
        setIsAdmin(data.isAdmin);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    const appActionListWithouPermissions = [
      { children: "Menu", onClick: () => setRoute("menu") },
      { children: "O nás", onClick: () => setRoute("about") },
    ];
    const appActionListIsAdmin = [
      { children: "Vitajte", onClick: () => setRoute("home") },
      { children: "Zhrnutie", onClick: () => setRoute("summary") },
      { children: "Menu", onClick: () => setRoute("menu") },
      { children: "Košík", onClick: () => setRoute("cart") },
      { children: "Naskenuj", onClick: () => setRoute("scan") },
      { children: "O nás", onClick: () => setRoute("about") },
    ];
    const appActionListWithPermissions = [
      { children: "Zhrnutie", onClick: () => setRoute("summary") },
      { children: "Menu", onClick: () => setRoute("menu") },
      { children: "Naskenuj", onClick: () => setRoute("scan") },
      { children: "O nás", onClick: () => setRoute("about") },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (<Plus4U5App.RouteBar appActionList={
            !hasPermissions 
            ? appActionListWithouPermissions 
            : isAdmin 
            ? appActionListIsAdmin 
            : appActionListWithPermissions 
          } {...props}
            />);
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
