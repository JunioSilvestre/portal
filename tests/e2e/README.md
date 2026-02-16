# End-to-End (E2E) Tests

This directory is reserved for E2E testing tools like **Playwright** or **Cypress**.

## Why is this empty?
We are currently using `Jest` + `React Testing Library` for Unit and Integration tests (Co-located in `src/`).

## How to add E2E?
1. Run `npm init playwright@latest`
2. Configure it to use this `tests/e2e` directory.
3. Write spec files here to test user flows (Login, Navigation, etc.) on a real browser instance.
