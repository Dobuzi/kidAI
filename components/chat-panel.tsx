"use client";

import { useEffect, useMemo, useState } from "react";

import { buildLearningResponse, type Difficulty, type SubjectKey } from "@/lib/ai/session";
import type { PracticeProblem } from "@/lib/data/problems";
import { saveRecentLearning } from "@/lib/storage/recent-learning";

const difficultyOptions: Array<{ value: Difficulty; label: string }> = [
  { value: "easy", label: "쉬움" },
  { value: "normal", label: "보통" },
  { value: "challenge", label: "도전" }
];

export function ChatPanel({
  problem,
  subject
}: {
  problem: PracticeProblem;
  subject: SubjectKey;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [selectedChoiceId, setSelectedChoiceId] = useState(problem.choices[0]?.id ?? "");

  const selectedChoice =
    problem.choices.find((choice) => choice.id === selectedChoiceId) ?? problem.choices[0];
  const correctChoice = problem.choices.find((choice) => choice.id === problem.correctChoice);

  const response = useMemo(
    () =>
      buildLearningResponse({
        subject,
        difficulty,
        prompt: problem.prompt,
        selectedChoice: selectedChoice?.text ?? "",
        correctChoice: correctChoice?.text ?? "",
        isCorrect: selectedChoice?.id === problem.correctChoice
      }),
    [
      correctChoice?.text,
      difficulty,
      problem.correctChoice,
      problem.prompt,
      selectedChoice?.id,
      selectedChoice?.text,
      subject
    ]
  );

  useEffect(() => {
    saveRecentLearning({
      subject,
      title: problem.title,
      timestamp: new Date().toISOString()
    });
  }, [problem.title, subject]);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>정답 고르기</h2>
          <p>답을 하나 고르면 바로 힌트와 풀이가 바뀌어요.</p>
        </div>
      </div>

      <div className="choice-group">
        {problem.choices.map((choice) => {
          const isActive = choice.id === selectedChoiceId;

          return (
            <button
              key={choice.id}
              className={isActive ? "active" : undefined}
              type="button"
              onClick={() => setSelectedChoiceId(choice.id)}
            >
              <span>{choice.id.toUpperCase()}</span>
              <strong>{choice.text}</strong>
            </button>
          );
        })}
      </div>

      <div>
        <strong>설명 난이도</strong>
        <div className="difficulty-group">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              className={difficulty === option.value ? "active" : undefined}
              type="button"
              onClick={() => setDifficulty(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="response-stack">
        {response.sections.map((section) => (
          <article key={section.type} className="response-card">
            <strong>
              {section.type === "hint"
                ? "힌트"
                : section.type === "explanation"
                  ? "풀이 설명"
                  : "정리"}
            </strong>
            <p>{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
