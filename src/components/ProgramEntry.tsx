import { Identifier } from "@util/AppState";
import { Component } from "solid-js";

export const DynamicEntry: Record<Identifier, Component> = {
  nothing: () => <h1>nothing</h1>,
  lunch: () => <h1>lunch</h1>,
  dinner: () => <h1>dinner</h1>,
  helping: () => <h1>helping</h1>,
  welcome: () => <h1>welcome</h1>,
  gameMaster: () => <h1>gameMaster</h1>,
  participate: () => <h1>participate</h1>,
  workshop: () => <h1>workshop</h1>,
};
