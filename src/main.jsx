import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ PrimeReact FIRST
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


// ✅ Tailwind LAST
import "./index.css"; // এখানে Tailwind আছে

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
