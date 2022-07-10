import Link from "next/link";
import Router from "next/router";
import { FunctionComponent, useEffect } from "react";
import { saveToServer } from "../general/server";
import { useLocalStorage } from "../general/store";
import ArrowIcon from "../icons/ArrowIcon";

type ButtonProps = {
  link: string;
  type: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
  isSmall?: boolean;
  saveOnClick?: boolean;
  children: JSX.Element;
};

export const ButtonWithLink: FunctionComponent<ButtonProps> = ({
  link,
  type,
  icon = <ArrowIcon />,
  isDisabled = false,
  isSmall = false,
  saveOnClick = false,
  children,
}) => {
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret]);

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

  function onClick() {
    if (saveOnClick) {
      saveToServer(secret);
    }
    Router.push(link);
  }

  return (
    <a
      className={"button button-" + type + (isSmall ? " button-small" : "")}
      onClick={onClick}
    >
      {icon} {children}
    </a>
  );
};
