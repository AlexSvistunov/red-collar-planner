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
  isModalActive,
  setIsModalActive,
  joinEvent
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
      console.log(data);
      
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
          const color = event.prevDate ? "#ccc" : "black";
         
          // const isParticipant = events?.forEach(event => {
          //   event?.participants?.forEach(participant => {
          //     if(participant.id === myData.id) {
          //       return true
          //     } else {
          //       return false
          //     }
          //   })

          
          // })

          const isParticipant = event?.participants.some(participant => participant.id === myData.id)
          console.log(isParticipant)
          const size = isParticipant ? '20px' : '20px';
          const backgroundImage = isParticipant ? "url('/circle.svg')" : null
    
        
          return {
            style: {
              backgroundColor: "#efefef",
              padding: "2px 10px",
              color: color,
              fontSize: size,
              fontWeight: 500,
              borderRadius: "8px",
              margin: "2px 0",
              backgroundImage,
              backgroundSize: '8px 9px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left'
              
            },
          };
        }}
      />

      <EventModal
        isModalActive={isModalActive}
        setIsModalActive={setWatchEventActive}
        item={activeItem}
        joinEvent={joinEvent}
        //or item
      />
    </div>
  );
};

export default MyCalendar;
