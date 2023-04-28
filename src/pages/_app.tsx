import { MainLayout } from "@/common/layouts/main/main.layout";
import "@/styles/globals.css";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";

import { Roboto_Slab } from "next/font/google";
import { ReactNode } from "react";
import { ToasterProvider } from "@/common/contexts/toaster/provider/toaster.context";

const RobotoSlab = Roboto_Slab({
  subsets: [],
  weight: ["400", "600", "700", "800"],
  display: "auto",
});

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}) => {
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => <MainLayout>{page}</MainLayout>);

  return getLayout(
    <>
      <style jsx global>{`
        html {
          font-family: ${RobotoSlab.style.fontFamily};
        }
      `}</style>

      <ToasterProvider>
        <Component {...pageProps} />
      </ToasterProvider>
    </>
  );
};

export default App;
