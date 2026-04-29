declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    TARO_APP_API_BASE_URL?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

declare const __dirname: string;

declare module 'node:path' {
  const path: {
    resolve: (...paths: string[]) => string;
  };

  export default path;
}
