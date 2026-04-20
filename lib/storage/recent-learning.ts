export type RecentLearningEntry = {
  subject: string;
  title: string;
  timestamp: string;
};

const STORAGE_KEY = "kidai-recent-learning";
const MAX_ENTRIES = 5;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getRecentLearning(): RecentLearningEntry[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as RecentLearningEntry[];

    return parsed.sort((left, right) => right.timestamp.localeCompare(left.timestamp));
  } catch {
    return [];
  }
}

export function saveRecentLearning(entry: RecentLearningEntry) {
  if (!canUseStorage()) {
    return [];
  }

  const nextEntries = [entry, ...getRecentLearning()]
    .sort((left, right) => right.timestamp.localeCompare(left.timestamp))
    .slice(0, MAX_ENTRIES);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));

  return nextEntries;
}
