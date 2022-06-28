import { Dispatch, FunctionComponent, SetStateAction } from "react";

type CheckboxProps = {
  state: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
};

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  state,
  setter,
  children,
}) => {
  return (
    <label className="input-checkbox">
      <input
        type="checkbox"
        onChange={(e) => setter(e.target.checked)}
        checked={state}
      />
      {children}
    </label>
  );
};
