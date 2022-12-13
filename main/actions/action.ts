import {io} from "../server";

export function hit() {
    console.log("Hit");
}
export function ability() {
    console.log("Ability");
}
export function revive() {
    console.log("Revive");
}
export function message(msg) {
    io.emit('chat message', msg);
}