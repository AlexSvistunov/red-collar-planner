import { useState } from "react";
import styles from "./CreateEventModal.module.scss";

const CreateEventModal = ({ isModalActive, setIsModalActive, createEvent }) => {
  const [createFields, setCreateFields] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    time: "",
    location: "",
    participants: [1],
  });

  const [meData, setMeData] = useState(null);

  function checkDate(date) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();

    const formattedDate = `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;


    const inputDate = new Date(date);
    const yearInput = inputDate.getFullYear();
    const monthInput = inputDate.getMonth() + 1; 
    const dayInput = inputDate.getDate();

    const formattedDateInput = `${dayInput < 10 ? "0" : ""}${dayInput}.${
      monthInput < 10 ? "0" : ""
    }${monthInput}.${yearInput}`;



    if (formattedDateInput >= formattedDate) {
      return false;
    } else {
      return true;
    }
  }

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

  const createdBy = (item) => {
    if(item.owner.id === myData.id) {
      return true
    } else {
      return false
    }
  }



  return (
    <div className={isModalActive ? "modal modal--active" : "modal"}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalContentWrapper}>
          <button
            className={styles.ModalContentClose}
            onClick={() => setIsModalActive(false)}
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
          <h3 className={styles.ModalContentTitle}>Создание события</h3>

          <div className={styles.ContentWrapper}>
            <div className={styles.ContentWrapperLeft}>
              <input
                className="input-base"
                placeholder="Название"
                value={createFields.title}
                onChange={(e) =>
                  setCreateFields({ ...createFields, title: e.target.value })
                }
              ></input>
              <textarea
                placeholder="Описание"
                 className="input-base"
                value={createFields.description}
                onChange={(e) =>
                  setCreateFields({
                    ...createFields,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div>Участники</div>
            </div>
            <div className={styles.ContentWrapperRight}>
              <input
                type="date"
                value={createFields.dateStart}
                onChange={(e) =>
                  setCreateFields({
                    ...createFields,
                    dateStart: e.target.value,
                  })
                }
              ></input>
              <input
                type="date"
                value={createFields.dateEnd}
                onChange={(e) =>
                  setCreateFields({ ...createFields, dateEnd: e.target.value })
                }
              ></input>
              <input
               className="input-base"
                type="text"
                placeholder="Время"
                value={createFields.time}
                onChange={(e) =>
                  setCreateFields({ ...createFields, time: e.target.value })
                }
              ></input>
              <input
               className="input-base"
                type="text"
                placeholder="Место проведения"
                value={createFields.location}
                onChange={(e) =>
                  setCreateFields({ ...createFields, location: e.target.value })
                }
              ></input>
              <div>Организатор</div>
            </div>
          </div>

          <button
          className="button"
            onClick={() =>
              createEvent({
                ...createFields,
              
               
              })
            }
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
