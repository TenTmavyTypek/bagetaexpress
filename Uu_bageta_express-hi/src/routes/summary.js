//@@viewOn:imports
import { createComponent, useCall, useEffect, useState, useSession } from "uu5g05";
import Config from "./config/config.js";
import SummaryProvider from "../bricks/summary/summary-provider.js";
import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Summary = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Summary",
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

    let { call } = useCall(() => Calls.permissionsGet({ userId: identity.uuIdentity }));

    const [hasPermissions, setHasPermissions] = useState(false);
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
    if (!hasPermissions) return <></>;
    return <SummaryProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Summary };
export default Summary;
//@@viewOff:exports
