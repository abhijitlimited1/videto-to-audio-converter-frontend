import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Add at the bottom of the file
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js", { scope: "/" })
//       .then((registration) => {
//         // console.log("SW registered:", registration);
//       })
//       .catch((error) => {
//         // console.log("SW registration failed:", error);
//       });
//   });
// }
// // Replace existing registration code with:
// if ("serviceWorker" in navigator && import.meta.env.PROD) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js").catch(() => {}); // Silently fail without logging
//   });
// }
