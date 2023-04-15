/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: "end2end-tests",
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testMatch: ["<rootDir>/test/**/*.test.ts"]
}}


// import { resolve } from 'path';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const root = resolve(__dirname, '..');

// const rootConfigPath = `${root}/jest.config.js`;
// const rootConfig = await import(rootConfigPath).then((module) => module.default);

// export const config = {
//   ...rootConfig, ...{
//     rootDir: root,
//     displayName: "end2end-tests",
//     setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
//     testMatch: ["<rootDir>/test/**/*.test.ts"],
//   },
// };

// export default config;

