import { describe, expect, it } from "vitest";

import { buildLearningResponse, isSubjectKey } from "@/lib/ai/session";

describe("buildLearningResponse", () => {
  it("returns hint, explanation, and summary in that order", () => {
    const response = buildLearningResponse({
      subject: "math",
      difficulty: "normal",
      prompt: "12 + 8은 얼마야?"
    });

    expect(response.sections.map((section) => section.type)).toEqual([
      "hint",
      "explanation",
      "summary"
    ]);
  });

  it("changes the response depth by difficulty", () => {
    const easy = buildLearningResponse({
      subject: "science",
      difficulty: "easy",
      prompt: "무지개는 왜 생겨?"
    });
    const challenge = buildLearningResponse({
      subject: "science",
      difficulty: "challenge",
      prompt: "무지개는 왜 생겨?"
    });

    expect(easy.sections[1]?.content).not.toEqual(challenge.sections[1]?.content);
    expect(challenge.sections[1]?.content).toContain("스스로");
  });

  it("supports all seeded subjects", () => {
    const subjects = ["korean", "english", "math", "science"];

    for (const subject of subjects) {
      expect(isSubjectKey(subject)).toBe(true);
      const response = buildLearningResponse({
        subject,
        difficulty: "normal",
        prompt: "테스트 질문"
      });

      expect(response.title.length).toBeGreaterThan(0);
      expect(response.sections).toHaveLength(3);
    }
  });
});
