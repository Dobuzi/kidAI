"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getRecentLearning, type RecentLearningEntry } from "@/lib/storage/recent-learning";

export function RecentLearningList() {
  const [entries, setEntries] = useState<RecentLearningEntry[]>([]);

  useEffect(() => {
    setEntries(getRecentLearning());
  }, []);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>최근 학습</h2>
          <p>방금 공부한 내용을 다시 이어서 볼 수 있어요.</p>
        </div>
      </div>
      {entries.length === 0 ? (
        <div className="empty-state">
          <p className="section-note">아직 기록이 없어요. 추천 문제나 과목 카드를 눌러 시작해 보세요.</p>
        </div>
      ) : (
        <ul className="recent-list">
          {entries.map((entry) => (
            <li key={`${entry.subject}-${entry.timestamp}`}>
              <div>
                <strong>{entry.title}</strong>
                <p>{entry.subject}</p>
              </div>
              <Link className="tag" href={`/learn/${entry.subject}?prompt=${encodeURIComponent(entry.title)}`}>
                다시 보기
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
