"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { ChatPanel } from "@/components/chat-panel";
import { ProblemPanel } from "@/components/problem-panel";
import { recommendedProblems } from "@/lib/data/problems";
import { getSubject } from "@/lib/data/subjects";

export default function LearningPage() {
  const params = useParams<{ subject: string }>();
  const searchParams = useSearchParams();
  const subjectKey = params.subject;
  const subject = getSubject(subjectKey);

  if (!subject) {
    return (
      <main className="shell">
        <Link className="back-link" href="/">
          홈으로 돌아가기
        </Link>
        <section className="panel">
          <h2>과목을 찾지 못했어요.</h2>
          <p>국어, 영어, 수학, 과학 카드 중 하나를 다시 선택해 주세요.</p>
        </section>
      </main>
    );
  }

  const prompt = searchParams.get("prompt") ?? recommendedProblems[subject.key].prompt;
  const problem = {
    ...recommendedProblems[subject.key],
    prompt
  };

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        홈으로 돌아가기
      </Link>
      <div className="learning-layout">
        <ProblemPanel problem={problem} subject={subject} />
        <ChatPanel initialPrompt={problem.prompt} subject={subject.key} />
      </div>
    </main>
  );
}
