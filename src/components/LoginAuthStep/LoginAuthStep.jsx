import { useForm } from "react-hook-form";
import styles from "./LoginAuthStep.module.scss";

const LoginAuthStep = ({ loginForm, submit }) => {

  return (
    <form className={styles.Form} onSubmit={loginForm.handleSubmit(submit)}>
      <div className={styles.FormInputBox}>
        <input
        placeholder="E-mail"
          className={[styles.FormInput, "input"].join(" ")}
          {...loginForm.register("login", {
            required: "Обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный e-mail",
            },
          })}
        ></input>

        {loginForm.formState.errors.login ? loginForm.formState.errors.login.message : null}
      </div>

      <button
        className={[styles.FormNextBtn, "button"].join(" ")}
        // onClick={() => userExist(emailValue)}
      >
        Далее
      </button>
    </form>
  );
};

export default LoginAuthStep;
