import { writable } from "svelte/store";

const mouseEventStore = writable<MouseEvent>();

export { mouseEventStore };