import type { SubjectKey } from "@/lib/ai/session";

export type PracticeChoice = {
  id: string;
  text: string;
};

export type PracticeProblem = {
  subject: SubjectKey;
  title: string;
  question: string;
  choices: PracticeChoice[];
  correctChoice: string;
  prompt: string;
};

export const recommendedProblems: Record<SubjectKey, PracticeProblem> = {
  korean: {
    subject: "korean",
    title: "주인공 마음 찾기",
    question: "아이가 친구에게 우산을 빌려준 뒤 기분이 좋아졌어요. 가장 알맞은 이유는 무엇일까요?",
    choices: [
      { id: "a", text: "숙제를 빨리 끝내서" },
      { id: "b", text: "친구를 도와 뿌듯해서" },
      { id: "c", text: "비가 바로 그쳐서" }
    ],
    correctChoice: "b",
    prompt: "인물의 행동과 마음을 연결해서 읽는 방법을 설명해 줘."
  },
  english: {
    subject: "english",
    title: "오늘의 영어 문장",
    question: "\"I go to school by bus.\"에서 이동 수단을 나타내는 말은 무엇일까요?",
    choices: [
      { id: "a", text: "school" },
      { id: "b", text: "go" },
      { id: "c", text: "by bus" }
    ],
    correctChoice: "c",
    prompt: "짧은 영어 문장에서 핵심 단어를 찾는 방법을 설명해 줘."
  },
  math: {
    subject: "math",
    title: "덧셈 전략 찾기",
    question: "27 + 16을 가장 쉽게 계산한 방법은 무엇일까요?",
    choices: [
      { id: "a", text: "20과 10, 7과 6으로 나눠 더한다" },
      { id: "b", text: "27에서 16을 뺀다" },
      { id: "c", text: "숫자 순서를 바꾸지 않고 외운다" }
    ],
    correctChoice: "a",
    prompt: "두 자리 수 덧셈을 쉬운 순서로 푸는 방법을 설명해 줘."
  },
  science: {
    subject: "science",
    title: "무지개 관찰 노트",
    question: "무지개가 보일 때 가장 중요한 조건은 무엇일까요?",
    choices: [
      { id: "a", text: "햇빛과 공기 중 물방울이 함께 있을 때" },
      { id: "b", text: "구름이 하나도 없을 때" },
      { id: "c", text: "바람이 아주 강하게 불 때" }
    ],
    correctChoice: "a",
    prompt: "무지개가 생기는 원인을 관찰 중심으로 설명해 줘."
  }
};
