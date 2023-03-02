//@@viewOn:imports
import { createVisualComponent, useSession, useCall, useState, useEffect, useRoute } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../calls.js";
import DetailSummaryProvider from "../bricks/detail-summary/detail-summary-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DeailSummary = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeailSummary",
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
    const { identity } = useSession();
    const [, setRoute] = useRoute();

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
    if (!hasPermissions) return setRoute("menu");
    return <DetailSummaryProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DeailSummary };
export default DeailSummary;
//@@viewOff:exports
