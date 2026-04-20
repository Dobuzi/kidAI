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
      <p>{problem.prompt}</p>
      <div className="chalk-card">
        <strong>학습 목표</strong>
        <p>정답만 보지 않고, 힌트를 따라가며 스스로 설명할 수 있는지 확인해요.</p>
      </div>
    </section>
  );
}
