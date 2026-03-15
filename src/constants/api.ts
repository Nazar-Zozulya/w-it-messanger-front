import { ServicesUrlPath } from "../types/api";

export const servicesUrlPath: ServicesUrlPath = {
    userService: process.env.REACT_APP_USER_SERVICE_URL ||  "https://localhost:8000",
    postService: process.env.REACT_APP_POST_SERVICE_URL ||  "https://localhost:8001",
    chatService: process.env.REACT_APP_CHAT_SERVICE_URL ||  "",

}