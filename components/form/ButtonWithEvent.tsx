import { FunctionComponent } from "react";
import ArrowIcon from "../icons/ArrowIcon";

type ButtonProps = {
  isSubmit?: boolean;
  event?: (e: React.SyntheticEvent) => void;
  children: JSX.Element;
  icon?: JSX.Element;
  type?: string;
};

export const ButtonWithEvent: FunctionComponent<ButtonProps> = ({
  isSubmit = false,
  children,
  event,
  icon = <ArrowIcon />,
  type = "success",
}) => {
  return (
    <button
      className={"button button-" + type}
      type={isSubmit ? "submit" : "button"}
      onClick={event}
    >
      {icon} {children}
    </button>
  );
};
