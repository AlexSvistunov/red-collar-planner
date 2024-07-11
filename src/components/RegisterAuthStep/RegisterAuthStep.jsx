import styles from "./RegisterAuthStep.module.scss";

import { useState } from "react";

const RegisterAuthStep = ({ registerForm, submit }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={styles.Form} onSubmit={registerForm.handleSubmit(submit)}>
      <div className={styles.ModalContentFields}>
        <div className={styles.FormInputBox}>
          <input
            className={[styles.FormInput, "input"].join(" ")}
            type="text"
            placeholder="Ваше имя"
            {...registerForm.register("name", {
              required: "Обязательное поле",
            })}
          />

          {registerForm.formState.errors.name
            ? registerForm.formState.errors.name.message
            : null}
        </div>
        <div className={styles.FormInputBox}>
          <div className={styles.FormInputWrapper}>
            <input
              className={[styles.FormInput, "input"].join(" ")}
              type={passwordShown ? "text" : "password"}
              placeholder="Пароль"
              {...registerForm.register("password", {
                required: "Обязательное поле",
                minLength: 8,
                maxLength: 32,

                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,32}$/,
                  message: "Используйте латинские буквы, цифры и спец символы",
                },
              })}
            ></input>

            <div
              className={styles.FormInputToggle}
              onClick={togglePasswordVisiblity}
            >
              {passwordShown ? (
                <img src="/show-eye.svg" alt="" />
              ) : (
                <img src="/close-eye.svg" alt="" />
              )}
            </div>
          </div>
          {/* <img src="/show-eye.svg" alt="" /> */}

          {registerForm.formState.errors.password
            ? registerForm.formState.errors.password.message
            : null}
        </div>

        <div className={styles.FormInputBox}>
          <div className={styles.FormInputWrapper}>
            <input
              className={[styles.FormInput, "input"].join(" ")}
              type={passwordShown ? "text" : "password"}
              placeholder="Повторить пароль"
 
              style={registerForm.getFieldState('repeatedPassword').error && {border: '1px solid red', outline: '1px solid red'}}
              {...registerForm.register("repeatedPassword", {
                required: "Обязательное поле",
                validate: () => {
                  const password = registerForm.watch('password')
                  const repeatedPassword = registerForm.watch('repeatedPassword')

                  if(password !== repeatedPassword) {
                    return 'Пароли не совпадают'
                  }

                  console.log(password)
                  console.log(repeatedPassword)

                }
              })}
            />

            <div
              className={styles.FormInputToggle}
              onClick={togglePasswordVisiblity}
            >
              {passwordShown ? (
                <img src="/show-eye.svg" alt="" />
              ) : (
                <img src="/close-eye.svg" alt="" />
              )}
            </div>
          </div>

          {registerForm.formState.errors.repeatedPassword
            ? registerForm.formState.errors.repeatedPassword.message
            : null}
        </div>
      </div>
      <button
        type="submit"
        className="button"
        // onClick={() =>
        //   dispatch(
        //     register({
        //       userName: registerFields.name,
        //       email: emailValue,
        //       password: registerFields.password,
        //     })
        //   ).then(() => {
        //     setIsModalActive(false);
        //   })
        // }
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterAuthStep;
