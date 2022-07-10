import Link from "next/link";
import { FunctionComponent } from "react";
import AlertIcon from "../icons/AlertIcon";

type AlertBoxProps = {
  link?: string;
  type?: string;
  children: JSX.Element;
};

export const AlertBox: FunctionComponent<AlertBoxProps> = ({
  link = "",
  type = "danger",
  children,
}) => {
  const Box = (
    <div className={"box-" + type}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {type === "danger" && <AlertIcon />}
        {children}
      </div>
    </div>
  );

  if (link.length > 0) {
    return (
      <Link href={link}>
        <a style={{ padding: 0 }}>{Box}</a>
      </Link>
    );
  }
  return Box;
};
