import Link from "next/link";
import { GameRound } from "./GameRoundStore";
import ArrowIcon from "./icons/ArrowIcon";
import CalendardIcon from "./icons/CalendarIcon";
import ClockIcon from "./icons/ClockIcon";
import PeopleIcon from "./icons/PeopleIcon";

type GameEntryProps = {
  game: GameRound;
  isActive: boolean;
};

export const GameEntry = ({ game, isActive }: GameEntryProps) => {
  return (
    <div className={"event-entry gray" + (isActive ? "" : " inactive")}>
      <h1 className="event-title">{game.name}</h1>
      <div className="event-details">
        <div className="event-date">
          <div className="event-icon">
            <ClockIcon />
          </div>
          <span>{game.duration} Minuten</span>
        </div>
        <div className="event-location">
          <div className="event-icon">
            <PeopleIcon />
          </div>
          <span>
            {game.minPlayerCount} bis {game.maxPlayerCount} Spieler:innen
          </span>
        </div>
        <div className="event-tags">
          <div className="event-icon">
            <CalendardIcon />
          </div>
          <span>
            {game.repetition === 0
              ? "einmalig"
              : game.repetition === 1
              ? "einmal pro Tag"
              : "gerne auch mehrmals"}
          </span>
        </div>
      </div>
      <ul role="list" className="event-links">
        <li>
          {isActive && (
            <Link href={"/edit-spielrunde?id=" + game.id}>
              <a className="event-link">
                <ArrowIcon />
                <span> Anpassen</span>
              </a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
