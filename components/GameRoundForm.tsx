import { ButtonWithEvent } from "./form/ButtonWithEvent";
import { ButtonWithLink } from "./form/ButtonWithLink";
import PlusIcon from "./icons/PlusIcon";

type FormProps = {
  isActive: boolean;
};

export const GameRoundForm = ({ isActive }: FormProps) => {
  return (
    <>
      <ButtonWithLink
        link="/neue-spielrunde"
        type="success"
        isDisabled={!isActive}
        icon={<PlusIcon />}
      >
        <span>neue Spielrunde</span>
      </ButtonWithLink>
    </>
  );
};
