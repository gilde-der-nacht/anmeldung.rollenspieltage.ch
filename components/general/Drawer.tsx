import Link from "next/link";
import { FunctionComponent } from "react";
import ArrowIcon from "./ArrowIcon";

type DrawerProps = {
  title: string;
  link: string;
  type?: string;
  children: JSX.Element;
};

export const Drawer: FunctionComponent<DrawerProps> = ({
  title,
  link,
  type = "gray",
  children,
}) => {
  return (
    <>
      <div className={"box-" + type}>
        <div>
          <h3>{title}</h3>
          <span>{children}</span>
        </div>
        <Link href={link}>
          <a className={("button button-small button-" + type)}>
            <ArrowIcon />
            <span> Anpassen</span>
          </a>
        </Link>
      </div>
    </>
  );
};
