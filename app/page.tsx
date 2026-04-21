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
            <h1 className="title">과목을 고르고, 답을 고르고, 바로 이해하는 kidAI</h1>
            <p className="subtitle">
              설명을 길게 쓰지 않아도 됩니다. 과목을 누르고 객관식 문제를 풀면서
              힌트와 풀이를 바로 확인하세요.
            </p>
          </div>
          <div className="hero-board">
            <div className="chalk-card">
              <strong>학습 흐름</strong>
              <p>과목 선택 → 답 고르기 → 풀이 확인</p>
            </div>
            <div className="chalk-card">
              <strong>바로 시작</strong>
              <p>국어, 영어, 수학, 과학 중 하나를 누르면 곧바로 문제를 풀 수 있어요.</p>
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

      <section className="section concise-highlight">
        <RecommendedProblemCard problem={recommendedProblems.math} />
      </section>

      <section className="section">
        <RecentLearningList />
      </section>
    </main>
  );
}
