"use client";

import { useEffect, useMemo, useState } from "react";

import { buildLearningResponse, type Difficulty, type SubjectKey } from "@/lib/ai/session";
import { saveRecentLearning } from "@/lib/storage/recent-learning";

const difficultyOptions: Array<{ value: Difficulty; label: string }> = [
  { value: "easy", label: "쉬움" },
  { value: "normal", label: "보통" },
  { value: "challenge", label: "도전" }
];

export function ChatPanel({
  initialPrompt,
  subject
}: {
  initialPrompt: string;
  subject: SubjectKey;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [followUp, setFollowUp] = useState("");
  const [activePrompt, setActivePrompt] = useState(initialPrompt);

  const response = useMemo(
    () =>
      buildLearningResponse({
        subject,
        difficulty,
        prompt: activePrompt
      }),
    [activePrompt, difficulty, subject]
  );

  useEffect(() => {
    saveRecentLearning({
      subject,
      title: activePrompt,
      timestamp: new Date().toISOString()
    });
  }, [activePrompt, subject]);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>AI 학습 설명</h2>
          <p>힌트부터 시작해서 차근차근 이해할 수 있게 도와줘요.</p>
        </div>
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

      <div className="chat-input">
        <input
          placeholder="다른 질문도 이어서 해볼까요?"
          value={followUp}
          onChange={(event) => setFollowUp(event.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const nextPrompt = followUp.trim();

            if (!nextPrompt) {
              return;
            }

            setActivePrompt(nextPrompt);
            setFollowUp("");
          }}
        >
          다시 물어보기
        </button>
      </div>
    </section>
  );
}
