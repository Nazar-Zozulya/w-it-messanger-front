import { create } from "zustand";
import { User } from "../../../user";



interface FriendsManagerStoreTypes {
    requests: User[] | null
    recomendations: User[] | null
    allFriends: User[] | null
}


export const useFriendsManager = create<FriendsManagerStoreTypes>((set, get) => ({
    requests: null,
    recomendations: null,
    allFriends: null
}))