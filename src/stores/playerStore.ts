import { map } from "nanostores";

export type PlayerState = {
  playing: boolean;
  volume: number; // 0..1
  muted: boolean;
  url: string;
  position: number; // en segundos
};

export const playerStore = map<PlayerState>({
  playing: false,
  volume: 1,
  muted: false,
  url: "https://player.kick.com/fmbrava",
  position: 0,
});

// Helpers
export function loadUrl(url: string) {
  playerStore.setKey("url", url);
}
export function play() {
  playerStore.setKey("playing", true);
}
export function pause() {
  playerStore.setKey("playing", false);
}
export function toggle() {
  playerStore.setKey("playing", !playerStore.get().playing);
}
export function setVolume(v: number) {
  playerStore.setKey("volume", Math.max(0, Math.min(1, v)));
}
export function setMuted(m: boolean) {
  playerStore.setKey("muted", m);
}
export function setPosition(sec: number) {
  playerStore.setKey("position", sec);
}
