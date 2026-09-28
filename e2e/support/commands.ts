declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      createTransaction(amount: number, recipientId: string, type: string): Chainable<void>;
      getTransactionById(id: string): Chainable<void>;
      getTransactionsHistory(limit?: number): Chainable<void>;
      getAccountBalance(): Chainable<number>;
      waitForSync(): Chainable<void>;
      setNetworkStatus(online: boolean): Chainable<void>;
      mockApiResponse(endpoint: string, response: any, statusCode?: number): Chainable<void>;
      clearLocalData(): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/home');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('createTransaction', (amount: number, recipientId: string, type: string) => {
  cy.get('[data-testid="new-transaction-button"]').click();
  cy.get('[data-testid="amount-input"]').type(amount.toString());
  cy.get('[data-testid="recipient-input"]').type(recipientId);
  cy.get(`[data-testid="type-${type}"]`).click();
  cy.get('[data-testid="confirm-button"]').click();
});

Cypress.Commands.add('getTransactionById', (id: string) => {
  cy.request({
    method: 'GET',
    url: `/api/transactions/${id}`,
    failOnStatusCode: false
  }).then((response) => response.body);
});

Cypress.Commands.add('getTransactionsHistory', (limit: number = 10) => {
  cy.request({
    method: 'GET',
    url: '/api/transactions',
    qs: { limit: limit }
  }).then((response) => response.body);
});

Cypress.Commands.add('getAccountBalance', () => {
  cy.get('[data-testid="balance-display"]')
    .invoke('text')
    .then((text) => {
      const balance = parseFloat(text.replace(/[^0-9.-]/g, ''));
      return cy.wrap(balance);
    });
});

Cypress.Commands.add('waitForSync', () => {
  cy.get('[data-testid="sync-indicator"]', { timeout: 10000 }).should('not.exist');
});

Cypress.Commands.add('setNetworkStatus', (online: boolean) => {
  if (online) {
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', {
        value: true,
        writable: true
      });
    });
    cy.get('[data-testid="offline-banner"]').should('not.exist');
  } else {
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', {
        value: false,
        writable: true
      });
    });
    cy.get('[data-testid="offline-banner"]').should('be.visible');
  }
});

Cypress.Commands.add('mockApiResponse', (endpoint: string, response: any, statusCode: number = 200) => {
  cy.intercept('GET', endpoint, {
    statusCode: statusCode,
    body: response
  }).as(`mock-${endpoint.replace(/\//g, '-')}`);
});

Cypress.Commands.add('clearLocalData', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.window().then((win) => {
    win.indexedDB.databases().then((databases) => {
      databases.forEach((db) => {
        if (db.name) {
          win.indexedDB.deleteDatabase(db.name);
        }
      });
    });
  });
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

export {};