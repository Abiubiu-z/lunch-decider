import type { Category, MenuItem } from '../data/menu';

export type FilterState = {
  categories: Set<Category>;
  tags: Set<string>;
  mood: string;
};

export const MOOD_TAGS: Record<string, string[]> = {
  heavy: ['heavy', 'spicy'],
  light_mood: ['light_mood', 'mild'],
  fast: ['fast'],
  treat: ['treat', 'expensive'],
};

export function createEmptyFilters(): FilterState {
  return {
    categories: new Set(),
    tags: new Set(),
    mood: '',
  };
}

export function filterMenu(items: MenuItem[], filters: FilterState): MenuItem[] {
  return items.filter((item) => {
    if (filters.categories.size > 0 && !filters.categories.has(item.category)) {
      return false;
    }

    if (filters.tags.size > 0) {
      const hasAllTags = [...filters.tags].every((t) => item.tags.includes(t));
      if (!hasAllTags) return false;
    }

    if (filters.mood) {
      const moodTags = MOOD_TAGS[filters.mood];
      if (moodTags && !moodTags.some((t) => item.tags.includes(t))) {
        return false;
      }
    }

    return true;
  });
}
