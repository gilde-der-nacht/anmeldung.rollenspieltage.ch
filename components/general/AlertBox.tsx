import Link from "next/link";
import { FunctionComponent } from "react";
import AlertIcon from "./AlertIcon";

type AlertBoxProps = {
  link?: string;
  children: JSX.Element;
};

export const AlertBox: FunctionComponent<AlertBoxProps> = ({
  link = "",
  children,
}) => {
  const Box = (
    <div className="box-danger">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <AlertIcon />
        {children}
      </div>
    </div>
  );

  if (link.length > 0) {
    return (
      <Link href={link}>
        <a style={{padding: 0}}>{Box}</a>
      </Link>
    );
  }
  return Box;
};
