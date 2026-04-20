"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function QuestionComposer() {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  return (
    <section className="question-box">
      <div className="section-header">
        <div>
          <h2>오늘의 질문</h2>
          <p>궁금한 것을 적으면 수학 학습 화면에서 바로 시작할 수 있어요.</p>
        </div>
      </div>
      <textarea
        placeholder="예: 27 + 16은 왜 43이 되는지 쉽게 설명해 줘."
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          const nextQuestion = question.trim();

          if (!nextQuestion) {
            return;
          }

          router.push(`/learn/math?prompt=${encodeURIComponent(nextQuestion)}`);
        }}
      >
        질문으로 시작하기
      </button>
    </section>
  );
}
