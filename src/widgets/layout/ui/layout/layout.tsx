import { Outlet, useLocation } from "react-router-dom"
import { Header } from "../header"
import styles from "./layout.module.css"
import { FooterForPhones } from "../footer-for-phones"
import { useUserContext } from "../../../../entities/user"

export function Layout() {
	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.content}>
				<Outlet />
			</div>
			{user && <FooterForPhones />}
		</div>
	)
}
