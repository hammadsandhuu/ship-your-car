// types/simplebar-react.d.ts
declare module "simplebar-react" {
  import * as React from "react";
  import SimpleBarCore from "simplebar";

  export interface SimpleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    scrollableNodeProps?: React.HTMLAttributes<HTMLDivElement>;
    placeholder?: React.ReactNode;
    options?: Partial<SimpleBarCore.Options>;
  }

  export default class SimpleBar extends React.Component<SimpleBarProps> {}
}
