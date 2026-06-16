


import { create } from "zustand";
import { createSocket } from "./socket";
import { Socket } from "socket.io-client";

interface SocketStore {
    socket: Socket | null;

    isConnected: boolean;

    connect: () => void;
    disconnect: () => void;

    send: <T>(event: string, data: T) => void
        // sendNewMessage: (data: newMessageCredentials) => void
    enterGlobalChat: (userId: number) => void
    leaveGlobalChat: (userId: number) => void
}

export const useGlobalChatSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    isConnected: false,

    connect: () => {
        if (get().socket) return;

        const socket = createSocket("global");

        socket.on("connect", () => {
            console.log(1111111)
            set({ isConnected: true });
        });

        socket.on("global-message:new", (data: any) => {
            console.log("WS message:", data);
        });

        socket.on("disconnect", () => {
            set({
                socket: null,
                isConnected: false,
            });
        });

        set({ socket });
    },

    disconnect: () => {
        const socket = get().socket;

        socket?.close();

        set({
            socket: null,
            isConnected: false,
        });
    },

    send: (event, data) => {
        const socket = get().socket;

        socket?.emit(event, {data: data});
    },

    enterGlobalChat: (chatId) => {
		get().socket?.emit("globalChat:join", chatId)
	},

	leaveGlobalChat: (chatId) => {
		get().socket?.emit("globalChat:leave", chatId)
	},
}));