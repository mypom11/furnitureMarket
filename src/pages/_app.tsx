import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import Layout from "@/components/UI/Layout";
import { Noto_Sans_KR, Roboto, Rouge_Script } from "next/font/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import wrapper from "@/store";
import MyCart from "@/components/MyCart";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--notoSans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--roboto",
});

const rouge = Rouge_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--rouge-script",
});

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ThemeProvider attribute="class">
      <div
        className={`${cls(
          notoSansKr.variable,
          roboto.variable,
          rouge.variable,
        )} bg-light dark:bg-dark`}
      >
        <Provider store={store}>
          <Header />
          <Layout>
            <Component {...props} />
          </Layout>
          <MyCart />
          <Footer />
        </Provider>
      </div>
    </ThemeProvider>
  );
}
