import { Dispatch, FunctionComponent, SetStateAction } from "react";

type TextInputProps = {
  state: string | number;
  setter: (val: string) => void;
  type?: "text" | "email" | "number";
  label: string;
  placeholder: string;
  clue?: string;
  hasErrors?: boolean;
  errorText?: string;
  required?: boolean;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
  state,
  setter,
  type = "text",
  label,
  placeholder,
  clue = "",
  hasErrors = false,
  errorText = "",
  required = true,
}) => {
  return (
    <label>
      {label}
      {clue.length > 0 && (
        <>
          <br />
          <small style={{ color: "var(--clr-special-10)" }}>{clue}</small>
        </>
      )}
      <input
        id={placeholder}
        type={type}
        name={placeholder}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setter(e.target.value)}
        required={required}
      />
      {hasErrors && errorText.length > 0 && (
        <small style={{ color: "var(--clr-danger-10)" }}>{errorText}</small>
      )}
    </label>
  );
};
