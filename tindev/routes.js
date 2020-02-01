import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { Login, Main } from "./src/pages/index";

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main
  })
);
