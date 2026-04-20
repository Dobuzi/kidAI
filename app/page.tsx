import { QuestionComposer } from "@/components/question-composer";
import { RecentLearningList } from "@/components/recent-learning-list";
import { RecommendedProblemCard } from "@/components/recommended-problem-card";
import { SubjectCard } from "@/components/subject-card";
import { recommendedProblems } from "@/lib/data/problems";
import { subjects } from "@/lib/data/subjects";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">어린이를 위한 AI 학습 도우미</div>
            <h1 className="title">질문하고, 힌트를 받고, 스스로 이해하는 kidAI</h1>
            <p className="subtitle">
              국어, 영어, 수학, 과학을 한 화면에서 바로 시작하세요. 답을 먼저 주기보다
              힌트와 설명으로 아이가 스스로 생각할 수 있게 도와줍니다.
            </p>
          </div>
          <div className="hero-board">
            <div className="chalk-card">
              <strong>오늘의 학습 흐름</strong>
              <p>과목 선택 → 난이도 조절 → 힌트 → 풀이 설명 → 정리</p>
            </div>
            <div className="chalk-card">
              <strong>아이에게 맞게</strong>
              <p>쉬움, 보통, 도전으로 같은 질문도 다른 깊이로 설명해요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>과목 선택</h2>
            <p>지금 배우고 싶은 주제를 바로 눌러 시작하세요.</p>
          </div>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => (
            <SubjectCard key={subject.key} subject={subject} />
          ))}
        </div>
      </section>

      <section className="section home-columns">
        <QuestionComposer />
        <RecommendedProblemCard problem={recommendedProblems.math} />
      </section>

      <section className="section">
        <RecentLearningList />
      </section>
    </main>
  );
}
