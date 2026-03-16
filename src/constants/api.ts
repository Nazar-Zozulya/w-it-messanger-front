import { ServicesUrlPath } from "../types/api";

export const servicesUrlPath: ServicesUrlPath = {
    // userService: process.env.REACT_APP_USER_SERVICE_URL ||  "https://localhost:4242",
    // postService: process.env.REACT_APP_POST_SERVICE_URL ||  "https://localhost:4252",
    userService: "https://localhost:4242",
    postService: "https://localhost:4252",
    chatService: process.env.REACT_APP_CHAT_SERVICE_URL ||  "",

}