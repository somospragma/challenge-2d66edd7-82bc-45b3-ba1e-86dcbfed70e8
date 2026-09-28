# Behavior-Driven Development (BDD)

## Concepto Fundamental

BDD es una metodología de desarrollo de software que extiende TDD (Test-Driven Development) enfocándose en el comportamiento del sistema desde la perspectiva del usuario. Nace de la necesidad de crear un lenguaje común entre desarrolladores, QA y stakeholders no técnicos.

## Principios Fundamentales

### 1. Lenguaje Ubiquo

El lenguaje ubiquo es un vocabulario compartido que elimina la ambigüedad entre equipos técnicos y de negocio. En el contexto de la aplicación Ionic Banking, esto se traduce en términos como:

- "cuando el usuario inicia una transferencia" en lugar de "cuando se llama al endpoint POST /transfer"
- "entonces el saldo debe decrementarse" en lugar de "entonces retorna código 200"

### 2. Ciclo Given-When-Then

La estructura sintáctica de BDD sigue el patrón:

```
GIVEN (dado un contexto inicial)
WHEN (cuando ocurre una acción)
THEN (entonces ocurre un resultado observable)
```

## Aplicación en Ionic Banking

### Escenario de Ejemplo: Consulta de Saldo

```gherkin
Feature: Consulta de saldo en cuenta
  Como usuario de la aplicación bancaria
  Quiero consultar mi saldo actual
  Para conocer mis fondos disponibles

  Scenario: Consulta exitosa con cuenta activa
    Given el usuario tiene una cuenta activa con saldo de "1000.00"
    And la conexión con el backend está disponible
    When el usuario navega a la pantalla de saldo
    Then el sistema muestra el saldo de "1000.00"
    And el indicador de estado muestra "Sincronizado"

  Scenario: Consulta con cuenta inactiva
    Given el usuario tiene una cuenta con estado "BLOQUEADA"
    When el usuario intenta consultar el saldo
    Then el sistema muestra un mensaje de error
    And el código de error es "ACCOUNT_INACTIVE"
```

### Implementación en Cypress

```typescript
describe('Consulta de Saldo', () => {
  it('debe mostrar el saldo actual cuando la cuenta está activa', () => {
    // Given
    cy.intercept('GET', '/api/accounts/ACC-001/balance', {
      statusCode: 200,
      body: { balance: 1000.00, status: 'ACTIVE' }
    });
    
    // When
    cy.visit('/home');
    cy.get('[data-testid="balance-display"]').should('be.visible');
    
    // Then
    cy.get('[data-testid="balance-amount"]').should('contain', '$1,000.00');
  });
});
```

## Beneficios de BDD en Proyectos Móviles

### Trazabilidad Negocio-Técnica

Cada scenario en Gherkin se mapea directamente a pruebas automatizadas ejecutables. Esto significa que los requisitos de negocio diventan especificaciones ejecutables sin pérdida de información en la traducción.

### Documentación Viva

Los archivos de features funcionan como documentación ejecutable. Cuando las pruebas pasan, la documentación está actualizada. Cuando fallan, la documentación indica exactamente qué comportamiento está roto.

### Reducción de Defectos de Comunicación

El vocabulario compartido reduce significativamente los defectos causados por malentendidos entre equipos. Un "depósito" tiene la misma interpretación para el Product Owner, el desarrollador y el tester.

## Herramientas en el Ecosistema Ionic

### Cypress para BDD

Cypress soporta sintaxis BDD natively con las funciones describe, it, before, after, beforeEach, afterEach. Los archivos de spec siguen la estructura:

```typescript
// e2e/specs/transaction-flow.spec.ts

/// <reference types="cypress" />

context('Transacciones', () => {
  beforeEach(() => {
    cy.login('usuario@banco.com', 'password123');
  });

  describe('Crear transacción', () => {
    it('debe crear una transferencia exitosa', () => {
      // Implementación del scenario
    });
  });
});
```

## Diferencias con TDD Tradicional

| Aspecto | TDD Tradicional | BDD |
|---------|-----------------|-----|
| Enfoque | Funcionalidad técnica | Comportamiento de negocio |
| Lenguaje | Técnico (métodos, clases) | Natural (usuario, negocio) |
| Scope | Unitario | Integral (E2E) |
| Documentación | Código y comentarios | Features ejecutables |

## Mejores Prácticas

### 1. Nombres Descriptivos

Los scenarios deben responder a la pregunta: "¿Qué valor aporta esto al usuario?"

### 2. Un Solo Assert por Then

Cada assertion debe verificar un comportamiento específico para facilitar el diagnóstico de fallos.

### 3. Datos de Test Repetibles

Los datos usados en los scenarios deben ser consistentes y predecibles, usando fixtures cuando sea necesario.

### 4. Aislamiento de Tests

Cada test debe ser independiente de los demás, sin dependencias de ejecución ni estado compartido.

## Referencias

- Cucumber.io: https://cucumber.io/docs/bdd/
- Cypress Documentation: https://docs.cypress.io/guides/getting-started/writing-your-first-test
- Gherkin Reference: https://cucumber.io/docs/gherkin/reference/