//@@viewOn:imports
import { createComponent, useCall, useEffect, useState, useSession, useRoute } from "uu5g05";
import Calls from "../calls.js";
import BlacklistProvider from "../bricks/blacklist/blacklist-provider.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Blacklist = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Blacklist",
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

    const [access, setAccess] = useState();
    useEffect(() => {
      call().then((data) => {
        setAccess(data.access);
      });
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (access === undefined) return null;
    if (!access.scan) return setRoute("menu");

    return <BlacklistProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Blacklist };
export default Blacklist;
//@@viewOff:exports
