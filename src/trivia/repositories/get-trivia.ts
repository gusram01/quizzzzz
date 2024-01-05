import type { Category, TriviaItem } from '../entities/trivia';

const TRIVIA_API_BASE_URL = 'https://quizapi.io';
const TRIVIA_ENDPOINT = '/api/v1/questions';
const TRIVIA_API_KEY = import.meta.env.VITE_TRIVIA_API_KEY;

export const getTrivia = (request: {
  limit?: number;
  category: Category;
}): Promise<TriviaItem[]> => {
  const url = new URL(TRIVIA_ENDPOINT, TRIVIA_API_BASE_URL);
  const params = new URLSearchParams({
    limit: !request.limit ? '10' : request.limit.toString(),
    category: request?.category ?? '',
    apiKey: TRIVIA_API_KEY,
  });
  url.search = params.toString();

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`GetTriviaRepository::retrieveData::${response.status}`);
    }
    return response.json();
  });
};
