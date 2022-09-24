import path from 'path';
export const DEBUG = '?';
export const LOCAL_PATH = path.resolve(
  process.env.HOME || process.env.USERPROFILE,
  '.zeus/bolierplates'
);
