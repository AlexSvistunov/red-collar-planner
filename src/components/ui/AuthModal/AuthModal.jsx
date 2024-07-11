import { useState } from "react";
import styles from "./AuthModal.module.scss";

import { useDispatch } from "react-redux";
import { logIn, register } from "../../../store/slices/userSlice";
import { useForm } from "react-hook-form";
import LoginAuthStep from "../../LoginAuthStep/LoginAuthStep";
import PasswordAuthStep from "../../PasswordAuthStep/PasswordAuthStep";
import RegisterAuthStep from "../../RegisterAuthStep/RegisterAuthStep";

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

  const loginForm = useForm();
  const passwordForm = useForm();
  const registerForm = useForm();

  const submit = (data) => {

    console.log(data);
    if (step === 0) {
      userExist(data.login);
    }

    if (step === 1) {
      dispatch(
        logIn({
          email: loginForm.watch("login"),
          password: passwordForm.watch("password"),
        })
      ).then((data) => {
        console.log(data);
        if (data?.payload?.error) {
          console.log("ERROR");
          passwordForm.setError("password", {
            type: "manual",
            message: "Неверный пароль. Пожалуйста, попробуйте снова.",
          });
          return;
        } else {
          setIsModalActive(false);
          setStep(0)
        }
      });
    }

    console.log(registerForm.getFieldState('repeatedPassword'))
  };

  return (
    <div className={isModalActive ? "modal modal--active" : "modal"}>
      <div className={step === 2 ? [styles.ModalContent, styles.ContentRegister].join(' ') : styles.ModalContent}>
        {step === 0 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Вход</h2>

            <LoginAuthStep loginForm={loginForm} submit={submit} />

            {/* <input
              className={[styles.ModalContentInput, "input"].join(" ")}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Email"
            ></input>


            <button
              className={[styles.ModalContentNextBtn, "button"].join(" ")}
              onClick={() => userExist(emailValue)}
            >
              Далее
            </button> */}

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

            <PasswordAuthStep passwordForm={passwordForm} submit={submit} />

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

        {step === 2 && (
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.ModalContentTitle}>Регистрация</h2>
            <div className={styles.Tooltip}>
              <img src='/tooltip.svg'></img>
              <p className={styles.TooltipText}>В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - &lt; &gt; @ [ ] &#123; &#125; / \ _ &#123; &#125; $ # )</p>
            </div>
            {/* <div className={styles.ModalContentFields}>
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
            </button> */}

            <RegisterAuthStep registerForm={registerForm} submit={submit}/>

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
      </div>
    </div>
  );
};

export default AuthModal;
