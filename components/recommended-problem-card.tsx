"use client";

import Link from "next/link";

import type { PracticeProblem } from "@/lib/data/problems";
import { getSubject } from "@/lib/data/subjects";

export function RecommendedProblemCard({ problem }: { problem: PracticeProblem }) {
  const subject = getSubject(problem.subject);

  return (
    <article className="recommended-card">
      <div>
        <span className="tag">{subject?.name ?? "추천 문제"}</span>
        <h3>{problem.title}</h3>
        <p>{problem.prompt}</p>
      </div>
      <Link href={`/learn/${problem.subject}?prompt=${encodeURIComponent(problem.prompt)}`}>
        추천 문제 풀기
      </Link>
    </article>
  );
}
