import type { SubjectKey } from "@/lib/ai/session";

export type PracticeProblem = {
  subject: SubjectKey;
  title: string;
  prompt: string;
};

export const recommendedProblems: Record<SubjectKey, PracticeProblem> = {
  korean: {
    subject: "korean",
    title: "주인공 마음 찾기",
    prompt: "짧은 글을 읽고 주인공의 기분이 왜 바뀌었는지 설명해 봐."
  },
  english: {
    subject: "english",
    title: "오늘의 영어 문장",
    prompt: "\"I go to school by bus.\" 문장에서 중요한 단어와 뜻을 알려 줘."
  },
  math: {
    subject: "math",
    title: "덧셈 전략 찾기",
    prompt: "27 + 16을 어떻게 계산하면 쉬운지 단계별로 설명해 줘."
  },
  science: {
    subject: "science",
    title: "무지개 관찰 노트",
    prompt: "무지개가 왜 보이는지 초등학생도 이해할 수 있게 설명해 줘."
  }
};
