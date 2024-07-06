import { useEffect, useState } from "react";
import { URL } from "./api/url";
import Calendar from "./components/MyCalendar";
import "./index.css";
import "./App.scss";

import "./styles/calendar-styles-sass/styles.scss";
import Button from "./components/ui/Button/Button";

const App = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/api/events/`);
      const data = await response.json();
      setEvents(data.data);
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      <div className="container">
        <div className="app__header">
          <div className="app__logo-wrapper">
            <img src="/logo.svg" alt="red collar" />
            <img src="/planner-logo.svg" alt="planner event" />
          </div>

          <div className="app__header-right">
            <div className="app__header-month">
              <span>Сентябрь</span>
              <button>left</button>
              <button>right</button>
            </div>

            {/* <button className="app__header-login">Войти</button> */}
            <Button>
              Войти
            </Button>

          </div>
        </div>
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default App;
