import { PostCard } from "../../entities/post";
import { UserAvatar } from "../../entities/user";
import { ChatsBlock, RequestBlock } from "../../widgets/main_page";
import { CreatePostBlock } from "../../widgets/post";
import { ProfileBlock } from "../../widgets/user";




export function MainPage() {
    return(
        <div style={{display: "flex", flexDirection: "row", padding: "10px 80px", gap: "5px", width:"100%",justifyContent: "center"}}>
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