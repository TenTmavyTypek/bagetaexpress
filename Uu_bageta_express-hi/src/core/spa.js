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

import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP_IS_ADMIN = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  about: (props) => <About {...props} />,
  summary: (props) => <Summary {...props} />,
  menu: (props) => <Menu {...props} />,
  cart: (props) => <Cart {...props} />,
  scan: (props) => <Scan {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};
const ROUTE_MAP_WITH_PERMISSIONS = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  about: (props) => <About {...props} />,
  summary: (props) => <Summary {...props} />,
  menu: (props) => <Menu {...props} />,
  scan: (props) => <Scan {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};
const ROUTE_MAP_WITHOUT_PERMISSIONS = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  about: (props) => <About {...props} />,
  menu: (props) => <Menu {...props} />,
  cart: (props) => <Cart {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
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
      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]}>
        <Uu5Elements.ModalBus>
          <Plus4U5App.Spa routeMap={ROUTE_MAP_IS_ADMIN} />
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
