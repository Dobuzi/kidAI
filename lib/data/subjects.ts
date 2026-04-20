import type { SubjectKey } from "@/lib/ai/session";

export type Subject = {
  key: SubjectKey;
  name: string;
  description: string;
  accent: string;
  glow: string;
};

export const subjects: Subject[] = [
  {
    key: "korean",
    name: "국어",
    description: "글 읽기와 문장 이해를 차분하게 연습해요.",
    accent: "#ff7a59",
    glow: "#ffd7c8"
  },
  {
    key: "english",
    name: "영어",
    description: "단어와 짧은 문장을 소리 내듯 익혀요.",
    accent: "#4d9cff",
    glow: "#d4e8ff"
  },
  {
    key: "math",
    name: "수학",
    description: "문제를 식으로 바꾸며 풀이 순서를 배워요.",
    accent: "#22b573",
    glow: "#d6f6e7"
  },
  {
    key: "science",
    name: "과학",
    description: "관찰한 현상을 원인과 결과로 연결해요.",
    accent: "#9b6bff",
    glow: "#e7dbff"
  }
];

export function getSubject(key: string) {
  return subjects.find((subject) => subject.key === key);
}
