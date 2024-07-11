import { useForm } from "react-hook-form";

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
 
  const submit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="input-box">
        <input
          type="text"
          {...register("login", {
            required: "Поле обязательно к заполнению",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />

        {errors.login ? errors.login.message : null}
      </div>
      <button type="submit">Логин</button>
    </form>
  );
};

export default TestForm;
