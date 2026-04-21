"use client";

import type { PracticeProblem } from "@/lib/data/problems";
import type { Subject } from "@/lib/data/subjects";

export function ProblemPanel({
  problem,
  subject
}: {
  problem: PracticeProblem;
  subject: Subject;
}) {
  return (
    <section className="panel">
      <div className="subject-banner">
        <div className="subject-orb" style={{ background: subject.accent }} />
        <div>
          <span className="tag">{subject.name}</span>
          <h2>{problem.title}</h2>
          <p>{subject.description}</p>
        </div>
      </div>
      <p>{problem.question}</p>
      <div className="chalk-card">
        <strong>학습 목표</strong>
        <p>선택지를 보고 근거를 찾은 뒤, 왜 그 답이 맞는지 설명까지 이어가요.</p>
      </div>
    </section>
  );
}
