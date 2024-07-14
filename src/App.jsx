import { useEffect, useState } from "react";
import URL from "./api/url";
import MyCalendar from "./components/MyCalendar";
import "./index.css";
import "./App.scss";

import "./styles/calendar-styles-sass/styles.scss";
import AuthModal from "./components/ui/AuthModal/AuthModal";

import { useAuth } from "./hooks/useAuth";
import CreateEventModal from "./components/ui/CreateEventModal/CreateEventModal";
import EventModal from "./components/ui/EventModal/EventModal";
import { useDispatch } from "react-redux";
import { removeUser } from "./store/slices/userSlice";
import { useSelector } from "react-redux";
import EventService from "./api/EventService";
import UserService from "./api/UserService";

const App = () => {
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  const [step, setStep] = useState(0);

  const { token } = useAuth();
  const { isAuth } = useAuth();

  const [createEventActive, setCreateEventActive] = useState(false);
  const [watchEventActive, setWatchEventActive] = useState(false);

  function userExist(email) {
    UserService.userExist(email).then((data) => {
      if (data === "plus one") {
        setStep(step + 1);
      }

      if (data === "plus two") {
        setStep(step + 2);
      }
    });
  }

  function loginUser(email, password) {
    UserService.loginUser(email, password);
  }

  function joinEvent(id) {
    EventService.joinEvent(id, token).then(() => fetchEvents());
  }

  function leaveEvent(id) {
    EventService.leaveEvent(id, token).then(() => fetchEvents());
  }

  function createEvent(obj) {
    EventService.createEvent(token, obj).then((data) =>
      setEvents([...events, data])
    );
  }

  async function fetchEvents() {
    EventService.getEventsForPublic().then((data) => setEvents(data.data));
  }

  useEffect(() => {
    fetchEvents();
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
            {isAuth ? (
              <div className="app__header-block">
                <button
                  className="button"
                  onClick={() => setCreateEventActive(true)}
                >
                  <img src="/add.svg" alt="" />
                </button>

                <div className="app__header-avatar">
                  <img className="" src="/avatar.svg" alt="" />
                  <button
                    className="app__header-avatar-btn"
                    onClick={() => dispatch(removeUser())}
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <button className="button" onClick={() => setIsModalActive(true)}>
                Войти
              </button>
            )}
          </div>
        </div>

        <MyCalendar
          events={events}
          setWatchEventActive={setWatchEventActive}
          watchEventActive={watchEventActive}
          joinEvent={joinEvent}
          leaveEvent={leaveEvent}
          setIsModalActive={setIsModalActive}
        />
      </div>

      <AuthModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        userExist={userExist}
        step={step}
        setStep={setStep}
        loginUser={loginUser}
      />

      <CreateEventModal
        isModalActive={createEventActive}
        setIsModalActive={setCreateEventActive}
        createEvent={createEvent}
        fetchEvents={ fetchEvents}
      />

   
    </div>
  );
};

export default App;
