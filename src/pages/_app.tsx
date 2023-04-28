import { MainLayout } from "@/common/layouts/main/main.layout";
import "@/styles/globals.css";
import {
  AppContext,
  AppInitialProps,
  AppLayoutProps,
  AppProps,
} from "next/app";
import type { NextComponentType } from "next";

import { Roboto_Slab } from "next/font/google";
import { ReactNode } from "react";
import { ToasterProvider } from "@/common/contexts/toaster/provider/toaster.context";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/common/utils/emotion/create-emotion-cache";

export interface IAppProps extends AppLayoutProps {
  emotionCache?: EmotionCache;
}

const RobotoSlab = Roboto_Slab({
  subsets: [],
  weight: ["400", "600", "700", "800"],
  display: "auto",
});

const clientSideEmotionCache = createEmotionCache();

const App: NextComponentType<AppContext, AppInitialProps, IAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
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

      <CacheProvider value={emotionCache}>
        <ToasterProvider>
          <Component {...pageProps} />
        </ToasterProvider>
      </CacheProvider>
    </>
  );
};

export default App;
