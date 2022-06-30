import {  FunctionComponent } from "react";
import ArrowIcon from "../icons/ArrowIcon";

type ButtonProps = {
  isSubmit?: boolean;
  event?: (e: React.SyntheticEvent) => void;
  children: JSX.Element;
};

export const ButtonWithEvent: FunctionComponent<ButtonProps> = ({
  isSubmit = false,
  children,
}) => {
  return (
    <button
      className="button button-success"
      type={isSubmit ? "submit" : "button"}
    >
      <ArrowIcon />
      {children}
    </button>
  );
};
