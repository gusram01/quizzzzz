import { LastStage } from './last-stage/components/LastStage.tsx';
import { Board } from './shared/components/Board.tsx';
import { StartButton } from './start/components/Start.tsx';
import { useTriviaStore } from './trivia/store/trivia.ts';

function App() {
  const hasTrivia = useTriviaStore((state) => state.hasResults);
  const isLastStage = useTriviaStore((state) => state.isLastStage);
  const isLoading = useTriviaStore((state) => state.loading);

  return (
    <div className="w-full max-w-lg mx-auto pt-6 md:pt-16">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Pick the answer
      </h1>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}

      {isLastStage && <LastStage />}

      {!isLoading && !hasTrivia && !isLastStage && (
        <div className="text-center">
          <StartButton />
        </div>
      )}

      {!isLoading && hasTrivia && !isLastStage && (
        <main>
          <Board />
        </main>
      )}
    </div>
  );
}

export default App;
