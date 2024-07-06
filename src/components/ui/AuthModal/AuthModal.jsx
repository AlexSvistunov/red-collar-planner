import { useState } from "react";
import styles from "./AuthModal.module.scss";

import Button from "../Button/Button";

const AuthModal = ({ isModalActive, setIsModalActive, userExist, step, setStep, loginUser }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState('')

  console.log(step)

  return (
    <div
      className={
        isModalActive
          ? [styles.Modal, styles.ModalActive].join(" ")
          : styles.Modal
      }
    >
      <div className={styles.ModalContent}>
        {step === 0 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Вход</h2>
            <input
              className={styles.ModalContentInput}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="email"
            ></input>

            {/* <Button>Далее</Button> */}
            <button
              className={styles.ModalContentNextBtn}
              onClick={() => userExist(emailValue)}
            >
              Далее
            </button>

            <button className={styles.ModalContentClose}>
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
          </div>
        )}

        {step === 1 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Вход</h2>
            <input
              className={styles.ModalContentInput}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="пароль"
            ></input>

            {/* <Button>Далее</Button> */}
            <button
              className={styles.ModalContentNextBtn}
              onClick={() => loginUser(emailValue, passwordValue)}
            >
              Войти
            </button>

            <button className={styles.ModalContentClose}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
