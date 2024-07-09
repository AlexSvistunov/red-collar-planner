import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/main.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// eventModal add participants, gallery
// auth validation
// create validation
// create select
// create files
// create calendar
// create success & !success
// decomposion
// improve code

// some optional features

// modal view