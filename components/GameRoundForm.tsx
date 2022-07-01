import { ButtonWithLink } from "./form/ButtonWithLink";
import { GameRoundOverview } from "./GameRoundOverview";
import { GameRound } from "./GameRoundStore";
import { useLocalStorage } from "./general/store";
import PlusIcon from "./icons/PlusIcon";

type FormProps = {
  isActive: boolean;
};

export const GameRoundForm = ({ isActive }: FormProps) => {
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  return (
    <div className="content">
      <div>
        <ButtonWithLink
          link="/neue-spielrunde"
          type="success"
          isDisabled={!isActive}
          icon={<PlusIcon />}
        >
          <span>neue Spielrunde</span>
        </ButtonWithLink>
      </div>
      <GameRoundOverview games={gameRounds} isActive={isActive} />
    </div>
  );
};
