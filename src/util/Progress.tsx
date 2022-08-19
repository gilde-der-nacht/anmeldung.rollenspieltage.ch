import { Component } from "solid-js";

export const Progress: Component = () => (
  <progress style="margin-inline:auto; width: 80%; display: block;" max="100">
    loading
  </progress>
);
