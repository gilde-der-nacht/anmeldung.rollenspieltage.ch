import Link from "next/link";
import { FunctionComponent } from "react";
import ArrowIcon from "../icons/ArrowIcon";

type ButtonProps = {
  link: string;
  type: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  children: JSX.Element;
};

export const ButtonWithLink: FunctionComponent<ButtonProps> = ({
  link,
  type,
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
        <ArrowIcon />
        {children}
      </a>
    );
  }
  return (
    <Link href={link}>
      <a
        className={
          "button button-" + type + (isSmall ? " button-small" : "")
        }
      >
        <ArrowIcon />
        {children}
      </a>
    </Link>
  );
};
