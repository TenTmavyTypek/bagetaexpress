//@@viewOn:imports
import { createComponent, useCall, useEffect, useState, useSession, useRoute } from "uu5g05";
import Config from "./config/config.js";
import ScanProvider from "../bricks/scan/scan-provider.js";
import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Scan = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Scan",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const [, setRoute] = useRoute();

    let { call } = useCall(() => Calls.permissionsGet({ userId: identity.uuIdentity }));

    const [hasPermissions, setHasPermissions] = useState();
    useEffect(() => {
      call().then((data) => {
        setHasPermissions(data.hasPermissions);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (hasPermissions === undefined) return null;
    if (!hasPermissions) return setRoute("menu");

    return <ScanProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Scan };
export default Scan;
//@@viewOff:exports
