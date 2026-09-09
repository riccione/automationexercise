# Playwright TypeScript Test Automation

Automated API and E2E tests built with Playwright and TypeScript for Automation Exercise.

---

## Prerequisites

- Node.js 18+
- npm
- Internet connection
- Playwright Chromium browser
- Python 3 (for pre-commit hooks) [optional]

## Installation

```bash
# clone the repository
git clone https://github.com/riccione/automationexercise.git

# Install pre-commit using uv (optional)
uv tool install pre-commit

# Clean install package specifications out of package.json
npm install

# Install native Playwright system browser binaries
npx playwright install chromium

```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run API tests only:

```bash
npx playwright test tests/api/
```

Run E2E tests only:

```bash
npx playwright test tests/e2e/
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/e2e/order.spec.ts
```

View the HTML report:

```bash
npx playwright show-report reports
```

---

## CI/CD - Github Actions

The repository includes a CI/CD pipeline that automatically runs the Playwright test suite:

* **Pull requests**: tests are triggered to validate changes before merging.
* **Pushes**: tests are triggered after changes are pushed to the repository.

This ensures that API and E2E tests are executed automatically as part of the development workflow.

---

## Test Structure

```text
tests/
├── api/
│   ├── createAccount.spec.ts
│   └── products.spec.ts
├── e2e/
│   ├── order.spec.ts
│   └── signup.spec.ts
└── helpers/
    └── user.helper.ts

fixtures/
└── fixture.ts
```

- API tests cover account creation and product API functionality.
- E2E tests cover user-facing workflows such as signup and placing an order.
- Helpers contain reusable test-data/setup functions.
- Fixtures contain shared Playwright test setup, including blocking third-party ad requests that interfere with the application under test.

## Browser Coverage

Due to the time constraints of the assignment, the final test execution is configured for Chromium only.
The test suite was initially evaluated across Chromium, Firefox, and WebKit.
Chromium was selected for the final scope to keep execution time reasonable.

## Assumptions & Notes
Test users are created dynamically to avoid conflicts with existing accounts.
Third-party ads requests are blocked because external ads can overlay application elements and interfere with UI automation.
Test artifacts are generated on failures.
