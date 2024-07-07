import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";

// import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";

import EventModal from "./ui/EventModal/EventModal";
import { useState } from "react";

const MyCalendar = ({
  events,
  setWatchEventActive,
  isModalActive,
  setIsModalActive,
}) => {
  const [activeItem, setActiveItem] = useState(null)
  
  const handleSelectEvent = (event) => {
    setWatchEventActive(true);
    setActiveItem(event)
  };

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
          return {
            style: {
              backgroundColor: "#efefef",
              padding: "2px 6px",
              color: color,
              fontSize: "20px",
              fontWeight: 500,
              borderRadius: "8px",
              margin: "2px 0",
            },
          };
        }}
      />

      <EventModal
        isModalActive={isModalActive}
        setIsModalActive={setWatchEventActive}
        item={activeItem}
        //or item
      />
    </div>
  );
};

export default MyCalendar;
