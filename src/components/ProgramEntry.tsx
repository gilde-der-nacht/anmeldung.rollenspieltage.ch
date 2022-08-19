import { Identifier, ProgramEntry } from "@util/AppState";
import { Component, Show } from "solid-js";

const Dinner: Component<ProgramEntry> = (props) => (
  <div class="event-entry special">
    <div class="event-background-icon">
      <i class="fa-duotone fa-stars"></i>
    </div>
    <h1 class="event-title">{props.identifier}</h1>
    <div class="event-details">
      <div class="event-date">
        <span class="event-icon">
          <i class="fa-duotone fa-calendar-range"></i>
        </span>
        <span>{props.day}</span>
      </div>
      <div class="event-location">
        <div class="event-icon">
          <i class="fa-duotone fa-calendar-range"></i>
        </div>
        <span>St. Johannes, Luzern</span>
      </div>
    </div>
    <Show when={false}>
      <div class="event-description content">
        <p>{props.identifier}</p>
      </div>
    </Show>
  </div>
);

export const DynamicEntry: Record<
  Identifier,
  (props: ProgramEntry) => Component
> = {
  nothing: (props) => () => <Dinner {...props} />,
  lunch: (props) => () => <Dinner {...props} />,
  dinner: (props) => () => <Dinner {...props} />,
  helping: (props) => () => <Dinner {...props} />,
  welcome: (props) => () => <Dinner {...props} />,
  gameMaster: (props) => () => <Dinner {...props} />,
  participate: (props) => () => <Dinner {...props} />,
  workshop: (props) => () => <Dinner {...props} />,
};
