import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import EventModal from "./ui/EventModal/EventModal";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserService from "../api/UserService";
const MyCalendar = ({
  events,
  setWatchEventActive,
  watchEventActive,
  joinEvent,
  setIsModalActive,
  leaveEvent,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const { token } = useAuth();
  const [myData, setMyData] = useState(null);

  const handleSelectEvent = (event) => {
    setWatchEventActive(true);
    setActiveItem(event);
  };

  useEffect(() => {
    UserService.getMe(token).then((data) => setMyData(data));
  }, []);

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
          console.log(event);
          const isParticipant = event?.participants?.some(
            (participant) => participant?.id === myData?.id
          );
          const isEventPassed =
            event.dateStart > new Date().toISOString() ? false : true;
          const isOwner = event?.owner?.id === myData?.id && !isEventPassed;
          console.log(isOwner);

          return {
            style: {
              padding: "7px 10px",
              fontWeight: 500,
              borderRadius: "8px",
              margin: "2px 0",
            },

            className: isEventPassed
              ? "event-passed"
              : isOwner
              ? "event-owner"
              : isParticipant
              ? "event-participant"
              : "event-future",
          };
        }}
      />

      <EventModal
        watchEventActive={watchEventActive}
        setWatchEventActive={setWatchEventActive}
        item={activeItem}
        joinEvent={joinEvent}
        setIsModalActive={setIsModalActive}
        leaveEvent={leaveEvent}
      />
    </div>
  );
};

export default MyCalendar;
