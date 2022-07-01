import { FunctionComponent } from "react";
import { ButtonWithLink } from "../form/ButtonWithLink";

type DrawerProps = {
  title: string;
  link: string;
  optional?: boolean;
  type?: string;
  error?: JSX.Element;
  disabled?: boolean;
  children: JSX.Element;
};

export const DrawerWithLink: FunctionComponent<DrawerProps> = ({
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
        <ButtonWithLink
          link={link}
          type={typeof error === "undefined" ? type : "danger"}
          isDisabled={disabled}
        >
          <span> Anpassen</span>
        </ButtonWithLink>
        {error && <div style={{ flexBasis: "100%" }}>{error}</div>}
      </div>
    </>
  );
};
