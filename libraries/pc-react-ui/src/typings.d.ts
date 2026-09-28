declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare namespace nasl.io {
  export interface File {
    name: string;
    size: number;
    type: string;
  }
}
