import { useState } from "react";
import { PostCard } from "../../entities/post";
import { UserAvatar } from "../../entities/user";
import { ChatsBlock, RequestBlock } from "../../widgets/main_page";
import { CreatePostBlock, CreatePostModal } from "../../widgets/post";
import { ProfileBlock } from "../../widgets/user";




export function MainPage() {
    const [ isVisible, setIsVisible ] = useState<boolean>(true)

    return(
        <div style={{display: "flex", flexDirection: "row", padding: "10px 80px", gap: "5px", width:"100%",justifyContent: "center", position: "relative"}}>
            <div style={{display: "flex", flexDirection:"column", gap:"20px"}}>
                <ProfileBlock />
                <RequestBlock />
                <ChatsBlock />
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <CreatePostBlock />
                <PostCard />
            </div> 
        </div>
    )
}