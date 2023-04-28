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
import { ThemeProvider } from "@mui/material";

export interface IAppProps extends AppLayoutProps {
  emotionCache?: EmotionCache;
}

const RobotoSlab = Roboto_Slab({
  subsets: [],
  weight: ["400", "600", "700", "800"],
  display: "auto",
});

const clientSideEmotionCache = createEmotionCache();

const theme = {};

const App: NextComponentType<AppContext, AppInitialProps, IAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => <MainLayout>{page}</MainLayout>);

  return (
    <CacheProvider value={emotionCache}>
      {getLayout(
        <>
          <style jsx global>{`
            html {
              font-family: ${RobotoSlab.style.fontFamily};
            }
          `}</style>

          <ThemeProvider theme={theme}>
            <ToasterProvider>
              <Component {...pageProps} />
            </ToasterProvider>
          </ThemeProvider>
        </>
      )}
    </CacheProvider>
  );
};

export default App;
