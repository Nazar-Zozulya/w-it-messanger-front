import { ReactNode, useEffect } from "react";
import { usePostsManager } from "../entities/post";


interface InitialFetchesProps {
    children: ReactNode;
}


export function InitialFetches(props: InitialFetchesProps) {

    const { getPosts } = usePostsManager()

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>{props.children}</>
    )
}