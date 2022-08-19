import { mergeProps, ParentComponent } from "solid-js";

type Props = { isDanger?: boolean };

export const Box: ParentComponent<Props> = (props) => {
  const merged = mergeProps({ isDanger: false }, props);

  return (
    <div
      classList={{
        "box-success": !merged.isDanger,
        "box-danger": merged.isDanger,
      }}
    >
      <span>{merged.children}</span>
    </div>
  );
};
