export const DIFFICULTIES = ['Medium', 'Easy', 'Hard'] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export const CATEGORIES = {
  linux: 'Linux',
  bash: 'BASH',
  php: 'PHP',
  docker: 'Docker',
  html: 'HTML',
  mysql: 'MySQL',
  wordpress: 'WordPress',
  laravel: 'Laravel',
  kubernetes: 'Kubernetes',
  javascript: 'JavaScript',
  devops: 'DevOps',
  cms: 'CMS',
  uncategorized: 'uncategorized',
  random: '',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type Category = (typeof CATEGORIES)[CategoryKey];

export interface TriviaItem {
  id: number;
  question: string;
  description: null | string;
  answers: Answers;
  multiple_correct_answers: string;
  correct_answers: CorrectAnswers;
  correct_answer: null | string;
  explanation: null | string;
  tip: null | string;
  tags: Tag[];
  category: Category;
  difficulty: Difficulty;
}

export interface Answers {
  answer_a: null | string;
  answer_b: null | string;
  answer_c: null | string;
  answer_d: null | string;
  answer_e: null | string;
  answer_f: null | string;
}

export type AnswerKey = keyof Answers;

export interface CorrectAnswers {
  answer_a_correct: string;
  answer_b_correct: string;
  answer_c_correct: string;
  answer_d_correct: string;
  answer_e_correct: string;
  answer_f_correct: string;
}

export interface Tag {
  name: string;
}
