import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/shared/router-head/router-head';

import './global.css';

// useVisibleTask$(() => {
//   console.log(
//     "%c🔍 Qwik Click-To-Source",
//     "background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;",
//     "Fix for Windows"
//   );
//   (globalThis as any).qwikOpenInEditor = function (path: string) {
//     const resolvedURL = new URL(path, "http://localhost:5174");
//     if (resolvedURL.origin === "http://localhost:5174") {
//       const params = new URLSearchParams();
//       const srcDir = (globalThis as any).qwikdevtools.srcDir;
//       params.set("file", srcDir + resolvedURL.pathname);
//       fetch("/__open-in-editor?" + params.toString());
//     } else {
//       location.href = resolvedURL.href;
//     }
//   };
// });


export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
