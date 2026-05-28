import type { MenuItem } from '../data/menu';
import { getTodayPickedIds } from './storage';

export function pickRandom(
  pool: MenuItem[],
  options: { allowRepeat: boolean; excludeIds?: Set<string> }
): MenuItem | null {
  if (pool.length === 0) return null;

  let candidates = pool;

  if (!options.allowRepeat) {
    const picked = getTodayPickedIds();
    const extra = options.excludeIds ?? new Set<string>();
    candidates = pool.filter((m) => !picked.has(m.id) && !extra.has(m.id));
    if (candidates.length === 0) {
      candidates = pool.filter((m) => !extra.has(m.id));
      if (candidates.length === 0) return null;
    }
  } else if (options.excludeIds?.size) {
    candidates = pool.filter((m) => !options.excludeIds!.has(m.id));
    if (candidates.length === 0) candidates = pool;
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index] ?? null;
}

export function shuffleForWheel(pool: MenuItem[], maxSlices = 12): MenuItem[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(maxSlices, copy.length));
}
