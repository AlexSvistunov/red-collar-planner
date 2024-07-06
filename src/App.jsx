import { useEffect, useState } from "react";
import { URL } from "./api/url";
import Calendar from "./components/MyCalendar";
import "./index.css";
import "./App.scss";

import "./styles/calendar-styles-sass/styles.scss";
import Button from "./components/ui/Button/Button";
import AuthModal from "./components/ui/AuthModal/AuthModal";

import { useAuth } from "./hooks/useAuth";
import CreateEventModal from "./components/ui/CreateEventModal/CreateEventModal";

const App = () => {
  const [events, setEvents] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [step, setStep] = useState(0);
  console.log(step);

  const { token } = useAuth();
  const { isAuth } = useAuth();

  const [createEventActive, setCreateEventActive] = useState(true);
  console.log(events)

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
      } else {
        setStep((prevStep) => prevStep + 2);
      }
    } catch (error) {
      console.log(error.message);
    }
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

  const createEvent = async () => {
    

    console.log(token);
    try {
      const response = await fetch(`${URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: "Event 3",
          description: "Event 3 description",
          dateStart: new Date(),  
          dateEnd: new Date(),
          location: "Paris",
          participants: [1],
        }),
      });

      const data = await response.json();
      setEvents(data)
      console.log(data);
    } catch (error) {
      console.log(error.message);
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
            {/* <Button>Войти</Button> */}

            {isAuth ? (
              <div>
                <button>
                  <img src="/add.svg" alt="" />
                </button>

                <img src="/avatar.svg" alt="" />
              </div>
            ) : (
              <button onClick={() => setIsModalActive(true)}>Войти</button>
            )}
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

      <CreateEventModal
        isModalActive={createEventActive}
        setIsModalActive={setCreateEventActive}
        createEvent={createEvent}
      />
    </div>
  );
};

// step 1 + modal close

export default App;
