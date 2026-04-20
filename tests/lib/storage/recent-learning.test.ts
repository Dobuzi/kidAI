import { beforeEach, describe, expect, it } from "vitest";

import {
  getRecentLearning,
  saveRecentLearning,
  type RecentLearningEntry
} from "@/lib/storage/recent-learning";

describe("recent learning storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves and returns recent items", () => {
    const entry: RecentLearningEntry = {
      subject: "math",
      title: "덧셈 문제",
      timestamp: "2026-04-20T10:00:00.000Z"
    };

    saveRecentLearning(entry);

    expect(getRecentLearning()).toEqual([entry]);
  });

  it("returns the newest item first", () => {
    saveRecentLearning({
      subject: "korean",
      title: "받침 읽기",
      timestamp: "2026-04-20T09:00:00.000Z"
    });
    saveRecentLearning({
      subject: "science",
      title: "식물의 성장",
      timestamp: "2026-04-20T11:00:00.000Z"
    });

    expect(getRecentLearning().map((item) => item.title)).toEqual([
      "식물의 성장",
      "받침 읽기"
    ]);
  });

  it("keeps only the 5 most recent items", () => {
    for (let index = 0; index < 6; index += 1) {
      saveRecentLearning({
        subject: "english",
        title: `단어 ${index}`,
        timestamp: `2026-04-20T1${index}:00:00.000Z`
      });
    }

    const entries = getRecentLearning();

    expect(entries).toHaveLength(5);
    expect(entries.some((entry) => entry.title === "단어 0")).toBe(false);
  });
});
