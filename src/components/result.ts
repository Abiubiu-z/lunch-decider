import { CATEGORY_LABELS, TAG_LABELS, type MenuItem } from '../data/menu';
import { celebrateResult } from '../lib/celebration';

export function renderResult(
  item: MenuItem,
  elements: {
    name: HTMLElement;
    meta: HTMLElement;
    tags: HTMLElement;
    desc: HTMLElement;
    section: HTMLElement;
    card?: HTMLElement;
  }
): void {
  elements.name.textContent = item.name;
  elements.meta.textContent = CATEGORY_LABELS[item.category];

  elements.tags.innerHTML = '';
  for (const tag of item.tags) {
    const label = TAG_LABELS[tag] ?? tag;
    const span = document.createElement('span');
    span.className = 'tag-pill';
    span.textContent = label;
    elements.tags.appendChild(span);
  }

  elements.desc.textContent =
    item.description ?? '祝你用餐愉快，记得按时吃饭！';

  elements.section.classList.remove('hidden');
  const card =
    elements.card ??
    (elements.section.querySelector('.result-card') as HTMLElement | null);
  card?.classList.remove('hidden');

  if (card) {
    card.classList.remove('celebrate');
    void card.offsetWidth;
    card.classList.add('celebrate');
    celebrateResult(card);
  }

  elements.section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function hideResult(section: HTMLElement): void {
  section.classList.add('hidden');
}
