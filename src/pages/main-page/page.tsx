import { useEffect, useState } from "react";
import { ChatsBlock, RequestBlock } from "../../widgets/main_page";
import { CreatePostBlock, CreatePostModal, PostsList } from "../../widgets/post";
import { ProfileBlock } from "../../widgets/user";
import { useCookies } from "react-cookie";
import { useModalManagerStore } from "../../entities/modal/model/storage/modalManager";




export function MainPage() {
    const [ isVisible, setIsVisible ] = useState<boolean>(true)
    const { openModal } = useModalManagerStore()

    const [cookies, setCookie, removeCookie] = useCookies(['complete-profile'])

    useEffect(() => {
        if (cookies["complete-profile"] === "yes") {
            openModal("completeProfile")
            // удаления не надо ведь ето куки бует жить 10 секунд
            // removeCookie("complete-profile")
        }
    })

    return(
        <div style={{display: "flex", flexDirection: "row", padding: "10px 80px", gap: "5px", width:"100%",justifyContent: "center", position: "relative"}}>
            <div style={{display: "flex", flexDirection:"column", gap:"20px"}}>
                <ProfileBlock />
                <RequestBlock />
                <ChatsBlock />
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <CreatePostBlock />

                <PostsList />
            </div> 
        </div>
    )
}