import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";

// import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";

import EventModal from "./ui/EventModal/EventModal";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { URL } from "../api/url";
const MyCalendar = ({
  events,
  setWatchEventActive,
  watchEventActive,
  joinEvent,
  setIsModalActive,
  deleteEvent
}) => {
  const [activeItem, setActiveItem] = useState(null)
  const {token} = useAuth()
  const [myData, setMyData] = useState(null);
  
  const handleSelectEvent = (event) => {
    setWatchEventActive(true);
    setActiveItem(event)
  };

  const getMe = async () => {
    try {
      const response = await fetch(`${URL}/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()
      setMyData(data)
    
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  const localizer = momentLocalizer(moment);
  return (
    <div style={{ padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="dateStart"
        endAccessor="dateEnd"
        style={{ height: 900 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => {
          const color = event.prevDate ? "#b3b3bc" : "black";
         
          const isParticipant = event?.participants?.some(participant => participant?.id === myData?.id)
          console.log(isParticipant)
          const size = isParticipant ? '20px' : '20px';
          const backgroundImage = isParticipant ? "url('/circle.svg')" : null
          const background = event?.owner?.id === myData?.id ? 'red' : '#efefef'

          console.log(event)
          console.log(event.dateEnd > new Date().toISOString())

          const isEventPassed = event.dateStart > new Date().toISOString() ? false : true

        
          return {
            style: {
              padding: "7px 10px",
              fontWeight: 500,
              borderRadius: "8px",
              margin: "2px 0",
              backgroundImage,
              backgroundSize: '8px 9px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left'
          
            },

            className: isEventPassed ? 'event-passed' : 'event-future',
          };
        }}
      />

      <EventModal
        watchEventActive={watchEventActive}
        setWatchEventActive={setWatchEventActive}
        item={activeItem}
        joinEvent={joinEvent}
        setIsModalActive={setIsModalActive}
        deleteEvent={deleteEvent}
        //or item
      />
    </div>
  );
};

export default MyCalendar;
