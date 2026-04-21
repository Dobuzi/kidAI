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
  const [selectedChoiceId, setSelectedChoiceId] = useState("");

  const selectedChoice =
    problem.choices.find((choice) => choice.id === selectedChoiceId) ?? null;
  const correctChoice = problem.choices.find((choice) => choice.id === problem.correctChoice);
  const hasSelection = Boolean(selectedChoice);
  const isCorrect = selectedChoice?.id === problem.correctChoice;

  const response = useMemo(
    () => {
      if (!selectedChoice || !correctChoice) {
        return null;
      }

      return buildLearningResponse({
        subject,
        difficulty,
        prompt: problem.prompt,
        selectedChoice: selectedChoice.text,
        correctChoice: correctChoice.text,
        isCorrect
      });
    },
    [
      correctChoice,
      difficulty,
      isCorrect,
      problem.prompt,
      selectedChoice,
      subject
    ]
  );

  useEffect(() => {
    if (!hasSelection) {
      return;
    }

    saveRecentLearning({
      subject,
      title: problem.title,
      timestamp: new Date().toISOString()
    });
  }, [hasSelection, problem.title, subject]);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>정답 고르기</h2>
          <p>먼저 보기 하나를 고르면, 아래에 결과와 풀이가 나타나요.</p>
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

      {!hasSelection ? (
        <div className="empty-state result-placeholder">
          <strong>아직 답을 고르지 않았어요.</strong>
          <p>보기 중 하나를 누르면 정답 여부와 풀이를 바로 보여줘요.</p>
        </div>
      ) : (
        <>
          <article className={`result-card ${isCorrect ? "correct" : "incorrect"}`}>
            <div className="result-head">
              <strong>{isCorrect ? "정답이에요" : "아직 아니에요"}</strong>
              <span>{isCorrect ? "정답" : "오답"}</span>
            </div>
            <p>{isCorrect ? "잘 골랐어요. 이제 왜 맞는지 풀이를 읽어보세요." : "괜찮아요. 정답과 힌트를 같이 보면서 다시 확인해요."}</p>
            <div className="result-meta">
              <div>
                <small>내가 고른 답</small>
                <strong>{selectedChoice?.text}</strong>
              </div>
              <div>
                <small>정답</small>
                <strong>{correctChoice?.text}</strong>
              </div>
            </div>
          </article>

          <div className="response-stack">
            {response?.sections.map((section) => (
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
        </>
      )}
    </section>
  );
}
