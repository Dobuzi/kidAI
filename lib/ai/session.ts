export type SubjectKey = "korean" | "english" | "math" | "science";
export type Difficulty = "easy" | "normal" | "challenge";
export type LearningSectionType = "hint" | "explanation" | "summary";

type LearningSection = {
  type: LearningSectionType;
  content: string;
};

type BuildLearningResponseInput = {
  subject: string;
  difficulty: Difficulty;
  prompt: string;
  selectedChoice: string;
  correctChoice: string;
  isCorrect: boolean;
};

type LearningResponse = {
  title: string;
  sections: LearningSection[];
};

const subjectLabels: Record<SubjectKey, string> = {
  korean: "국어",
  english: "영어",
  math: "수학",
  science: "과학"
};

const subjectHints: Record<SubjectKey, string> = {
  korean: "문장에서 중요한 낱말을 먼저 찾아보자.",
  english: "핵심 단어를 소리 내어 읽고 뜻을 떠올려 보자.",
  math: "숫자와 기호를 나눠 보고 어떤 계산인지 먼저 확인하자.",
  science: "어떤 현상이 보였는지 차례대로 관찰해 보자."
};

const subjectExplanations: Record<SubjectKey, Record<Difficulty, string>> = {
  korean: {
    easy: "쉬운 말로 다시 읽으면 뜻이 더 잘 보여. 문장을 짧게 끊어 생각해 보자.",
    normal: "문장의 앞뒤를 함께 보면 낱말 뜻과 중심 생각을 더 정확하게 찾을 수 있어.",
    challenge: "문장의 흐름과 숨은 뜻을 같이 보자. 스스로 왜 이런 표현을 썼는지 설명해 보면 더 좋아."
  },
  english: {
    easy: "단어 뜻을 하나씩 떠올린 다음, 짧은 문장으로 연결하면 이해하기 쉬워.",
    normal: "주어와 동사를 먼저 찾고, 나머지 단어가 어떤 뜻을 더하는지 보면 문장이 정리돼.",
    challenge: "문장 구조를 보면서 스스로 비슷한 문장을 하나 더 만들어 보면 표현력이 더 자라."
  },
  math: {
    easy: "숫자를 차례대로 보면서 어떤 수를 더하고 빼는지 천천히 확인하면 돼.",
    normal: "문제를 식으로 바꿔 보면 계산 순서가 또렷해지고 실수가 줄어들어.",
    challenge: "식만 보지 말고 왜 그 계산을 하는지 스스로 말해 보자. 다른 풀이가 있는지도 생각해 볼 수 있어."
  },
  science: {
    easy: "눈으로 본 것과 일어난 순서를 먼저 말하면 과학 설명이 쉬워져.",
    normal: "관찰한 사실과 그 이유를 나눠 생각하면 현상을 더 정확하게 이해할 수 있어.",
    challenge: "원인과 결과를 연결해 보자. 스스로 비슷한 자연 현상을 떠올리며 비교하면 더 깊게 이해할 수 있어."
  }
};

const subjectSummaries: Record<SubjectKey, string> = {
  korean: "핵심은 글의 뜻을 짧게 다시 말해 보는 거야.",
  english: "핵심은 단어와 문장 구조를 함께 보는 거야.",
  math: "핵심은 문제를 식으로 바꾸고 순서를 지키는 거야.",
  science: "핵심은 관찰한 사실과 이유를 연결하는 거야."
};

export function isSubjectKey(subject: string): subject is SubjectKey {
  return subject in subjectLabels;
}

export function buildLearningResponse(
  input: BuildLearningResponseInput
): LearningResponse {
  const subject = isSubjectKey(input.subject) ? input.subject : "math";
  const label = subjectLabels[subject];
  const feedback = input.isCorrect
    ? `좋아요. 고른 답: ${input.selectedChoice}`
    : `다시 보자. 고른 답: ${input.selectedChoice} / 정답: ${input.correctChoice}`;

  return {
    title: `${label} AI 도우미`,
    sections: [
      {
        type: "hint",
        content: `${feedback} 힌트: ${subjectHints[subject]}`
      },
      {
        type: "explanation",
        content: `${subjectExplanations[subject][input.difficulty]} 문제 연결: ${input.prompt}`
      },
      {
        type: "summary",
        content: subjectSummaries[subject]
      }
    ]
  };
}
