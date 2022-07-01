import { ButtonWithLink } from "./form/ButtonWithLink";
import { GameRoundOverview } from "./GameRoundOverview";
import { GameRound } from "./GameRoundStore";
import { AlertBox } from "./general/AlertBox";
import PlusIcon from "./icons/PlusIcon";

type FormProps = {
  gameRounds: GameRound[];
  isActive: boolean;
};

export const GameRoundForm = ({ isActive, gameRounds }: FormProps) => {
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
      {gameRounds.filter((round) => round.active).length === 0 && isActive && (
        <AlertBox link="/neue-spielrunde">
          <p>Bitte füge mindestens eine Spielrunde hinzu.</p>
        </AlertBox>
      )}
    </div>
  );
};
