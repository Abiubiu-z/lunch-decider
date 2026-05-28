import { MENU, CATEGORY_LABELS, TAG_LABELS, type Category } from './data/menu';
import { renderResult, hideResult } from './components/result';
import { createWheel } from './components/wheel';
import {
  createEmptyFilters,
  filterMenu,
  type FilterState,
} from './lib/filter';
import { pickRandom, shuffleForWheel } from './lib/random';
import { celebrateConfirm, delay } from './lib/celebration';
import { recordPick } from './lib/storage';

const CATEGORY_OPTIONS: Category[] = [
  'chinese',
  'western',
  'japanese',
  'korean',
  'southeast_asian',
  'fast_food',
  'noodles',
  'rice',
  'light',
  'hotpot_bbq',
  'snack',
  'drink_combo',
];

const TAG_OPTIONS = [
  'spicy',
  'mild',
  'meat',
  'veg',
  'cheap',
  'solo',
  'group',
] as const;

const poolCountEl = document.getElementById('pool-count')!;
const totalCountEl = document.getElementById('total-count')!;
const categoryChipsEl = document.getElementById('category-chips')!;
const tagChipsEl = document.getElementById('tag-chips')!;
const moodSelect = document.getElementById('mood-select') as HTMLSelectElement;
const allowRepeatEl = document.getElementById('allow-repeat') as HTMLInputElement;
const resetFiltersBtn = document.getElementById('reset-filters')!;
const btnDecide = document.getElementById('btn-decide') as HTMLButtonElement;
const btnWheel = document.getElementById('btn-wheel')!;
const wheelSection = document.getElementById('wheel-section')!;
const wheelCanvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
const btnSpin = document.getElementById('btn-spin') as HTMLButtonElement;
const resultSection = document.getElementById('result-section')!;
const resultName = document.getElementById('result-name')!;
const resultMeta = document.getElementById('result-meta')!;
const resultTags = document.getElementById('result-tags')!;
const resultDesc = document.getElementById('result-desc')!;
const btnConfirm = document.getElementById('btn-confirm')!;
const btnAnother = document.getElementById('btn-another') as HTMLButtonElement;
const messageEl = document.getElementById('message')!;
const resultCard = document.getElementById('result-card')!;

let filters: FilterState = createEmptyFilters();
let isDeciding = false;
let lastExclude = new Set<string>();
let currentItem: (typeof MENU)[0] | null = null;
let wheelVisible = false;

const wheel = createWheel(wheelCanvas);

function getPool() {
  return filterMenu(MENU, filters);
}

function updatePoolCount() {
  const pool = getPool();
  poolCountEl.textContent = `候选：${pool.length} 道（共 ${MENU.length} 道）`;
  btnSpin.disabled = pool.length === 0;

  if (wheelVisible) {
    wheel.setItems(shuffleForWheel(pool));
  }
}

function showMessage(text: string) {
  messageEl.textContent = text;
  messageEl.classList.remove('hidden');
}

function hideMessage() {
  messageEl.classList.add('hidden');
}

function buildChips(
  container: HTMLElement,
  options: { value: string; label: string }[],
  type: 'category' | 'tag'
) {
  container.innerHTML = '';
  for (const opt of options) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip';
    btn.textContent = opt.label;
    btn.dataset.value = opt.value;
    btn.addEventListener('click', () => {
      const set =
        type === 'category' ? filters.categories : filters.tags;
      const key = opt.value as Category & string;
      if (set.has(key)) {
        set.delete(key);
        btn.classList.remove('active');
      } else {
        set.add(key);
        btn.classList.add('active');
      }
      updatePoolCount();
      hideMessage();
    });
    container.appendChild(btn);
  }
}

function resetFilters() {
  filters = createEmptyFilters();
  moodSelect.value = '';
  document.querySelectorAll('.chip.active').forEach((el) => {
    el.classList.remove('active');
  });
  updatePoolCount();
  hideMessage();
}

function showResult(item: (typeof MENU)[0], record = true) {
  currentItem = item;
  if (record) recordPick(item.id);
  hideMessage();
  renderResult(item, {
    name: resultName,
    meta: resultMeta,
    tags: resultTags,
    desc: resultDesc,
    section: resultSection,
    card: resultCard,
  });
}

function setDeciding(active: boolean) {
  isDeciding = active;
  btnDecide.disabled = active;
  btnAnother.disabled = active;
  btnDecide.classList.toggle('is-deciding', active);
  btnDecide.textContent = active ? '正在想…' : '帮我决定';
}

async function decide(excludeCurrent = false) {
  if (isDeciding) return;

  const pool = getPool();
  if (pool.length === 0) {
    showMessage('没有符合条件的菜品，请放宽筛选试试。');
    return;
  }

  setDeciding(true);
  await delay(500 + Math.random() * 400);

  const exclude = new Set(lastExclude);
  if (excludeCurrent && currentItem) {
    exclude.add(currentItem.id);
  }

  const picked = pickRandom(pool, {
    allowRepeat: allowRepeatEl.checked,
    excludeIds: exclude,
  });

  setDeciding(false);

  if (!picked) {
    showMessage('候选已用完，请放宽筛选或开启「允许重复」。');
    return;
  }

  lastExclude.add(picked.id);
  showResult(picked);
}

// Init chips
buildChips(
  categoryChipsEl,
  CATEGORY_OPTIONS.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
  'category'
);
buildChips(
  tagChipsEl,
  TAG_OPTIONS.map((t) => ({ value: t, label: TAG_LABELS[t] })),
  'tag'
);

totalCountEl.textContent = String(MENU.length);
updatePoolCount();

moodSelect.addEventListener('change', () => {
  filters.mood = moodSelect.value;
  updatePoolCount();
});

resetFiltersBtn.addEventListener('click', resetFilters);

btnDecide.addEventListener('click', () => {
  wheelSection.classList.add('hidden');
  wheelVisible = false;
  void decide(false);
});

btnWheel.addEventListener('click', () => {
  const pool = getPool();
  if (pool.length === 0) {
    showMessage('没有符合条件的菜品，请放宽筛选。');
    return;
  }
  wheelVisible = true;
  wheelSection.classList.remove('hidden');
  hideResult(resultSection);
  wheel.setItems(shuffleForWheel(pool));
  hideMessage();
});

btnSpin.addEventListener('click', async () => {
  if (wheel.isSpinning()) return;
  const pool = getPool();
  if (pool.length === 0) return;

  btnSpin.disabled = true;
  const sliceItems = shuffleForWheel(pool);
  wheel.setItems(sliceItems);
  const winner = await wheel.spin();
  btnSpin.disabled = getPool().length === 0;

  if (winner) {
    showResult(winner);
  }
});

btnConfirm.addEventListener('click', () => {
  if (currentItem) {
    celebrateConfirm();
    showMessage(`好！今天就吃「${currentItem.name}」～`);
    messageEl.classList.add('message-success');
    resultCard.classList.add('confirmed');
  }
});

btnAnother.addEventListener('click', () => {
  messageEl.classList.remove('message-success');
  resultCard.classList.remove('confirmed');
  void decide(true);
});
