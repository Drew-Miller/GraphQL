import { writable } from "svelte/store";

const mouseEventStore = writable<MouseEvent | KeyboardEvent | null>(null);

export { mouseEventStore };