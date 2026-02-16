import { ReactNode } from "react";
import { UserContextProvider } from "../entities/user";
import { CookiesProvider } from "react-cookie";



interface ContextProvidersProps {
    children: ReactNode
}


export function ContextProviders(props: ContextProvidersProps) {
    return (
        <UserContextProvider>
            <CookiesProvider>
                {props.children}
            </CookiesProvider>
        </UserContextProvider>
    )
}