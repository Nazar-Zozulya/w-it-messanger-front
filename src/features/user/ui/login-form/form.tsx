import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { LoginFormTypes } from "./form.types";
import { Input } from "../../../../shared/ui/input";

export function LoginForm() {
    const { handleSubmit } = useForm<LoginFormTypes>()

    function onSubmit() {

    }

    return (
        <div className={styles.container}>
            <p className={styles.optionalTitle}>З Поверненням до World IT</p>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                {/* <div className={styles.inputsBlock}>

                </div> */}
                <Input label="Електронна пошта" placeholder="you@example.com" />
                <Input label="Пароль" placeholder="Введи пароль" isPassword={true} />

                <button type="submit" className={styles.submitButton}>Повернутися в акаунт</button>
            </form>
        </div>
    )
}
