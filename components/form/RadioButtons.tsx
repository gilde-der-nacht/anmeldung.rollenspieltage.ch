import { FunctionComponent, useState } from "react";

type RadioOption = {
  label: string;
  value: number;
};

type RadioOptions = {
  options: RadioOption[];
  name: string;
  currentValue: number;
};

type RadioButtonsProps = {
  state: RadioOptions;
  setter: (num: number) => void;
};

export const RadioButtons: FunctionComponent<RadioButtonsProps> = ({
  state,
  setter,
}) => {
  return (
    <ul role="list" className="radio-list">
      {state.options.map((option, i) => (
        <li key={i}>
          <label className="input-radio">
            <input
              type="radio"
              value={option.value}
              name={state.name}
              checked={state.currentValue === option.value}
              onChange={(e) => setter(Number(e.target.value))}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};
