import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document component to augment the application's `<html>` and `<body>` tags.
 * @returns {React.ReactElement} The rendered document structure.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
