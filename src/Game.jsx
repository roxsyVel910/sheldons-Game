import { useState, useEffect } from "react";

const options = [
  { id: 0, name: "Piedra", emoji: "🥌", beats: [2, 3] },
  { id: 1, name: "Papel", emoji: "📄", beats: [0] },
  { id: 2, name: "Tijera", emoji: "✂️", beats: [1, 3] },
  { id: 3, name: "Lagarto", emoji: "🦎", beats: [1] },
  { id: 4, name: "Spock", emoji: "🖖", beats: [3, 0] },
];

const getResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 0;
  }

  if (options[userChoice].beats.includes(computerChoice)) {
    return 1;
  }

  return 2;
};

function OptionButton({ option, handlePlay, disabled }) {
  return (
    <button
      className="px-4 py-2 m-2 text-xl font-bold text-white bg-[#F68859] rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={() => handlePlay(option.id)}
      title={option.name}
    >
      {option.emoji}
    </button>
  );
}

function useChoices() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(choice, randomChoice));
    }, 3000);

    clearTimeout();
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  return {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  };
}

export default function Game() {
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  } = useChoices();

  return (
    <div className="h-screen   bg-[#B9CBD6]">
      <section class="relative bg-[url(https://www.elcornetin.es/blog/wp-content/uploads/2016/03/piedra_papel_tijeras_lagarto_spock.jpg)] bg-center bg-no-repeat">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            piedra, papel, tijera, lagarto, spock
          </h1>
        </div>
        <div class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8"></div>
      </section>
      <div className="flex items-center justify-center  bg-[#B9CBD6]">
        <div className="rounded-lg p-4 bg-[#2382B8] gray-500 text-gray-300">
          <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
          <div className="max-w-md mx-auto">
            {options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                handlePlay={handlePlay}
                disabled={disabled}
              />
            ))}
            {userChoice !== null && (
              <p className="text-xl mt-4">{userMessage}</p>
            )}
            {computerChoice !== null && (
              <p className="text-xl mt-4">{computerMessage}</p>
            )}
            {result !== null && (
              <div className="mt-8">
                {result === 0 && <p className="text-xl mt-4">🤷🏽‍♀️ Empate</p>}
                {result === 1 && (
                  <p className="text-xl mt-4">
                    ✅ Has ganado con {options[userChoice]?.name} contra{" "}
                    {options[computerChoice]?.name}
                  </p>
                )}
                {result === 2 && (
                  <p className="text-xl mt-4">
                    ❌ Has perdido con {options[userChoice]?.name} contra{" "}
                    {options[computerChoice]?.name}
                  </p>
                )}

                <button
                  className="bg-[#F68859] hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                  onClick={reset}
                >
                  Jugar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
