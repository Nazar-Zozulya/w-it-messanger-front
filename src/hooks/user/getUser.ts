import { useEffect, useState } from "react";
import { User } from "../../entities/user";
import { useHooksResult } from "../../types/hooks";
import { GET } from "../../helpers/get";

export function useGetUser(id: number): useHooksResult<User | null> {
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    async function getUser() {
        try {
            setIsLoading(true);
            const result = await GET<User>({endpoint: `api/user/get/${id}`, whichService: "userService"})
            if (result.status === "success") {
                setUser(result.data);
            }
            else { 
                setError(result.message ?? 'Unknown error');
            }
            setIsLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getUser();
    }, [])

    return {data: user, error, isLoading, function: getUser};
}