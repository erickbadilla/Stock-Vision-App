// next.d.ts

import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
  NextPage,
} from "next";
import type { AppProps } from "next/app";

declare module "next" {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };

  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (component: NextComponentType) => JSX.Element;
  };
}

declare module "next/app" {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}
