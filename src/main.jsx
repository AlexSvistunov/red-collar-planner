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


// step 1 + modal close
// закрытие модалки с watch event
// участники в модалке
// если выходим, то не обновляюся красные точки, и если зайдем, тоже, а также когда присоединяюсь
// присоед. работает с кружком
// eventModal add participants, gallery
// auth validation
// create validation
// create select
// create files
// create calendar
// create success & !success
// decomposion
// improve code
// some optional features (hover, etc)
// modal view overflow
// swiper pagination, navigation out of the swiper
// wrong password (rejected, fullfilled)
// clear steps after an action
// clear states(inputValue
// auth events update
// focus placeholder
// green border
// disabled btn validation
// create validation