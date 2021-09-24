// declare module "*.scss" {
//   const content: { [className: string]: string };
//   export = content;
// }

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

// declare module "*.less" {
//   const content: { [className: string]: string };
//   export = content;
// }

declare module "*component.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.inline.svg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

// declare const IS_PROD: boolean;
// declare const IS_DEV: boolean;
// declare const IS_DEV_SERVER: boolean;
