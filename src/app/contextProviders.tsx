import { ReactNode } from "react";
import { UserContextProvider } from "../entities/user";



interface ContextProvidersProps {
    children: ReactNode
}


export function ContextProviders(props: ContextProvidersProps) {
    return (
        <UserContextProvider>{props.children}</UserContextProvider>
    )
}