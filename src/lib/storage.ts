const KEY = 'lunch-decider-history';
const DATE_KEY = 'lunch-decider-date';

type HistoryData = {
  date: string;
  ids: string[];
};

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): HistoryData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { date: todayString(), ids: [] };
    const data = JSON.parse(raw) as HistoryData;
    if (data.date !== todayString()) {
      return { date: todayString(), ids: [] };
    }
    return data;
  } catch {
    return { date: todayString(), ids: [] };
  }
}

function save(data: HistoryData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
  localStorage.setItem(DATE_KEY, data.date);
}

export function getTodayPickedIds(): Set<string> {
  return new Set(load().ids);
}

export function recordPick(id: string): void {
  const data = load();
  if (!data.ids.includes(id)) {
    data.ids.push(id);
    save(data);
  }
}

export function clearTodayHistory(): void {
  save({ date: todayString(), ids: [] });
}
