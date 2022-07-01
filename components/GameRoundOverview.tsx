import { GameEntry } from "./GameEntry";
import { GameRound } from "./GameRoundStore";

type GameRoundOverviewProps = {
  games: GameRound[];
  isActive: boolean;
};

export const GameRoundOverview = ({
  games,
  isActive,
}: GameRoundOverviewProps) => {
  return (
    <ul role="list" className="event-list">
      {games
        .filter((game) => game.active)
        .map((game) => (
          <li key={game.id}>
            <GameEntry game={game} isActive={isActive} />
          </li>
        ))}
    </ul>
  );
};
