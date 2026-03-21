import { ServicesUrlPath } from "../types/api";

export const servicesUrlPath: ServicesUrlPath = {
    userService: process.env.REACT_APP_USER_SERVICE_URL ||  "http://localhost:909",
    postService: process.env.REACT_APP_POST_SERVICE_URL ||  "http://localhost:909",
    chatService: process.env.REACT_APP_CHAT_SERVICE_URL ||  "http://localhost:909",

}