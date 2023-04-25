import Uu_bageta_express from "Uu_bageta_express-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`Uu_bageta_express.Bricks.Scan.ScanShowOrder`, () => {
  testProperties(Uu_bageta_express.Bricks.Scan.ScanShowOrder, CONFIG);
});
