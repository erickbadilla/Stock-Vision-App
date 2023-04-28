import "styled-components";

import { theme } from "../infrastructure/theme";

type ITheme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
