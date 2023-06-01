import { useState, useEffect } from 'react'


function Game() {

  const options = [
    { id: 0, name: "Rock", emoji: "🪨", beats: [2, 3] },
    { id: 1, name: "Paper", emoji: "📄", beats: [0] },
    { id: 2, name: "Scissors", emoji: "✂️", beats: [1, 3] },
    { id: 3, name: "Lizard", emoji: "🦎", beats: [1] },
    { id: 4, name: "Spock", emoji: "🖖", beats: [3, 0] },
  ];

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
 
  const handlePlay = (userChoice) => {};

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="rounded-lg p-4 bg-gray-500">
        <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
       <div className="max-w-md mx-auto">
          {options.map((option) => (
            <button
              key={option.id}
              option={option}
              handlePlay={handlePlay}
              disabled={disabled}
            >
            {option.emoji}
            </button>
          ))}
          </div>
      </div>
    </div>
    </>
  )
}

export default Game
