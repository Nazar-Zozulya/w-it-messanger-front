import { HubConnection } from "@microsoft/signalr"
import { Socket } from "socket.io-client"
import { WHICH_SERVICE } from "../constants/which-service"

export const emit = async (
    socket: Socket | null,
    connection: HubConnection | null,
    event: string,
    data?: any
) => {
    console.log("emit", event);
    console.log("connection:", connection);
    console.log("state:", connection?.state);

    if (WHICH_SERVICE === "csharp") {
        if (!connection) {
            console.error("Connection is null");
            return;
        }

        await connection.invoke(event, data);
    } else {
        socket?.emit(event, data);
    }
};