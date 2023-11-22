import localFont from "next/font/local";

export const gtAmerica = localFont({
  src: [
    {
      path: "../public/fonts/GT-America-Standard-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/GT-America-Standard-Regular-Italic.woff2",
      style: "Italic",
      weight: "400",
    },
    {
      path: "../public/fonts/GT-America-Standard-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/GT-America-Standard-Medium-Italic.woff2",
      style: "Italic",
      weight: "500",
    },
    {
      path: "../public/fonts/GT-America-Standard-Bold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/GT-America-Standard-Bold-Italic.woff2",
      style: "Italic",
      weight: "600",
    },
  ],
  variable: "--font-gt-america",
});

// export const gtAmericaMono = localFont({
//   src: [
//     {
//       path: "../public/fonts/GT-America-Mono-Regular.woff2",
//       style: "normal",
//       weight: "400",
//     },
//     {
//       path: "../public/fonts/GT-America-Mono-Medium.woff2",
//       style: "normal",
//       weight: "500",
//     },
//     {
//       path: "../public/fonts/GT-America-Mono-Bold.woff2",
//       style: "normal",
//       weight: "600",
//     },
//   ],
//   variable: "--font-gt-america-mono",
// });
