import { useEffect } from 'react';
import type { AnswerKey } from '../../trivia/entities/trivia';
import { useTriviaStore } from '../../trivia/store/trivia.ts';

export function LastStage() {
  const triviaItem = useTriviaStore((state) => state.questions);
  const answers = useTriviaStore((state) => state.pickedAnswers);
  const newGame = useTriviaStore((state) => state.clearTrivia);
  const hideLoader = useTriviaStore((state) => state.hideLoader);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <div className="relative overflow-auto max-h-[600px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" colSpan={2} className="px-6 py-3">
                Question
              </th>
              <th scope="col" colSpan={2} className="px-6 py-3">
                Picked
              </th>
              <th scope="col" colSpan={2} className="px-6 py-3">
                Correct
              </th>
              <th scope="col" colSpan={1} className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {triviaItem.map((item) => (
              <tr className="bg-white border-b" key={item.id}>
                <th
                  scope="row"
                  colSpan={2}
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  {item.question}
                </th>
                <td colSpan={2} className="px-6 py-4">
                  {item.answers[answers[item.id]]}
                </td>
                <td colSpan={2} className="px-6 py-4">
                  {item.answers[item.correct_answer as AnswerKey]}
                </td>
                <td colSpan={1} className="px-6 py-4">
                  {answers[item.id] === item.correct_answer ? '✅' : '❌'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex mt-8 justify-center">
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            newGame();
          }}
        >
          New Trivia
        </button>
      </div>
    </>
  );
}
