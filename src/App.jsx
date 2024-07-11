import { useEffect, useState } from "react";
import { URL } from "./api/url";
import MyCalendar from "./components/MyCalendar";
import "./index.css";
import "./App.scss";


// import { Swiper, SwiperSlide } from "swiper/react";

import "./styles/calendar-styles-sass/styles.scss";
import Button from "./components/ui/Button/Button";
import AuthModal from "./components/ui/AuthModal/AuthModal";

import { useAuth } from "./hooks/useAuth";
import CreateEventModal from "./components/ui/CreateEventModal/CreateEventModal";
import EventModal from "./components/ui/EventModal/EventModal";
import { useDispatch } from "react-redux";
import { removeUser } from "./store/slices/userSlice";
import { useSelector } from "react-redux";
import TestForm from "./components/TestForm";


const App = () => {
  const dispatch = useDispatch()
  const [events, setEvents] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  const [step, setStep] = useState(0);

  const { token } = useAuth();
  const { isAuth } = useAuth();

  console.log(events)


  const [createEventActive, setCreateEventActive] = useState(false);
  const [watchEventActive, setWatchEventActive] = useState(false);


  const getEventsForPublic = async () => {
    try {
      const response = await fetch(`${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`)

      const data = await response.json()
      setEvents(data.data)
      
    
    } catch (error) {
      console.log(error);
    }
  }
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
    
    } catch (error) {
      console.log(error.message);
    }
  };


   const joinEvent = async (id) => {
    try {
      const response = await fetch(`${URL}/api/events/${id}/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
     
    } catch (error) {
      console.error('An error occurred:', error);
    }

    getEventsForPublic()
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`${URL}/api/events/${id}/leave`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('DELETE', data)
     
    } catch (error) {
      console.error('An error occurred:', error);
    }

    getEventsForPublic()
  };
  


  const createEvent = async (obj) => {
 
    try {
      const response = await fetch(`${URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(obj),
      });

      const data = await response.json();
      setEvents([...events, data]);
    
    } catch (error) {
      console.log(error.message);
    }
  };

  

  useEffect(() => {
    getEventsForPublic()
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
            {/* <button className="app__header-login">Войти</button> */}
            {/* <Button>Войти</Button> */}

            {isAuth ? (
              <div className="app__header-block">
                <button
                  className="button"
                  onClick={() => setCreateEventActive(true)}
                >
                  <img src="/add.svg" alt="" />
                </button>

                <div className="app__header-avatar">
                  <img
                    className=""
                    src="/avatar.svg"
                    alt=""
                  />
                  <button className="app__header-avatar-btn" onClick={() => dispatch(removeUser())}>Выйти</button>
                </div>
              </div>
            ) : (
              <button className="button" onClick={() => setIsModalActive(true)}>
                Войти
              </button>
            )}
          </div>
        </div>
        <MyCalendar events={events} setWatchEventActive={setWatchEventActive} watchEventActive={watchEventActive}  joinEvent={joinEvent} deleteEvent={deleteEvent} setIsModalActive={setIsModalActive}  />
      </div>

      <AuthModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        userExist={userExist}
        step={step}
        setStep={setStep}
        loginUser={loginUser}
      ></AuthModal>

      {/* <Swiper>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper> */}

      <CreateEventModal
        isModalActive={createEventActive}
        setIsModalActive={setCreateEventActive}
        createEvent={createEvent}
      />

      {/* <TestForm/> */}

      {/* <EventModal
        isModalActive={watchEventActive}
        setIsModalActive={setWatchEventActive}
      /> */}
    </div>
  );
};

// step 1 + modal close
// закрытие модалки с watch event
// участники в модалке
// если выходим, то не обновляюся красные точки, и если зайдем, тоже, а также когда присоединяюсь
// присоед. работает с кружком


export default App;
