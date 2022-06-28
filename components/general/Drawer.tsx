import Link from "next/link";
import { FunctionComponent } from "react";
import ArrowIcon from "./ArrowIcon";

type DrawerProps = {
  title: string;
  link: string;
  optional?: boolean;
  type?: string;
  error?: JSX.Element;
  disabled?: boolean;
  children: JSX.Element;
};

export const Drawer: FunctionComponent<DrawerProps> = ({
  title,
  link,
  optional = false,
  type = "gray",
  error,
  disabled = false,
  children,
}) => {
  return (
    <>
      <div
        className={
          "box-" +
          (typeof error === "undefined" ? type : "danger") +
          (disabled ? " disabled" : "")
        }
      >
        <div>
          <h3>
            {title} <small>{optional && "(Optional)"}</small>
          </h3>
          <span>{children}</span>
        </div>
        {disabled ? (
          <a
            className={
              "button button-small disabled button-" +
              (typeof error === "undefined" ? type : "danger")
            }
          >
            <ArrowIcon />
            <span> Anpassen</span>
          </a>
        ) : (
          <Link href={link}>
            <a
              className={
                "button button-small button-" +
                (typeof error === "undefined" ? type : "danger")
              }
            >
              <ArrowIcon />
              <span> Anpassen</span>
            </a>
          </Link>
        )}
        {error && <div style={{ flexBasis: "100%" }}>{error}</div>}
      </div>
    </>
  );
};
