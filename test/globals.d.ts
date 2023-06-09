// /*
// O Import deve ser inline para que o typescript conseguir sobrescrever os tipos globais.
// */

// declare namespace NodeJS {
//   interface Global {
//     testRequest: import('supertest').SuperTest<import('supertest').Test>;
//   }
// }

declare global {
  //eslint-disable-next-line no-var
  var testRequest: import('supertest').SuperTest<import('supertest').Test>;
}

export {};
