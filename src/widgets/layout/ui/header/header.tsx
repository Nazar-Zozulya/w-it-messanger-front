import styles from "./header.module.css"
import { ReactComponent as Logo } from "../../../../shared/ui/icons/logo.svg"
import { NavigationButton } from "../../../../features/layout"
import { Button } from "../../../../shared/ui/button/button"
import { ReactComponent as House } from '../../../../shared/ui/icons/house.svg'
import { ReactComponent as Gallery } from '../../../../shared/ui/icons/gallery.svg'
import { ReactComponent as People } from '../../../../shared/ui/icons/people.svg'
import { ReactComponent as Chat } from '../../../../shared/ui/icons/chat.svg'
import { ReactComponent as Settings } from '../../../../shared/ui/icons/settings.svg'
import { ReactComponent as Logout } from '../../../../shared/ui/icons/logout.svg'
import { WhichSelected } from "./header.types"
import { useState } from "react"

export function Header() {
	const [ whichSelected, setWhichSelected ] = useState<WhichSelected>("main")
	return (
		<div className={styles.container}>
			<Logo />

			<div className={styles.navigation}>
				<NavigationButton icon={<House width={17} height={17} />} text="Головна" redirect="" isSelected={whichSelected == "main"} />
				<NavigationButton icon={<Gallery width={17} height={17} />} text="Мої публікації" redirect="" isSelected={whichSelected == "my posts"} />
				<NavigationButton icon={<People width={17} height={17} />} text="Друзі" redirect="" isSelected={whichSelected == "friends"} />
				<NavigationButton icon={<Chat width={17} height={17} />} text="Чати" redirect="" isSelected={whichSelected == "chats"} />
				<NavigationButton icon={<Settings width={17} height={17} />} text="Налаштування" redirect="" isSelected={whichSelected == "settings"} />

				<Button
					fill={false}
					function={() => {}}
					icon={<Logout width={17} height={17} />}
					text="Вихід"
				/>
			</div>
		</div>
	)
}
