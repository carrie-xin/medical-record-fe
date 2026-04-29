import path from 'node:path';
import devConfig from './dev';
import prodConfig from './prod';

export default function configure(merge: <T>(base: T, ...rest: Partial<T>[]) => T) {
  const baseConfig = {
    projectName: 'medical-record-fe',
    date: '2026-04-23',
    sourceRoot: 'src',
    outputRoot: 'dist',
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
      },
    },
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
    mini: {},
    h5: {},
  };

  return process.env.NODE_ENV === 'development'
    ? merge({}, baseConfig, devConfig)
    : merge({}, baseConfig, prodConfig);
}
