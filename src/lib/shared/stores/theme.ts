import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';
const storageKey = 'theme-preference';

const defaultValue: Theme = 'dark';
const initialValue = browser ? (window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light") ?? defaultValue : defaultValue;

const theme = writable<Theme>(initialValue);

theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem(storageKey, value);
    }
});

export default theme;