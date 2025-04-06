import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {process.env.USE_FAKER == "YES" && (
          <Script src="./js/faker.js" strategy="beforeInteractive"></Script>
        )}
      </body>
    </Html>
  );
}
