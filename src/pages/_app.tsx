import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { montserrat } from "@lib/fonts";
import "../app/globals.css";

function App({ Component, pageProps }: AppProps) {
 return (
  <div className={`${montserrat.variable} bg-tw-black text-tw-white`}>
   <Component {...pageProps} />
   <Analytics />
  </div>
 );
}

export default App;
