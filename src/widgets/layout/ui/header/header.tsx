import styles from "./header.module.css"
import { ReactComponent as Logo } from "../../../../shared/ui/icons/logo.svg"
import { NavigationButton } from "../../../../features/layout"
import { Button } from "../../../../shared/ui/button/button"
import { ReactComponent as House } from "../../../../shared/ui/icons/house.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as People } from "../../../../shared/ui/icons/people.svg"
import { ReactComponent as Chat } from "../../../../shared/ui/icons/chat.svg"
import { ReactComponent as Settings } from "../../../../shared/ui/icons/settings.svg"
import { ReactComponent as Logout } from "../../../../shared/ui/icons/logout.svg"
import { WhichSelected } from "./header.types"
import { useEffect, useState } from "react"
import { useUserContext } from "../../../../entities/user"
import { useLocation, useNavigate } from "react-router-dom"

export function Header() {
	const [whichSelected, setWhichSelected] = useState<WhichSelected>("main")

	const navigation = useNavigate()

	const location = useLocation()

	const { logout } = useUserContext()

	useEffect(()=>{
		switch (location.pathname){
			case "/":
				setWhichSelected('main')
				break
			case "/settings":
				setWhichSelected("settings")
				break
		}
	},[])

	return (
		<div className={styles.container}>
			<button className={styles.logoButton} onClick={()=> {navigation('/'); setWhichSelected('main')}}>
				<Logo style={{height: "1.9vh"}	} />
			</button>

			<div className={styles.navigation}>
				<NavigationButton
					icon={<House style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Головна"
					redirect="/"
					onClick={()=>{setWhichSelected('main')}}
					isSelected={whichSelected == "main"}
				/>
				<NavigationButton
					icon={<Gallery style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Мої публікації"
					redirect=""
					onClick={()=>{setWhichSelected('my posts')}}
					isSelected={whichSelected == "my posts"}
				/>
				<NavigationButton
					icon={<People style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Друзі"
					redirect=""
					onClick={()=>{setWhichSelected('friends')}}
					isSelected={whichSelected == "friends"}
				/>
				<NavigationButton
					icon={<Chat style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Чати"
					redirect=""
					onClick={()=>{setWhichSelected('chats')}}
					isSelected={whichSelected == "chats"}
				/>
				<NavigationButton
					icon={<Settings style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Налаштування"
					redirect="/settings"
					onClick={()=>{setWhichSelected('settings')}}
					isSelected={whichSelected == "settings"}
				/>

				<Button
					fill={false}
					function={() => {logout()}}
					icon={<Logout style={{height: "1.8vh", width: "1.8vh"}} />}
					text="Вихід"
				/>
			</div>
		</div>
	)
}
