import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { RegisterFormTypes } from "./form.types";
import { Input } from "../../../../shared/ui/input";

export function RegisterForm() {
    const { handleSubmit } = useForm<RegisterFormTypes>()

    function onSubmit() {

    }

    return (
        <div className={styles.container}>
            <p className={styles.optionalTitle}>Приєднуйся до World IT</p>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                {/* <div className={styles.inputsBlock}>

                </div> */}
                <Input label="Електронна пошта" placeholder="you@example.com" />
                <Input label="Пароль" placeholder="Введи пароль" isPassword={true} />
                <Input label="Підтверди пароль" placeholder="Повтори пароль" isPassword={true} />

                <button type="submit" className={styles.submitButton}>Створити акаунт</button>
            </form>
        </div>
    )
}
