import { Input } from "../shared/ui/input";
import { AppProviders } from "./providers";
import "./fontsManager.css"
import { ModalsShower } from "./modalsShower";




export function App() {
    return  (
        <ModalsShower>
            <AppProviders />
        </ModalsShower>
    )
}