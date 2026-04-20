"use client";

import Link from "next/link";

import type { Subject } from "@/lib/data/subjects";

const subjectIcons = {
  korean: "가",
  english: "A",
  math: "+",
  science: "★"
} as const;

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link
      className="subject-card"
      href={`/learn/${subject.key}`}
      style={{
        background: `linear-gradient(180deg, ${subject.glow}, #fffdf8)`
      }}
    >
      <span>{subjectIcons[subject.key]}</span>
      <h3>{subject.name}</h3>
      <p>{subject.description}</p>
    </Link>
  );
}
