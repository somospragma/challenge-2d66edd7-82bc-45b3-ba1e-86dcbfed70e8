# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Optimización y validación de una aplicación móvil con Ionic**.

| | |
|---|---|
| Tema | Técnicas de pruebas unitarias y fundamentos de perfilamiento de aplicaciones |
| Nivel | master-l2 |
| Chapter | Móvil |
| Especialidad | Ionic |
| Stack | TypeScript / Ionic 8 con Angular 19 |
| Patron arquitectonico | clean-architecture-mvvm |
| Tiempo estimado | 20 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, ionic.config.json y capacitor.config.ts en la raiz`
- `src/main.ts como bootstrap`
- `src/app con las rutas y paginas`
- `src/services con los clientes HTTP`
- `src/models del dominio`

Dependencias:

- @ionic/angular 8.4.0
- @angular/core 19.2.0
- @angular/common 19.2.0
- @angular/forms 19.2.0
- @angular/platform-browser 19.2.0
- @angular/platform-browser-dynamic 19.2.0
- @angular/router 19.2.0
- @angular/compiler 19.2.0
- @angular/animations 19.2.0
- @capacitor/core 6.2.0
- @capacitor/android 6.2.0
- @capacitor/ios 6.2.0
- @ionic-native/core n/a
- @ionic-native/http n/a
- rxjs 7.8.1
- tslib 2.8.1
- zone.js 0.15.0
- karma 8.0.3
- karma-chrome-launcher 3.2.2
- karma-coverage 2.2.1
- karma-jasmine 5.1.0
- karma-junit-reporter 2.0.1
- jasmine-core 5.6.0
- jasmine-spec-reporter 7.0.0
- @types/jasmine 5.1.4
- cypress 13.17.0
- @cypress/schematic n/a
- typescript 5.4.5
- eslint 9.18.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Implementación de pruebas unitarias**: Conjunto de pruebas unitarias que cubren los componentes críticos de la aplicación.
- **Fase 2 — Implementación de pruebas funcionales automatizadas**: Conjunto de pruebas funcionales automatizadas que validan los flujos de usuario clave.
- **Fase 3 — Explicación de BDD y su aplicación**: Documento que explique el concepto de BDD y su aplicación en las pruebas de la aplicación.
- **Fase 4 — Perfilamiento de aplicaciones y servicios virtualizados**: Documento que explique la importancia del perfilamiento de aplicaciones y los servicios virtualizados, y los resultados de la aplicación de estas técnicas en la aplicación móvil.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/app/presentation/store/transaction.store.ts` — El topic pide gestion de estado: este archivo es el ejercicio.
- [ ] `src/test/unit/transaction.entity.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `src/test/unit/process-transaction.usecase.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `src/test/unit/transaction.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `src/test/helpers/mocks.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `e2e/specs/transaction-flow.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `e2e/specs/auth-flow.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (1 de 39)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `src/main.ts`

### 2. Referencias colgando (19)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/app.module.ts` — `AuthService.initializeFromStorage`
      Se invoca `initializeFromStorage` sobre `AuthService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/data/datasources/transaction.remote.datasource.ts` — `Transaction.map`
      Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/data/repositories/transaction.repository.impl.ts` — `TransactionRemoteDatasource.fetchAll`
      Se invoca `fetchAll` sobre `TransactionRemoteDatasource`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `NotificationService.success`
      Se invoca `success` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `NotificationService.error`
      Se invoca `error` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `AccountRepository.hasSufficientFunds`
      Se invoca `hasSufficientFunds` sobre `AccountRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `NotificationService.warning`
      Se invoca `warning` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.findByType`
      Se invoca `findByType` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.findByDateRange`
      Se invoca `findByDateRange` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.getBalanceImpact`
      Se invoca `getBalanceImpact` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/store/transaction.store.ts` — `Transaction.filter`
      Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/store/transaction.store.ts` — `Transaction.slice`
      Se invoca `slice` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/store/transaction.store.ts` — `Transaction.reduce`
      Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/store/transaction.store.ts` — `Transaction.map`
      Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/components/balance-display/balance-display.component.ts` — `Transaction.filter`
      Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/presentation/components/balance-display/balance-display.component.ts` — `Transaction.reduce`
      Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/test/unit/transaction.service.spec.ts` — `TransactionService.getTransactions`
      Se invoca `getTransactions` sobre `TransactionService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `karma-chrome-launcher@3.2.2`
      karma-chrome-launcher declara la version 3.2.2, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- [ ] `package.json` — `karma@8.0.3`
      karma declara la version 8.0.3, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (41)

- `package.json`
- `tsconfig.json`
- `ionic.config.json`
- `src/app/domain/entities/transaction.entity.ts`
- `src/app/domain/entities/account.entity.ts`
- `src/app/domain/repositories/transaction.repository.ts`
- `capacitor.config.ts`
- `angular.json`
- `karma.conf.js`
- `cypress.config.ts`
- `README.md`
- `src/app/domain/repositories/account.repository.ts`
- `src/app/domain/usecases/process-transaction.usecase.ts`
- `src/app/domain/usecases/get-account-balance.usecase.ts`
- `src/app/data/models/transaction.model.ts`
- `src/app/data/models/account.model.ts`
- `src/app/app.component.ts`
- `src/app/app.module.ts`
- `src/app/data/datasources/transaction.remote.datasource.ts`
- `src/app/data/datasources/account.local.datasource.ts`
- `src/app/data/repositories/transaction.repository.impl.ts`
- `src/app/data/repositories/account.repository.impl.ts`
- `src/app/presentation/services/transaction.service.ts`
- `src/app/presentation/services/auth.service.ts`
- `src/app/presentation/services/notification.service.ts`
- `src/app/presentation/store/transaction.store.ts`
- `src/app/presentation/pages/home/home.page.ts`
- `src/app/presentation/pages/home/home.page.html`
- `src/app/presentation/pages/transactions/transactions.page.ts`
- `src/app/presentation/pages/transactions/transactions.page.html`
- `src/app/presentation/components/transaction-card/transaction-card.component.ts`
- `src/app/presentation/components/balance-display/balance-display.component.ts`
- `src/test/helpers/mocks.ts`
- `src/test/unit/transaction.entity.spec.ts`
- `src/test/unit/process-transaction.usecase.spec.ts`
- `src/test/unit/transaction.service.spec.ts`
- `e2e/specs/transaction-flow.spec.ts`
- `e2e/specs/auth-flow.spec.ts`
- `e2e/support/commands.ts`
- `docs/bdd-explanation.md`
- `docs/profiling-guide.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/domain/entities`
- `src/app/domain/repositories`
- `src/app/domain/usecases`
- `src/app/data/repositories`
- `src/app/data/datasources`
- `src/app/data/models`
- `src/app/presentation/pages`
- `src/app/presentation/components`
- `src/app/presentation/services`
- `src/app/presentation/store`
- `src/environments`
- `e2e/specs`
- `src/test/unit`
- `src/test/helpers`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **clean-architecture-mvvm**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Movil, Especialidad Desarrollador, Tecnología Ionic, Master
- Brecha que el reto ataca: Implementa pruebas unitarias en lenguaje nativo, usa pruebas funcionales automatizadas, explica BDD, interpreta perfilamiento de aplicaciones y comprende la importancia de servicios virtualizados
- Mision: Candidato con experiencia Master en desarrollo móvil, especializado en Ionic

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
