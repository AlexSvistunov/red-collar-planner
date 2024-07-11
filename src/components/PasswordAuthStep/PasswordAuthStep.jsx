import styles from "./PasswordAuthStep.module.scss";

const PasswordAuthStep = ({ passwordForm, submit }) => {
  return (
    <form className={styles.Form} onSubmit={passwordForm.handleSubmit(submit)}>
      <div className={styles.FormInputBox}>
        <input
          className={[styles.FormInput, "input"].join(" ")}
          placeholder="Пароль"
          {...passwordForm.register('password', {
            required: "Обязательное поле",
          })}
        ></input>

        {passwordForm.formState.errors.password
          ? passwordForm.formState.errors.password.message
          : null}
      </div>

      <button
        type="submit"
        className={[styles.FormNextBtn, "button"].join(" ")}
       
      >
        Войти
      </button>
    </form>
  );
};

export default PasswordAuthStep;
