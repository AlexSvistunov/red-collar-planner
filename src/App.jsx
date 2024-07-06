import { useEffect, useState } from "react";
import { URL } from "./api/url";
import Calendar from "./components/MyCalendar";
import "./index.css";
import "./App.scss";

import "./styles/calendar-styles-sass/styles.scss";
import Button from "./components/ui/Button/Button";
import AuthModal from "./components/ui/AuthModal/AuthModal";

const App = () => {
  const [events, setEvents] = useState([]);
  const [isModalActive, setIsModalActive] = useState(true);
  const [step, setStep] = useState(0);
  console.log(step);

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

  const userExist = async (email) => {
    try {
      const response = await fetch(`${URL}/api/taken-emails/${email}`);
      if (response.ok && response.status !== 404) {
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {}
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // xdayx53@gmail.com
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
            <Button>Войти</Button>

            <button onClick={() => setIsModalActive(false)}>Войти</button>
          </div>
        </div>
        <Calendar events={events} />
      </div>

      <AuthModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        userExist={userExist}
        step={step}
        setStep={setStep}
        loginUser={loginUser}
      ></AuthModal>
    </div>
  );
};

export default App;
