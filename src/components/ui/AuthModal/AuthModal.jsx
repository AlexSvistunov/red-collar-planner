import { useState } from "react";
import styles from "./AuthModal.module.scss";

import { useDispatch } from "react-redux";
import { logIn, register } from "../../../store/slices/userSlice";

const AuthModal = ({
  isModalActive,
  setIsModalActive,
  userExist,
  step,
  setStep,
  loginUser,
}) => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [registerFields, setRegisterFields] = useState({
    name: "",
    password: "",
    repeatedPassword: "",
  });

  return (
    <div className={isModalActive ? "modal modal--active" : "modal"}>
      <div className={styles.ModalContent}>
        {step === 0 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Вход</h2>
            <input
              className={[styles.ModalContentInput, "input"].join(" ")}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Email"
            ></input>

            {/* <Button>Далее</Button> */}
            <button
              className={[styles.ModalContentNextBtn, "button"].join(" ")}
              onClick={() => userExist(emailValue)}
            >
              Далее
            </button>

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
          </div>
        )}

        {step === 1 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Вход</h2>
            <input
              className={[styles.ModalContentInput, "input"].join(" ")}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Пароль"
            ></input>

            <button
              className={[styles.ModalContentNextBtn, "button"].join(" ")}
              // onClick={() => loginUser(emailValue, passwordValue)}
              onClick={() =>
                dispatch(
                  logIn({ email: emailValue, password: passwordValue })
                ).then(() => {
                  setIsModalActive(false);
                })
              }
            >
              Войти
            </button>

            <button className={styles.ModalContentClose} onClick={() => setIsModalActive(false)}>
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

        {step === 2 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Регистрация</h2>
            <div className={styles.ModalContentFields}>
              <input
                className="input"
                type="text"
                placeholder="Ваше имя"
                value={registerFields.name}
                onChange={(e) =>
                  setRegisterFields({
                    ...registerFields,
                    name: e.target.value,
                  })
                }
              />
              <input
                className="input"
                type="text"
                placeholder="Пароль"
                value={registerFields.password}
                onChange={(e) =>
                  setRegisterFields({
                    ...registerFields,
                    password: e.target.value,
                  })
                }
              />
              <input
                className="input"
                type="text"
                placeholder="Повторить пароль"
                value={registerFields.repeatedPassword}
                onChange={(e) =>
                  setRegisterFields({
                    ...registerFields,
                    repeatedPassword: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="button"
              onClick={() =>
                dispatch(
                  register({
                    userName: registerFields.name,
                    email: emailValue,
                    password: registerFields.password,
                  })
                ).then(() => {
                  setIsModalActive(false);
                })
              }
            >
              Зарегистрироваться
            </button>

            <button className={styles.ModalContentClose}  onClick={() => setIsModalActive(false)}>
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
