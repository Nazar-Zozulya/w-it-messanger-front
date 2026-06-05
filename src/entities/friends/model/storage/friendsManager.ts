import { create } from "zustand";
import { User } from "../../../user";
import { GET } from "../../../../helpers/get";
import { POST } from "../../../../helpers/post";
import { use } from "react";
import { Result } from "../../../../types/result";

export type FriendshipStatus = "requester" | "none" | "friends" | "recipient"

interface FriendsManagerStoreTypes {
    requests: User[] | null
    recommendations: User[] | null
    allFriends: User[] | null
    getAllRequests: (token: string) => void
    getAllRecommendations: (token: string) => void
    getAllFriends: (token: string) => void
    sendRequest: (anotherUserId: number, token: string) => Promise<Result<string>>
    acceptRequest: (anotherUserId: number, token: string) => Promise<Result<string>>
    deleteRelationship: (anotherUserId: number, token: string) => Promise<Result<string>>
    whichFriendship: (anotherUserId: number, token: string) => Promise<FriendshipStatus | null>
}


export const useFriendsManager = create<FriendsManagerStoreTypes>((set, get) => ({
    requests: null,
    recommendations: null,
    allFriends: null,
    getAllRequests: async (token) => {
        const requests = await GET<User[]>({
            whichService: "userService",
            endpoint: "api/user/requests",
            token
        })
        if (requests.status === "error") return

        set({ requests: requests.data })
    },
    getAllRecommendations: async (token) => {
        const requests = await GET<User[]>({
            whichService: "userService",
            endpoint: "api/user/recommendations",
            token
        })
        if (requests.status === "error") return

        set({ recommendations: requests.data })
    },
    getAllFriends: async (token) => {
        const requests = await GET<User[]>({
            whichService: "userService",
            endpoint: "api/user/friends",
            token
        })
        if (requests.status === "error") return

        set({ allFriends: requests.data })
    },
    sendRequest: async (anotherUserId, token) => {
        const sendRequest = await POST<string>({
            whichService: "userService",
            endpoint: "api/user/send-request",
            body: {
                userId: anotherUserId,
            },
            token
        })

        if (sendRequest.status === "error") return sendRequest

        const recomendations = get().recommendations
        if (!recomendations) return sendRequest

        set({ recommendations: recomendations.filter(user => user.id !== anotherUserId) })
        return sendRequest
    },

    acceptRequest: async (anotherUserId, token) => {
        const acceptRequest = await POST<string>({
            method: "PATCH",
            whichService: "userService",
            endpoint: "api/user/accept-request",
            body: {
                userId: anotherUserId,
            },
            token
        })
        if (acceptRequest.status === "error") return acceptRequest

        const requests = get().requests
        if (!requests) return acceptRequest

        set({ requests: requests.filter(user => user.id !== anotherUserId) })

        const allFriends = get().allFriends
        if (!allFriends) return acceptRequest

        set({ allFriends: [...allFriends, requests.find(user => user.id === anotherUserId)!] }) 
        return acceptRequest
    },
    deleteRelationship: async (anotherUserId, token) => {
        const deleteRelationship = await POST<string>({
            method: "DELETE",
            whichService: "userService",
            endpoint: "api/user/delete-relationship",
            body: {
                userId: anotherUserId,
            },
            token
        })

        if (deleteRelationship.status === "error") return deleteRelationship

        const requests = get().requests

        if (requests) {
            set({ requests: requests.filter(user => user.id !== anotherUserId) })
        }

        const allFriends = get().allFriends

        if (allFriends) {
            set({ allFriends: allFriends.filter(user => user.id !== anotherUserId) })
        }
        return deleteRelationship
    },
    whichFriendship: async (anotherUserId, token) => {
        const whichFriendship = await GET<FriendshipStatus>({
            whichService: "userService",
            endpoint: `api/user/which-relationship/${anotherUserId}`,
            token
        })

        if (whichFriendship.status === "error") return null

        return whichFriendship.data
    }
}))