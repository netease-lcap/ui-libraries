declare namespace nasl.io {
  export interface File {
    name: string;
    size: number;
    type: string;
  }

  export interface FileInfo {
    status: string;
    url: string;
    name: string;
    size: number;
    type: string;
  }
}
