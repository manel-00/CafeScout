import { Injectable, computed, signal } from '@angular/core';

import { QUESTIONS } from '../data/questions.data';
import type { AnswerMap, AnswerValue, Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
  private readonly answersState = signal<AnswerMap>({});
  private readonly stepState = signal(0);

  readonly questions = QUESTIONS;
  readonly total = QUESTIONS.length;
  readonly answers = this.answersState.asReadonly();
  readonly step = this.stepState.asReadonly();

  readonly currentQuestion = computed(() => this.questions[this.stepState()] ?? null);
  readonly progress = computed(() => Math.round(((this.stepState() + 1) / this.total) * 100));
  readonly isFirst = computed(() => this.stepState() === 0);
  readonly isLast = computed(() => this.stepState() === this.total - 1);

  readonly answeredCount = computed(() => this.questions.filter((question) => this.hasAnswer(question)).length);

  readonly isComplete = computed(() => this.questions.every((question) => question.optional || this.hasAnswer(question)));

  readonly canContinue = computed(() => {
    const question = this.currentQuestion();
    return !!question && (!!question.optional || this.hasAnswer(question));
  });

  answerFor(questionId: string): AnswerValue | undefined {
    return this.answersState()[questionId];
  }

  isSelected(question: Question, value: string): boolean {
    const answer = this.answersState()[question.id];
    return Array.isArray(answer) ? answer.includes(value) : answer === value;
  }

  choose(question: Question, value: string): void {
    this.answersState.update((current) => {
      if (!question.multi) {
        return { ...current, [question.id]: value };
      }

      const existing = current[question.id];
      const values = Array.isArray(existing) ? existing : [];
      const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

      if (next.length === 0) {
        const updated = { ...current };
        delete updated[question.id];
        return updated;
      }

      return { ...current, [question.id]: next };
    });
  }

  hasAnswer(question: Question): boolean {
    const answer = this.answersState()[question.id];
    return Array.isArray(answer) ? answer.length > 0 : typeof answer === 'string' && answer.length > 0;
  }

  next(): void {
    if (!this.isLast()) {
      this.stepState.update((index) => Math.min(index + 1, this.total - 1));
    }
  }

  back(): void {
    this.stepState.update((index) => Math.max(index - 1, 0));
  }

  goTo(index: number): void {
    this.stepState.set(Math.max(0, Math.min(index, this.total - 1)));
  }

  reset(): void {
    this.answersState.set({});
    this.stepState.set(0);
  }
}
