import { Input } from "../shared/ui/input"
import { AppProviders } from "./providers"
import "./fontsManager.css"
import { ModalsShower } from "./modalsShower"
import { ContextProviders } from "./contextProviders"
import { InitialFetches } from "./initialFetches"

export function App() {
	return (
		<ContextProviders>
			<ModalsShower>
				<InitialFetches>
					<AppProviders />
				</InitialFetches>
			</ModalsShower>
		</ContextProviders>
	)
}
