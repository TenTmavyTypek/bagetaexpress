/* eslint-disable no-unused-vars */
//@@viewOn:imports
import { createVisualComponent, Utils, useCall, useEffect, useState, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Home from "../routes/home.js";
import Menu from "../routes/menu.js";
import Cart from "../routes/cart.js";
import Scan from "../routes/scan.js";
import Summary from "../routes/summary.js";
import Management from "../routes/management.js";
import DeailSummary from "../routes/deail-summary.js";
import Blacklist from "../routes/blacklist.js";

import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "menu" },
  home: (props) => <Home {...props} />,
  about: (props) => <About {...props} />,
  summary: (props) => <Summary {...props} />,
  detailSummary: (props) => <DeailSummary {...props} />,
  menu: (props) => <Menu {...props} />,
  management: (props) => <Management {...props} />,
  cart: (props) => <Cart {...props} />,
  scan: (props) => <Scan {...props} />,
  blacklist: (props) => <Blacklist {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider>
        <Uu5Elements.ModalBus>
          <Plus4U5App.Spa routeMap={ROUTE_MAP} />
        </Uu5Elements.ModalBus>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
