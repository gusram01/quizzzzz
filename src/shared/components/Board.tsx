import type { AnswerKey } from '../../trivia/entities/trivia.ts';
import { useTriviaStore } from '../../trivia/store/trivia.ts';

export function Board() {
  const totalItems = useTriviaStore((state) => state.totalItems);
  const currentIndex = useTriviaStore((state) => state.index);
  const indexMaxProgress = useTriviaStore((state) => state.indexMaxProgress);
  const isLastItem = useTriviaStore((state) => state.isLastItem);
  const currentQuestion = useTriviaStore((state) => state.currentQuestion);
  const currentQuestionId = useTriviaStore((state) => state.currentQuestionId);
  const pickedAnswers = useTriviaStore((state) => state.pickedAnswers);
  const pickAnswer = useTriviaStore((state) => state.pickAnswer);
  const changeQuestion = useTriviaStore((state) => state.changeQuestion);

  return (
    <section>
      <nav aria-label="trivia navigation" className="flex justify-center">
        <ul className="flex items-center -space-x-px h-8 text-sm mx-auto mb-12">
          <li>
            <button className="flex disabled:cursor-not-allowed items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {Array.from({ length: totalItems }, (_, i) => {
            return (
              <li key={`trivia_navigation_item_${i}`}>
                <button
                  className={`flex disabled:cursor-not-allowed items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    currentIndex === i ? 'bg-blue-300' : 'bg-white'
                  }`}
                  disabled={i > indexMaxProgress}
                  onClick={() => changeQuestion(i)}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}

          <li>
            <button
              disabled={currentIndex === indexMaxProgress || isLastItem}
              className="flex disabled:cursor-not-allowed items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
        <h5 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
          {currentQuestion?.question}
        </h5>

        <p className="mb-10 font-normal text-gray-700">
          <span className="rounded-full bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 border border-purple-400">
            {currentQuestion?.category}
          </span>

          {currentQuestion?.tags.map((tag, index) => (
            <span
              className="rounded-full bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5"
              key={`${tag}-${index}`}
            >
              {tag.name}
            </span>
          ))}
        </p>

        <p className="grid grid-cols-2 gap-6 items-stretch">
          {currentQuestion?.answers &&
            Object.entries(currentQuestion?.answers)
              .filter(([, value]) => value)
              .map(([key, value]) => (
                <button
                  key={`${key}${value}`}
                  className={`${
                    pickedAnswers[currentQuestionId as number] === key
                      ? 'text-white border-purple-700 bg-purple-800 '
                      : 'text-gray-900 border-gray-800 hover:bg-gray-900 '
                  }break-words hover:text-white border focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                  onClick={() => pickAnswer(key as AnswerKey)}
                >
                  {value}
                </button>
              ))}
        </p>
      </div>
    </section>
  );
}
