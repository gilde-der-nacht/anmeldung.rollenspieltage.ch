import { writable } from "svelte/store";

export const finalizeStore = writable({
    isLoading: false,
    hasError: false,
})