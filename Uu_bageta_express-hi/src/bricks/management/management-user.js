//@@viewOn:imports
import { createVisualComponent, Utils, useSession, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const accessNames = {
  summary: "Zhrnutie",
  detailSummary: "Detailné zhrnutie",
  editMenu: "Správa menu",
  management: "Správa účtov",
  scan: "Prevzatie objednávok",
};
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottom: "1px solid #ccc" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ManagementUser = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ManagementUser",
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
    const [access, setAccess] = useState(props.data.data.access);
    const [selectedSupplier, setSelectedSupplier] = useState(
      props.suppliers.find((obj) => props.data.data.supplierId === obj.data.id)?.data
    );
    const { identity } = useSession();
    const { data } = props.data;
    const [hidden, setHidden] = useState(true);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ManagementUser);

    if (!data.userId) return null;
    if (data.userId === identity.uuIdentity) return null;

    return currentNestingLevel ? (
      <div {...attrs}>
        {"\xA0"}
        <Uu5Elements.Grid flow="column" templateColumns={"max-content 1fr"} templateAreas={"id remove, access access"}>
          <Uu5Elements.Grid.Item gridArea="id" justifySelf="flex-start" alignSelf="center">
            <Uu5Elements.Text category="expose" segment="default" type="broad">
              {data.userId}
            </Uu5Elements.Text>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="remove" justifySelf="flex-end" alignSelf="center">
            <Uu5Elements.Button colorScheme="important" significance="highlighted" onClick={() => setHidden(!hidden)}>
              Upraviť práva
            </Uu5Elements.Button>
          </Uu5Elements.Grid.Item>

          <Uu5Elements.Grid.Item gridArea="access" justifySelf="center" alignSelf="center">
            <Uu5Elements.CollapsibleBox collapsed={hidden}>
              <Uu5Elements.Grid flow="row" templateColumns={"1fr 1fr"}>
                {Object.keys(access).map((key, index) => (
                  <>
                    <Uu5Elements.Grid.Item key={index} justifySelf="flex-end" alignSelf="center">
                      <Uu5Elements.Text category="expose" segment="default" type="notice">
                        {accessNames[key]}
                      </Uu5Elements.Text>
                    </Uu5Elements.Grid.Item>
                    <Uu5Elements.Button
                      colorScheme={access[key] ? "red" : "green"}
                      significance="highlighted"
                      onClick={() => setAccess((obj) => ({ ...obj, [key]: !obj[key] }))}
                    >
                      {access[key] ? "zakázať" : "povoliť"}
                    </Uu5Elements.Button>
                  </>
                ))}

                {props.isAdmin && (
                  <>
                    <Uu5Elements.Grid.Item justifySelf="flex-end" alignSelf="center">
                      <Uu5Elements.Text category="expose" segment="default" type="notice">
                        Dodávateľ
                      </Uu5Elements.Text>
                    </Uu5Elements.Grid.Item>
                    <Uu5Elements.Dropdown
                      label={selectedSupplier?.name ?? "Vyber dodávateľa"}
                      itemList={props.suppliers.map(({ data }) => ({
                        children: data.name,
                        onClick: () => setSelectedSupplier(data),
                      }))}
                    />
                  </>
                )}

                {"\xA0"}
              </Uu5Elements.Grid>
              <Uu5Elements.Grid flow="row" templateColumns={"1fr 1fr"}>
                <Uu5Elements.Button
                  colorScheme="negative"
                  size="xl"
                  significance="highlighted"
                  onClick={() => props.data.handlerMap.removePermissions({ userId: data.userId })}
                >
                  Odstrániť
                </Uu5Elements.Button>
                {(JSON.stringify(access) !== JSON.stringify(data.access) ||
                  selectedSupplier?.id !== props.data.data.supplierId) && (
                  <Uu5Elements.Button
                    colorScheme="yellow"
                    size="xl"
                    significance="highlighted"
                    onClick={() => {
                      props.data.handlerMap.updatePermissions({
                        userId: data.userId,
                        supplierId: selectedSupplier.id,
                        access,
                      });
                    }}
                  >
                    Uložiť
                  </Uu5Elements.Button>
                )}
              </Uu5Elements.Grid>
            </Uu5Elements.CollapsibleBox>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
        {"\xA0"}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ManagementUser };
export default ManagementUser;
//@@viewOff:exports
