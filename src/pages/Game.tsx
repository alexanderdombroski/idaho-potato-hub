import { useState, useCallback, useRef } from "react";
import potatoRusset from "@/assets/potato-russet.jpg";
import potatoYukon from "@/assets/potato-yukon.jpg";
import potatoRed from "@/assets/potato-red.jpg";

const potatoes = [
  { id: "russet", name: "Russet Burbank", img: potatoRusset },
  { id: "yukon", name: "Yukon Gold", img: potatoYukon },
  { id: "red", name: "Red Potato", img: potatoRed },
];

const Game = () => {
  const [correctIndex, setCorrectIndex] = useState(() => Math.floor(Math.random() * 3));
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [flash, setFlash] = useState(false);
  const [tickAnim, setTickAnim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePick = useCallback((index: number) => {
    if (selected !== null) return;
    setSelected(index);

    if (index === correctIndex) {
      setFlash(true);
      setTickAnim(true);
      setScore((s) => s + 1);
      setTimeout(() => setFlash(false), 300);
      setTimeout(() => setTickAnim(false), 300);
    }
  }, [selected, correctIndex]);

  const nextRound = () => {
    setSelected(null);
    setCorrectIndex(Math.floor(Math.random() * 3));
    setRound((r) => r + 1);
  };

  const getPotatoClass = (index: number) => {
    if (selected === null) return "potato-sharp cursor-pointer hover:scale-105 transition-transform";
    if (index === correctIndex) return "potato-sharp";
    return "potato-blur";
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen px-6 py-16 transition-colors ${flash ? "flash-sprout" : ""}`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Guess the Potato
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-12">
          One of these three is the chosen potato. Pick wisely.
        </p>

        {/* Score */}
        <div className="flex justify-center gap-12 mb-12 font-body text-sm uppercase tracking-wider">
          <div>
            Round: <span className="font-bold">{round}</span>
          </div>
          <div>
            Score:{" "}
            <span className={`font-bold inline-block ${tickAnim ? "tick-up" : ""}`}>
              {score}
            </span>
          </div>
        </div>

        {/* Potatoes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {potatoes.map((potato, index) => (
            <button
              key={`${potato.id}-${round}`}
              onClick={() => handlePick(index)}
              disabled={selected !== null}
              className={`border-2 border-primary overflow-hidden aspect-square ${getPotatoClass(index)}`}
            >
              <img
                src={potato.img}
                alt={potato.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Play again */}
        {selected !== null && (
          <div className="text-center animate-fade-in">
            <p className="font-body text-sm text-muted-foreground mb-4">
              The correct potato was: <strong>{potatoes[correctIndex].name}</strong>
            </p>
            <button
              onClick={nextRound}
              className="bg-primary text-primary-foreground px-8 py-3 font-body uppercase text-sm tracking-wider hover:bg-accent hover:text-accent-foreground transition-colors border-2 border-primary"
            >
              Next Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
