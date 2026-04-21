import Link from "next/link";
import { Suspense } from "react";

import { ChatPanel } from "@/components/chat-panel";
import { ProblemPanel } from "@/components/problem-panel";
import { recommendedProblems } from "@/lib/data/problems";
import { getSubject, subjects } from "@/lib/data/subjects";

type LearningPageProps = {
  params: Promise<{
    subject: string;
  }>;
};

export function generateStaticParams() {
  return subjects.map((subject) => ({
    subject: subject.key
  }));
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { subject: subjectKey } = await params;
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

  const problem = recommendedProblems[subject.key];

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        홈으로 돌아가기
      </Link>
      <div className="learning-layout">
        <ProblemPanel problem={problem} subject={subject} />
        <Suspense fallback={null}>
          <ChatPanel problem={problem} subject={subject.key} />
        </Suspense>
      </div>
    </main>
  );
}
