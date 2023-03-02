//@@viewOn:imports
import { createComponent, useSession, useState, useEffect, useRoute, useCall } from "uu5g05";
import { Pending } from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../calls.js";
import ManagementProvider from "../bricks/management/management-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Management = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Management",
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

    return <ManagementProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Management };
export default Management;
//@@viewOff:exports
