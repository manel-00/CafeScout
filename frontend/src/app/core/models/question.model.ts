import type { IconName } from '../../shared/icon/icon.component';

export interface QuestionOption {
  value: string;
  label: string;
  description: string;
  icon: IconName;
}

export interface Question {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  multi: boolean;
  optional?: boolean;
  options: QuestionOption[];
}

export type AnswerValue = string | string[];
export type AnswerMap = Record<string, AnswerValue>;
