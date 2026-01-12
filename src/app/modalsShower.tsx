import { useEffect } from "react"
import { useModalManagerStore } from "../entities/modal/model/storage/modalManager"
import { CreatePostModal } from "../widgets/post"






export function ModalsShower(props: {children: React.ReactNode}) {
    const { activeModal } = useModalManagerStore()
    useEffect(()=> {
        console.log("Active modal changed to: ", activeModal)
    }, [activeModal])
    return (
        <>
            { props.children }
            { activeModal == "createPost" &&  <CreatePostModal/> }
        </>
    )
}