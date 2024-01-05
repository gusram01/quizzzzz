import { create } from 'zustand';
import {
  type AnswerKey,
  type Category,
  type TriviaItem,
} from '../entities/trivia.ts';
import { retrieveData } from '../usecases/retrieve-data.ts';

export interface TriviaState {
  questions: TriviaItem[];
  pickedAnswers: Record<number, AnswerKey>;
  totalItems: number;
  hasResults: boolean;
  index: number;
  indexMaxProgress: number;
  isLastItem: boolean;
  currentQuestion: TriviaItem | null;
  currentQuestionId: number | null;
  isLastStage: boolean;
  score?: number;
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  retrieveTrivia: (request: {
    limit?: number;
    category: Category;
  }) => Promise<void>;
  pickAnswer: (answer: AnswerKey) => void;
  changeQuestion: (questionIndex: number) => void;
  clearTrivia: () => void;
}

export const useTriviaStore = create<TriviaState>((set, get) => {
  return {
    questions: [],
    pickedAnswers: [],
    totalItems: 0,
    index: 0,
    indexMaxProgress: 0,
    isLastItem: false,
    isLastStage: false,
    score: 0,
    currentQuestion: null,
    currentQuestionId: null,
    hasResults: false,
    loading: false,

    showLoader: () => {
      set({ loading: true });
    },

    hideLoader: () => {
      set({ loading: false });
    },

    clearTrivia: () => {
      set({
        questions: [],
        pickedAnswers: [],
        totalItems: 0,
        index: 0,
        indexMaxProgress: 0,
        isLastItem: false,
        isLastStage: false,
        score: 0,
        currentQuestion: null,
        currentQuestionId: null,
        hasResults: false,
      });
    },

    retrieveTrivia: async (req) => {
      const results = await retrieveData(req);
      if (!results || results.length === 0) {
        set({
          loading: false,
        });
        return;
      }

      set({
        questions: results,
        totalItems: results.length,
        hasResults: results.length > 0,
        currentQuestion: results[0],
        currentQuestionId: results[0]?.id,
        isLastItem: results.length === 1,
        index: 0,
        indexMaxProgress: 0,
        score: 0,
        loading: false,
      });
    },

    pickAnswer: (answer) => {
      const { currentQuestion, index, pickedAnswers, questions } = get();

      const id = currentQuestion?.id;

      if (!id) {
        return;
      }

      pickedAnswers[id] = answer;

      set({
        pickedAnswers,
        index: index + 1,
        indexMaxProgress: Math.max(index + 1, index),
        currentQuestion: questions[index + 1],
        currentQuestionId: questions[index + 1]?.id,
        isLastItem: index + 1 >= questions.length,
        isLastStage: index + 1 >= questions.length,
        loading: index + 1 >= questions.length,
      });
    },

    changeQuestion: (questionIndex) => {
      const { questions, indexMaxProgress, index } = get();

      if (
        questionIndex === index ||
        questionIndex > indexMaxProgress ||
        questionIndex < 0
      ) {
        return;
      }

      const currentQuestion = questions[questionIndex];

      set({
        currentQuestion,
        currentQuestionId: currentQuestion.id,
        index: questionIndex,
      });
    },
  };
});
