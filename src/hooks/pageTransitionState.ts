export const pageContentRef: { current: HTMLDivElement | null } = { current: null };
export let transitionDirection: 1 | -1 | 0 = 0;

export function setTransitionDirection(dir: 1 | -1 | 0) {
  transitionDirection = dir;
}
