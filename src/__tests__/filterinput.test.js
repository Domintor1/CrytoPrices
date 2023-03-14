// /**
//  * @jest-environment jsdom
//  */

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { test, expect } from "@jest/globals";
// import { render, waitFor } from "@testing-library/react";
// import ExtraTest from "../components/ExtraTest";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       cacheTime: Infinity,
//       retry: false,
//     },
//   },
// });

// test("filter search input", async () => {
//   const mainPage = render(
//     <QueryClientProvider client={queryClient}>
//       <ExtraTest />
//     </QueryClientProvider>
//   );

//   const inputField = await waitFor(() =>
//     mainPage.findAllByTestId("defaultFilter")
//   );
//   expect(inputField).toHaveLength(1);
// });

// test("My Test", () => {
//   expect(true).toBe(true);
// });
