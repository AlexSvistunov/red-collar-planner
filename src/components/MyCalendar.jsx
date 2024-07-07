import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";

// import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/sass/styles.scss'
import { events } from "../events";

const MyCalendar = ({events}) => {
  // const formattedEvents = events.map(event => ({
  //   title: event.title,
  //   start: new Date(event.dateStart),
  //   end: new Date(event.dateEnd),
  // }));

  const handleSelectEvent = (event) => {
    alert(event.id)
  }

  const localizer = momentLocalizer(moment);
  return (
    <div style={{padding: '20px'}}>
      <Calendar
        localizer={localizer}
        // events={[
        //   {title: 'event1', start: new Date(), end: new Date()},
        //   {title: 'event2', start: new Date(), end: new Date()},
        // ]}

        events={events}
          startAccessor="dateStart"
          endAccessor="dateEnd"
        style={{ height: 1000 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default MyCalendar;
