import { useEffect, useState } from "react";
import { URL } from "../../../api/url";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./EventModal.module.scss";

const EventModal = ({
  watchEventActive,
  setWatchEventActive,
  item,
  joinEvent,
  setIsModalActive,
  deleteEvent
}) => {
  const { isAuth, token } = useAuth();
  const [meData, setMeData] = useState(null);

  console.log(meData);

  console.log(item);

  const getEventsForPublic = async () => {
    try {
      const response = await fetch(
        `${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getEventsForAuth = async () => {
    try {
      const response = await fetch(
        `${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      const response = await fetch(`${URL}/api/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventsForPublic();
    getEventsForAuth();
    getMe();
  }, []);

  return (
    <div className={watchEventActive ? "modal modal--active" : "modal"}>
      <div className={styles.Content}>
        {item && (
          <div className={styles.ContentWrapper}>
            <h2 className={styles.ContentTitle}>{item.title}</h2>

            <div className={styles.ContentBlock}>
              <div
                className={
                  item.prevDate
                    ? [styles.ContentInfo, styles.ContentInfoPrev].join(" ")
                    : styles.ContentInfo
                }
              >
                <span className={styles.ContentInfoTime}>{item.dateStart}</span>
                <span className={styles.ContentInfoAddress}>
                  {" "}
                  {item.location}
                </span>
              </div>
              <div className={styles.ContentDescr}>{item.description}</div>
            </div>

            <div className={styles.Part}>
              <h3 className={styles.PartTitle}></h3>
              <div className={styles.PartList}>
                <div className={styles.PartItem}></div>
              </div>
            </div>

            <div className={styles.Gallery}>
              <h3 className={styles.GalleryTitle}></h3>
              {/* gallery */}
            </div>

            {isAuth ? (
              item.participants.some(
                (participant) => participant.id === meData.id
              ) ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "auto",
                  }}
                >
                  <button onClick={() => {
                    deleteEvent(item.id)
                    setWatchEventActive(false)
                  }} className={styles.ContentLogin}>
                    Вы присоединились к событию. Если передумали, можете {' '}
                    <span style={{ color: "#f51b1b" }}>
                      
                       отменить участие.
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    joinEvent(item.id);
                    setWatchEventActive(false)
                  }}
                  className={[styles.ContentJoin, "button"].join(" ")}
                >
                  Присоединиться к событию
                </button>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "auto",
                }}
              >
                <button
                  onClick={() => {
                    setWatchEventActive(false);
                    setIsModalActive(true);
                  }}
                  className={styles.ContentLogin}
                >
                  <span style={{ color: "#f51b1b" }}>Войдите </span>, чтобы
                  присоединиться к событию
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
