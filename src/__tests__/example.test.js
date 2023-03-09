/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";

const stock = {
  type: "apples",
  count: 13,
};

test("stocks type is apples", async () => {
  expect(stock.type).toBe("apples");
});
