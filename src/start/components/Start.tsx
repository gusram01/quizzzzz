import { CATEGORIES, type Category } from '../../trivia/entities/trivia.ts';
import { useTriviaStore } from '../../trivia/store/trivia.ts';

export function StartButton() {
  const retrieveTrivia = useTriviaStore((state) => state.retrieveTrivia);
  const showLoader = useTriviaStore((state) => state.showLoader);

  const getTrivia: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    showLoader();

    const data = new FormData(event.currentTarget);

    const category = data.get('category') as Category;
    const limit = Number(data.get('limit'));

    retrieveTrivia({
      category: category,
      limit: limit,
    });
  };

  return (
    <form className="flex flex-col gap-8 items-center" onSubmit={getTrivia}>
      <div>
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a category
        </label>
        <select
          id="category"
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.values(CATEGORIES).map((cat, i) => (
            <option value={cat} key={`${i}-${cat}`}>
              {!cat ? 'Random' : cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <input
            id="items1"
            type="radio"
            name="limit"
            value={5}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="items1"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            5 Questions
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="items2"
            type="radio"
            name="limit"
            value={10}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="items2"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            10 Questions
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
          Start!!
        </span>
      </button>
    </form>
  );
}
