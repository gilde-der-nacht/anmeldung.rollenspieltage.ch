import { ProgramEntry } from "@util/AppState";
import { Component, mergeProps, Show } from "solid-js";

type Props = ProgramEntry & {
  color?: "gray" | "danger" | "success" | "special";
  icon?:
    | "hand-wave"
    | "hat-chef"
    | "pot-food"
    | "dice-d20"
    | "dice-d6"
    | "waveform-lines"
    | "user-helmet-safety";
  title?: string;
  hint?: string;
  gameMaster?: string;
  participants?: string;
};

export const ProgramEntryBase: Component<Props> = (props) => {
  const merged = mergeProps({ color: "" }, props);

  return (
    <div
      classList={{
        "event-entry": true,
        [merged.color]: true,
        [`duration-${merged.duration}`]: true,
        [`day-${merged.day}`]: true,
      }}
    >
      <Show when={merged.icon}>
        {(icon) => (
          <div class="event-background-icon">
            <i classList={{ "fa-duotone": true, [`fa-${icon}`]: true }}></i>
          </div>
        )}
      </Show>
      <Show when={props.title?.trim()?.length ?? 0 > 0}>
        <h1 class="event-title">{merged.title}</h1>
      </Show>
      <Show when={props.hint?.trim()?.length ?? 0 > 0}>
        <p>
          <em>{merged.hint}</em>
        </p>
      </Show>
      <div class="event-details">
        <Show when={props.gameMaster?.trim()?.length ?? 0 > 0}>
          <div class="event-date">
            <span class="event-icon">
              <i class="fa-duotone fa-user-group-crown"></i>
            </span>
            <span>
              Leitung <strong>{props.gameMaster}</strong>
            </span>
          </div>
        </Show>
        <Show when={props.participants?.length ?? 0 > 0}>
          <div class="event-date">
            <span class="event-icon">
              <i class="fa-duotone fa-users"></i>
            </span>
            <span>
              Teilnehmende <strong>{props.participants}</strong>
            </span>
          </div>
        </Show>
      </div>
    </div>
  );
};
