import { useEffect, useState } from "react";
import { URL } from "../../../api/url";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./EventModal.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import '/src/styles/global.css'

import "swiper/css";
import 'swiper/css/pagination';

const EventModal = ({
  watchEventActive,
  setWatchEventActive,
  item,
  joinEvent,
  setIsModalActive,
  deleteEvent,
}) => {
  const { isAuth, token } = useAuth();
  const [meData, setMeData] = useState(null);
  const isEventPassed =
    item?.dateStart > new Date().toISOString() ? false : true;
  console.log(item);

  const date = new Date(item?.dateStart);
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const weekDate = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

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
            <button
              className={styles.ContentClose}
              onClick={() => setWatchEventActive(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.3139 3.51472L20.4855 0.686291L12.0002 9.17157L3.51495 0.686291L0.686523 3.51472L9.1718 12L0.686523 20.4853L3.51495 23.3137L12.0002 14.8284L20.4855 23.3137L23.3139 20.4853L14.8287 12L23.3139 3.51472Z"
                  fill="#B3B3BC"
                />
              </svg>
            </button>
            <h2 className={styles.ContentTitle}>{item.title}</h2>

            {isEventPassed && (
              <div className={styles.ContentPassed}>
                <img src="/tooltip.svg"></img>
                <span>Мероприятие уже прошло</span>
              </div>
            )}

            <div className={styles.ContentBlock}>
              <div
                className={
                  item.prevDate
                    ? [styles.ContentInfo, styles.ContentInfoPrev].join(" ")
                    : styles.ContentInfo
                }
              >
                <div className={styles.ContentInfoItems}>
                  <span className={styles.ContentInfoItem}>{weekDate}</span>
                  <span className={styles.ContentInfoItem}>
                    {day} {month}
                  </span>
                  <span className={styles.ContentInfoItem}>{time}</span>
                </div>
                <span className={styles.ContentInfoAddress}>
                  {" "}
                  {item.location}
                </span>
              </div>
              <div className={styles.ContentDescr}>{item.description}</div>
            </div>

            {item?.participants?.length ? (
              <div className={styles.Part}>
                <h3 className={[styles.PartTitle, "event-title"].join(" ")}>
                  Участники
                </h3>
                <div className={styles.PartList}>
                  {item?.participants?.map((participant) => (
                    <div className={styles.PartItem}>
                      <img src="/avatar.png" width={40} height={40}></img>
                      <span>{participant?.username}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3>Нет участников</h3>
            )}

            {item?.photos?.length ? (
              <div className={styles.Gallery}>
                <div className={styles.GalleryHead}>
                  <h3
                    className={[styles.GalleryTitle, "event-title"].join(" ")}
                  >
                    Галерея
                  </h3>
                </div>

                <div className={styles.GalleryPhotos}>
                  <Swiper
                    modules={[Pagination]}
                    slidesPerView={'auto'}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    
                  >
                    {item?.photos?.map((photo) => (
                      <SwiperSlide className="mySlide">
                        <img
                          className={styles.GalleryPhoto}
                          src={`/planner_intern-main/public/${photo?.url}`}
                          width={266}
                          height={160}
                        ></img>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            ) : (
              <h3>Галерея пустая</h3>
            )}

            {isAuth ? (
              isEventPassed ? null : item?.participants.some(
                  (participant) => participant.id === meData.id
                ) ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "auto",
                  }}
                >
                  <button
                    onClick={() => {
                      deleteEvent(item.id);
                      setWatchEventActive(false);
                    }}
                    className={styles.ContentLogin}
                  >
                    Вы присоединились к событию. Если передумали, можете{" "}
                    <span style={{ color: "#f51b1b" }}>отменить участие.</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    joinEvent(item.id);
                    setWatchEventActive(false);
                  }}
                  className={[styles.ContentJoin, "button"].join(" ")}
                >
                  Присоединиться к событию
                </button>
              )
            ) : isEventPassed ? null : (
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
            )}

            {/*             
<Swiper modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>1</SwiperSlide>
              <SwiperSlide>2</SwiperSlide>
              <SwiperSlide>3</SwiperSlide>
            </Swiper> */}

            {/* {isAuth ? (
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
                  <button
                    onClick={() => {
                      deleteEvent(item.id);
                      setWatchEventActive(false);
                    }}
                    className={styles.ContentLogin}
                  >
                    Вы присоединились к событию. Если передумали, можете{" "}
                    <span style={{ color: "#f51b1b" }}>отменить участие.</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    joinEvent(item.id);
                    setWatchEventActive(false);
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
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
