# 1. Test Strategy & Planning

## Testing Approach

I would use a risk-based approach, focusing on the functionality that is most
important to the user and the business. Since the assignment has a time limit, I
would prioritize high-value coverage rather than trying to test everything.

I would use:

* **API tests** for business rules, input validation, response contracts, and
  negative scenarios.
* **End-to-end tests** for small number of critical user journeys where multiple
  parts of the application must work together.

## Priorities

My main priorities would be:

1. Registration and authentication: users need to be able to create an account
   and log in successfully.
2. Products: core functionality that can be efficiently covered through the
   API.
3. Order placement: the most important end-to-end business flow, covering
   authentication, products, cart, checkout, and order confirmation.

I prioritize these areas because failures here would directly prevent users from
completing the main application workflows.

## API vs E2E

I prefer API tests whenever the behavior can be validated without a browser.
This makes the tests faster, more reliable, and easier to maintain.

API tests are used for:

* request and response validation
* positive and negative scenarios
* input validation
* status codes
* response structure
* business rules
* test data creation

E2E tests are kept focused on workflows where the UI and integration between
components are important, such as signup, adding products to the cart, checkout,
and placing an order.

## Risks, Assumptions, & Constraints

### Risks

The tests run against the **public environment**, which introduces dependencies
outside the test suite's control.

Third-party ads can also interfere with UI tests, so ad requests are blocked
during E2E execution.

I assume that the documented API behavior represents the expected behavior, that
test users can be created dynamically, and that tests should be independent so
they can run in parallel.

Because of the time limit, I selected representative high-value scenarios rather
than exhaustive coverage.

## Out of Scope

I intentionally did not cover:

* every API endpoint and input combination
* full cross-browser regression
* mobile/responsive testing
* visual regression
* accessibility
* performance/load testing
* penetration/security testing
* exhaustive payment, cart, and product combinations

With more time, I would expand coverage based on production usage, defect
history, supported browsers/devices, and business risk.

# 2. API Automation

I created a set of API tests using Playwright and Typescript. The tests cover
multiple API capabilities and include both positive and negative scenarios, with
assertions for status codes, response data, validation errors, and expected API
behavior.

The reasoning behind the selected flows and the detailed test coverage are
described in `Section 1` of this document and documented further in the `README.md`.

# 3. End-to-End Automation

I created a small set of E2E tests using Playwright with TypeScript.

The reasoning behind the selected flows and the detailed test coverage are
described in `Section 1` of this document and documented further in the `README.md`.

# 4. Test Execution & Wiring

The test suite is configured so that it can be run locally as well as
automatically in CI.

Installation and execution instructions, including the required dependencies and
available test commands, are documented in the `README.md`.

The repository uses **GitHub Actions** to automatically execute the test suite
on every push and pull request. The `main` branch is protected, so changes are
expected to go through a pull request and pass the automated checks before being
merged.

For this assignment, the tests run against the provided public environment. In a
real production setup, I would use a dedicated **sandbox/staging environment**
with controlled test data and predictable configuration rather than running
automated tests against a public or production environment.

This would allow the test suite to run reliably without affecting real users or
data.

For a production setup, I would also consider scheduled regression runs, test
result reporting, artifact retention, environment-specific configuration, and
separate smoke/regression suites.

# Exploratory Testing & Reporting

The goal of my exploratory testing was to look for issues that might not be
covered by the automated API and E2E tests, especially around security, input
validation, API behavior, and general usability.

Because of the time available for the assignment, I was not able to perform a
full exploratory session across the entire application. I focused on a smaller
number of areas where I expected to find higher-risk issues.

## Findings

### 1. User information can be accessed without authentication: Critical / P0

I found that the getUserDetailByEmail API allows user information to be
retrieved without authentication.

For example, providing another user's email returns information such as their
name, date of birth, address, and other profile information.

This means that an unauthenticated user could potentially retrieve another
customer's personal information.

**Severity: Critical**
**Priority: P0**

I would treat this as the highest-priority issue because it involves
unauthorized access to customer PII and should be investigated immediately.

### 2. Input validation is inconsistent: High / P1

I found cases where the API and UI forms accept invalid or unexpected input
without providing appropriate validation or error messages.

This could result in invalid data being stored or unexpected application behavior.

**Severity: High**
**Priority: P1**

I would investigate the individual cases further before assigning a final
severity, as the actual impact depends on what invalid data can be submitted and
how it is handled.

### 3. API status codes are often not used consistently: Medium / P1

Some API operations return `200 OK` even when another status code would be more
appropriate. For example, a successful resource creation could return `201`,
while an invalid request could return `400`.

**Severity: Medium**
**Priority: P1**

This makes the API less predictable for clients consuming it.

### 4. API has a redundant `responseCode` field, Low / P2

The API responses contain a `responseCode` field in addition to the actual HTTP
status code. In some cases, these do not represent the same value.

**Severity: Low**
**Priority: P2**

This is not a major functional issue, but it can be confusing for API consumers
and makes the API contract less clear.

### 5. Large number of advertisements affects the UI, Low / P2

The public environment contains a lot of third-party advertisements. Some of
them can overlap or interfere with application elements.

This can affect the user experience and can also make UI automation less stable.

**Severity: Low**
**Priority: P2**
