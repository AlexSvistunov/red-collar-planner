import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";

// import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/sass/styles.scss'
import { events } from "../events";

const MyCalendar = ({events}) => {
  const localizer = momentLocalizer(moment);
  return (
    <div style={{padding: '20px'}}>
      <Calendar
        localizer={localizer}
        events={[
          {title: 'event1', start: new Date(), end: new Date()}
        ]}

        // events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
