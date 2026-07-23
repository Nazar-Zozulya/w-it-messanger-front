import { Input } from "../shared/ui/input"
import { AppProviders } from "./providers"
import "./fontsManager.css"
import { ModalsShower } from "./modalsShower"
import { ContextProviders } from "./contextProviders"
import { InitialFetches } from "./initialFetches"
import { BrowserRouter } from "react-router-dom"

export function App() {
	return (
		<ContextProviders>
			<ModalsShower>
				<BrowserRouter>
					<InitialFetches>
						<AppProviders />
					</InitialFetches>
				</BrowserRouter>
			</ModalsShower>
		</ContextProviders>
	)
}
