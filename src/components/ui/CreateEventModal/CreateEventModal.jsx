import { useEffect, useState } from "react";
import styles from "./CreateEventModal.module.scss";

import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";
import  url  from "../../../api/url";
import { useAuth } from "../../../hooks/useAuth";
import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';
import fileTypes from "../../../utils/fileTypes";
import fillTime from "../../../utils/timeOptions";

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

  const { token, isAuth } = useAuth();
  const [options, setOptions] = useState([]);
  console.log(options);

  const [selectedOption, setSelectedOption] = useState(null);


  const [startCalendarValue, setStartCalendarValue] = useState(new Date())
  const [endCalendarValue, setEndCalendarValue] = useState(new Date())

  const [isStartCalendarVisible, setIsStartCalendarVisible] = useState(false)
  const [isEndCalendarVisible, setIsEndCalendarVisible] = useState(false)

  const timeOptions = fillTime([])


  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const removeFile = (key) => {
    const updatedFiles = { ...file };
    delete updatedFiles[key];
    setFile(updatedFiles);
  };


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
    if (item.owner.id === myData.id) {
      return true;
    } else {
      return false;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${url}/api/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOptions(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   if(isAuth) {
    getUsers();
   }
  }, [isAuth]);
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
              <Select
                isMulti
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options?.map((option) => {
                  option.value = option.username;
                  option.label = option.username;

                  return option;
                })}
              />
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                multiple={true}
              >
                <div className={styles.Choose}>
                  <div className={styles.ChooseSelect}>
                    Выберите фото или перетащите сюда
                  </div>
                </div>
              </FileUploader>
            </div>
            <div className={styles.ContentWrapperRight}>
              <div>
                {/* <input
                  type="date"
                  value={createFields.dateStart}
                  onChange={(e) =>
                    setCreateFields({
                      ...createFields,
                      dateStart: e.target.value,
                    })
                  }
                ></input> */}

                <button onClick={() => setIsStartCalendarVisible(!isStartCalendarVisible)}>Start</button>
                {isStartCalendarVisible && <Calendar onChange={setStartCalendarValue} value={startCalendarValue}/>}
              </div>

              <div>
              <button onClick={() => setIsEndCalendarVisible(!isEndCalendarVisible)}>End</button>
              {isEndCalendarVisible && <Calendar onChange={setEndCalendarValue} value={endCalendarValue}/>}
              </div>
              {/* <input
                type="date"
                value={createFields.dateEnd}
                onChange={(e) =>
                  setCreateFields({ ...createFields, dateEnd: e.target.value })
                }
              ></input> */}
              {/* <input
                className="input-base"
                type="text"
                placeholder="Время"
                value={createFields.time}
                onChange={(e) =>
                  setCreateFields({ ...createFields, time: e.target.value })
                }
              ></input> */}

              <Select options={timeOptions}/>
              <Select options={timeOptions}/>

              {/* <div>Время начала</div>
              <div>Время конца</div> */}
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

              <div className={styles.ChooseImages}>
                {file &&
                  Object.keys(file).map((key) => {
                    const myFile = file[key];
                    return (
                      <div key={key} className={styles.ChooseImage}>
                        <button
                          className={styles.ChooseRemove}
                          onClick={() => removeFile(key)}
                        >
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 10.25L5.25 3.5L3 5.75L9.75 12.5L3 19.25L5.25 21.5L12 14.75L18.75 21.5L21 19.25L14.25 12.5L21 5.75L18.75 3.5L12 10.25Z"
                              fill="white"
                            />
                          </svg>
                        </button>

                        <img
                          src={URL.createObjectURL(myFile)}
                          alt={myFile.name}
                          width={133}
                          height={80}
                        />

                        {/* <p>Name: {myFile.name}</p>
                      <p>Size: {myFile.size}</p> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <button
            className={[styles.ModalContentCreate, 'button'].join(' ')}
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
