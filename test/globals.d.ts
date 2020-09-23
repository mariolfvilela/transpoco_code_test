declare namespace NodeJS {
  interface Global {
    //https://stackoverflow.com/a/51114250
    //adicionando tipos, no caso um tipo supertest
    testRequest: import("supertest").SuperTest<import("supertest").Test>;
  }
}
