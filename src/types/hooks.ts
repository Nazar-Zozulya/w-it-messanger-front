export interface useHooksResult<T> {
    error?: string
    data: T
    isLoading: boolean
    function: () => void
}
