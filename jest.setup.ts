import { server } from "./test-utils/server";

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
