import Link from "next/link";
import { FunctionComponent } from "react";
import ArrowIcon from "../icons/ArrowIcon";

type ButtonProps = {
  link: string;
  type: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
  isSmall?: boolean;
  children: JSX.Element;
};

export const ButtonWithLink: FunctionComponent<ButtonProps> = ({
  link,
  type,
  icon = <ArrowIcon />,
  isDisabled = false,
  isSmall = false,
  children,
}) => {
  if (isDisabled) {
    return (
      <a
        className={
          "button disabled button-" + type + (isSmall ? " button-small" : "")
        }
      >
        {icon} {children}
      </a>
    );
  }
  return (
    <Link href={link}>
      <a className={"button button-" + type + (isSmall ? " button-small" : "")}>
        {icon} {children}
      </a>
    </Link>
  );
};
