import type { Category, TriviaItem } from '../entities/trivia.ts';
import { getTrivia } from '../repositories/get-trivia.ts';

export const retrieveData = async (request: {
  limit?: number;
  category: Category;
}): Promise<TriviaItem[]> => {
  try {
    const triviaItems = await getTrivia(request);

    return triviaItems;
  } catch (error: unknown) {
    console.warn(error);

    return [];
  }
};
