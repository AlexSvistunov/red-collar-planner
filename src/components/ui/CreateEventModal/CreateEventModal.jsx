import styles from "./CreateEventModal.module.scss";

const CreateEventModal = ({ isModalActive, setIsModalActive, createEvent }) => {
  return (
    <div
      className={
        isModalActive
          ? [styles.Modal, styles.ModalActive].join(" ")
          : styles.Modal
      }
    >
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
              <input placeholder="Название"></input>
              <textarea placeholder="Описание"></textarea>
              <input placeholder="Участники"></input>

              <div></div>
            </div>
            <div className={styles.ContentWrapperRight}>
              {/* right */}
              <input type="date"></input>
              <input type="date"></input>
              <input type="text" placeholder="Время" />
              <input type="text" placeholder="Место проведения" />

              <div>Организатор</div>
            </div>
          </div>

          <button onClick={createEvent}>Создать</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
