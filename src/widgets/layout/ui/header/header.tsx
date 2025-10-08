import styles from "./header.module.css"
import { ReactComponent as Logo } from "../../../../shared/ui/icons/logo.svg"
import { NavigationButton } from "../../../../features/layout"
import { Button } from "../../../../shared/ui/button/button"

export function Header() {
	return (
		<div className={styles.container}>
			<Logo />

			<div className={styles.navigation}>
				<NavigationButton icon={<div></div>} text="Головна" redirect="" />
				<NavigationButton icon={<div></div>} text="Мої публікації" redirect="" />
				<NavigationButton icon={<div></div>} text="Друзі" redirect="" />
				<NavigationButton icon={<div></div>} text="Чати" redirect="" />
				<NavigationButton icon={<div></div>} text="Налаштування" redirect="" />

				<Button
					fill={false}
					function={() => {}}
					icon={<div></div>}
					text="Вихід"
				/>
			</div>
		</div>
	)
}
