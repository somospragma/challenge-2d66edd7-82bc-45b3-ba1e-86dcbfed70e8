# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/app/presentation/store/transaction.store.ts` — El topic pide gestion de estado: este archivo es el ejercicio.
- `src/test/unit/transaction.entity.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/test/unit/process-transaction.usecase.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/test/unit/transaction.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/test/helpers/mocks.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `e2e/specs/transaction-flow.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `e2e/specs/auth-flow.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `src/main.ts`

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/app.module.ts` — `AuthService.initializeFromStorage`: Se invoca `initializeFromStorage` sobre `AuthService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/data/datasources/transaction.remote.datasource.ts` — `Transaction.map`: Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/data/repositories/transaction.repository.impl.ts` — `TransactionRemoteDatasource.fetchAll`: Se invoca `fetchAll` sobre `TransactionRemoteDatasource`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `NotificationService.success`: Se invoca `success` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `NotificationService.error`: Se invoca `error` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `AccountRepository.hasSufficientFunds`: Se invoca `hasSufficientFunds` sobre `AccountRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `NotificationService.warning`: Se invoca `warning` sobre `NotificationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.findByType`: Se invoca `findByType` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.findByDateRange`: Se invoca `findByDateRange` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/services/transaction.service.ts` — `TransactionRepository.getBalanceImpact`: Se invoca `getBalanceImpact` sobre `TransactionRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/store/transaction.store.ts` — `Transaction.filter`: Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/store/transaction.store.ts` — `Transaction.slice`: Se invoca `slice` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/store/transaction.store.ts` — `Transaction.reduce`: Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/store/transaction.store.ts` — `Transaction.map`: Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/components/balance-display/balance-display.component.ts` — `Transaction.filter`: Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/presentation/components/balance-display/balance-display.component.ts` — `Transaction.reduce`: Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/test/unit/transaction.service.spec.ts` — `TransactionService.getTransactions`: Se invoca `getTransactions` sobre `TransactionService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `karma-chrome-launcher@3.2.2`: karma-chrome-launcher declara la version 3.2.2, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- `package.json` — `karma@8.0.3`: karma declara la version 8.0.3, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Movil, Especialidad Desarrollador, Tecnología Ionic, Master

### Brecha de conocimiento
Implementa pruebas unitarias en lenguaje nativo, usa pruebas funcionales automatizadas, explica BDD, interpreta perfilamiento de aplicaciones y comprende la importancia de servicios virtualizados

### Misión / candidato
Candidato con experiencia Master en desarrollo móvil, especializado en Ionic

### Reto
- Tema: Técnicas de pruebas unitarias y fundamentos de perfilamiento de aplicaciones
- Seniority: master-l2
- Tipo: mixed
- Título: Optimización y validación de una aplicación móvil con Ionic
- Tiempo estimado: 20 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de pruebas unitarias — objetivo: Garantizar la correcta funcionalidad de los componentes individuales de la aplicación. — entregable (NO resolver): Conjunto de pruebas unitarias que cubren los componentes críticos de la aplicación.
- Fase 2: Implementación de pruebas funcionales automatizadas — objetivo: Validar el flujo completo de la aplicación desde la perspectiva del usuario. — entregable (NO resolver): Conjunto de pruebas funcionales automatizadas que validan los flujos de usuario clave.
- Fase 3: Explicación de BDD y su aplicación — objetivo: Comprender y aplicar el concepto de BDD en el desarrollo de la aplicación. — entregable (NO resolver): Documento que explique el concepto de BDD y su aplicación en las pruebas de la aplicación.
- Fase 4: Perfilamiento de aplicaciones y servicios virtualizados — objetivo: Comprender la importancia del perfilamiento de aplicaciones y los servicios virtualizados en el rendimiento y la escalabilidad. — entregable (NO resolver): Documento que explique la importancia del perfilamiento de aplicaciones y los servicios virtualizados, y los resultados de la aplicación de estas técnicas en la aplicación móvil.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "ionic-banking-app",
  "version": "0.0.1",
  "author": "Ionic Framework",
  "homepage": "https://ionicframework.com/",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "test:watch": "ng test --watch",
    "test:coverage": "ng test --code-coverage",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "build:android": "ionic capacitor build android",
    "build:ios": "ionic capacitor build ios",
    "sync": "ionic capacitor sync",
    "serve": "ionic serve"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "19.2.0",
    "@angular/common": "19.2.0",
    "@angular/compiler": "19.2.0",
    "@angular/core": "19.2.0",
    "@angular/forms": "19.2.0",
    "@angular/platform-browser": "19.2.0",
    "@angular/platform-browser-dynamic": "19.2.0",
    "@angular/router": "19.2.0",
    "@capacitor/android": "6.2.0",
    "@capacitor/core": "6.2.0",
    "@capacitor/ios": "6.2.0",
    "@ionic/angular": "8.4.0",
    "@ionic-native/core": "^5.36.0",
    "@ionic-native/http": "^5.36.0",
    "rxjs": "~7.8.1",
    "tslib": "^2.8.1",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~19.2.0",
    "@angular-eslint/builder": "~19.2.0",
    "@angular-eslint/eslint-plugin": "~19.2.0",
    "@angular-eslint/eslint-plugin-template": "~19.2.0",
    "@angular-eslint/template-parser": "~19.2.0",
    "@angular/cli": "~19.2.0",
    "@angular/compiler-cli": "~19.2.0",
    "@cypress/schematic": "^4.0.0",
    "@types/jasmine": "~5.1.4",
    "cypress": "^13.17.0",
    "eslint": "^9.18.0",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsdoc": "^50.2.2",
    "eslint-plugin-prefer-arrow": "^1.2.3",
    "jasmine-core": "~5.6.0",
    "jasmine-spec-reporter": "~7.0.0",
    "karma": "~8.0.3",
    "karma-chrome-launcher": "~3.2.2",
    "karma-coverage": "~2.2.1",
    "karma-jasmine": "~5.1.0",
    "karma-junit-reporter": "~2.0.1",
    "typescript": "~5.4.5"
  },
  "description": "An Ionic banking application for managing financial transactions with high availability and eventual consistency.",
  "browserslist": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 2 Edge major versions",
    "last 2 Safari major versions",
    "last 2 iOS major versions",
    "last 1 Android major versions"
  ],
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2022",
    "useDefineForClassFields": false,
    "lib": [
      "es2022",
      "dom",
      "dom.iterable",
      "scanner"
    ],
    "types": [
      "jasmine",
      "node"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "allowJs": false
  },
  "exclude": [
    "node_modules",
    "tmp",
    "**/*.spec.ts",
    "e2e/**/*"
  ]
}

// === ARCHIVO: ionic.config.json ===
{
  "name": "ionic-banking-app",
  "integrations": {
    "capacitor": {}
  },
  "type": "angular",
  "root": "src",
  "sourceMapType": "eval",
  "watchPatterns": [
    "src/**/*",
    "!src/**/*.spec.ts",
    "!src/**/*.e2e.ts"
  ],
  "npmClient": "npm",
  "build": {
    "options": {
      "prod": false,
      "sourceMap": true
    }
  },
  "serve": {
    "port": 8100,
    "host": "localhost",
    "https": false,
    "open": true
  },
  "proxies": [
    {
      "path": "/api",
      "proxyUrl": "https://api.banking.example.com"
    }
  ],
  "plugins": {
    "@capacitor/core": {
      "appId": "com.example.bankingapp",
      "appName": "Banking App",
      "webDir": "www",
      "bundledWebRuntime": false
    }
  },
  "schematics": {
    "@ionic/angular-toolkit:component": {
      "style": "scss",
      "skipTests": false
    },
    "@ionic/angular-toolkit:page": {
      "style": "scss",
      "skipTests": false
    }
  },
  "hooks": {
    "build:before": "npm run build",
    "build:after": "npm run cap:copy"
  },
  "id": "com.example.bankingapp"
}

// === ARCHIVO: src/app/domain/entities/transaction.entity.ts ===
/**
 * Entidad de dominio que representa una transacción financiera.
 * Contiene la lógica de negocio relacionada con transacciones.
 */
export class Transaction {
    constructor(
        public readonly id: string,
        public readonly accountId: string,
        public readonly amount: number,
        public readonly type: TransactionType,
        public readonly description: string,
        public readonly date: Date,
        public readonly status: TransactionStatus,
        public readonly metadata?: TransactionMetadata
    ) {}

    /**
     * Calcula el impacto de esta transacción en el saldo de la cuenta.
     * @returns El monto neto que afecta el saldo de la cuenta.
     */
    public calculateBalanceImpact(): number {
        return this.type === TransactionType.DEBIT ? -this.amount : this.amount;
    }

    /**
     * Verifica si la transacción está en un estado válido para procesamiento.
     * @returns true si la transacción puede procesarse, false en caso contrario.
     */
    public isProcessable(): boolean {
        return this.status === TransactionStatus.PENDING || this.status === TransactionStatus.RETRY;
    }

    /**
     * Crea una nueva instancia de transacción con un estado actualizado.
     * @param newStatus El nuevo estado para la transacción.
     * @returns Una nueva instancia de Transaction con el estado actualizado.
     */
    public withStatus(newStatus: TransactionStatus): Transaction {
        return new Transaction(
            this.id,
            this.accountId,
            this.amount,
            this.type,
            this.description,
            this.date,
            newStatus,
            this.metadata
        );
    }
}

/** Tipos de transacciones permitidos */
export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    TRANSFER = 'TRANSFER'
}

/** Estados posibles de una transacción */
export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    RETRY = 'RETRY'
}

/** Metadatos adicionales opcionales para una transacción */
export interface TransactionMetadata {
    referenceId?: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    tags?: string[];
    additionalFees?: number;
}

// === ARCHIVO: src/app/domain/entities/account.entity.ts ===
/**
 * Entidad de dominio que representa una cuenta bancaria.
 * Contiene la lógica de negocio relacionada con cuentas.
 */
export class Account {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly accountNumber: string,
        public readonly balance: number,
        public readonly currency: string,
        public readonly status: AccountStatus,
        public readonly lastSync?: Date,
        public readonly version?: number
    ) {}

    /**
     * Verifica si la cuenta está activa y puede realizar transacciones.
     * @returns true si la cuenta está activa, false en caso contrario.
     */
    public isActive(): boolean {
        return this.status === AccountStatus.ACTIVE;
    }

    /**
     * Crea una nueva instancia de cuenta con un saldo actualizado.
     * @param amount El monto a ajustar en el saldo.
     * @returns Una nueva instancia de Account con el saldo actualizado.
     */
    public adjustBalance(amount: number): Account {
        return new Account(
            this.id,
            this.userId,
            this.accountNumber,
            this.balance + amount,
            this.currency,
            this.status,
            this.lastSync,
            (this.version || 0) + 1
        );
    }

    /**
     * Crea una nueva instancia de cuenta con un estado actualizado.
     * @param newStatus El nuevo estado para la cuenta.
     * @returns Una nueva instancia de Account con el estado actualizado.
     */
    public withStatus(newStatus: AccountStatus): Account {
        return new Account(
            this.id,
            this.userId,
            this.accountNumber,
            this.balance,
            this.currency,
            newStatus,
            this.lastSync,
            this.version
        );
    }

    /**
     * Verifica si la cuenta tiene fondos suficientes para una transacción.
     * @param amount El monto de la transacción.
     * @returns true si hay fondos suficientes, false en caso contrario.
     */
    public hasSufficientFunds(amount: number): boolean {
        return this.balance >= amount;
    }
}

/** Estados posibles de una cuenta */
export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    FROZEN = 'FROZEN',
    CLOSED = 'CLOSED',
    PENDING = 'PENDING'
}

// === ARCHIVO: src/app/domain/repositories/transaction.repository.ts ===
import { Transaction } from '../entities/transaction.entity';

/**
 * Interfaz abstracta para el repositorio de transacciones.
 * Define los contratos que deben implementarse para persistir y recuperar transacciones.
 */
export interface TransactionRepository {
    /**
     * Guarda una transacción en el repositorio.
     * @param transaction La transacción a guardar.
     * @returns Una promesa que resuelve con la transacción guardada.
     */
    save(transaction: Transaction): Promise<Transaction>;

    /**
     * Recupera una transacción por su ID.
     * @param id El ID de la transacción.
     * @returns Una promesa que resuelve con la transacción encontrada o null si no existe.
     */
    findById(id: string): Promise<Transaction | null>;

    /**
     * Recupera todas las transacciones de una cuenta.
     * @param accountId El ID de la cuenta.
     * @param limit Límite de transacciones a recuperar.
     * @param offset Offset para paginación.
     * @returns Una promesa que resuelve con una lista de transacciones.
     */
    findByAccountId(accountId: string, limit?: number, offset?: number): Promise<Transaction[]>;

    /**
     * Recupera transacciones pendientes para procesamiento.
     * @param batchSize Tamaño del lote de transacciones pendientes.
     * @returns Una promesa que resuelve con una lista de transacciones pendientes.
     */
    findPendingTransactions(batchSize: number): Promise<Transaction[]>;

    /**
     * Actualiza el estado de una transacción.
     * @param id El ID de la transacción.
     * @param newStatus El nuevo estado para la transacción.
     * @returns Una promesa que resuelve con la transacción actualizada.
     */
    updateStatus(id: string, newStatus: string): Promise<Transaction>;

    /**
     * Sincroniza transacciones locales con el backend en segundo plano.
     * @returns Una promesa que se resuelve cuando la sincronización completa.
     */
    syncWithBackend(): Promise<void>;
}

// === ARCHIVO: capacitor.config.ts ===
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.bankingapp',
  appName: 'Ionic Banking App',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: false,
    allowNavigation: []
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      backgroundColor: '#ffffff',
      color: '#000000',
      overlaysWebView: false,
      style: 'LIGHT'
    },
    LocalNotifications: {
      smallIcon: 'ic_launcher',
      iconColor: '#488aff',
      sound: 'beep.wav',
      vibrate: true
    },
    Network: {
      reachabilityUrl: 'https://www.google.com/',
      reachabilityTest: 'HEAD',
      reachabilityMethod: 'HEAD',
      reachabilityTimeout: 10,
      reachableWhen: 'online'
    },
    SecureStorage: {
      serviceName: 'banking-secure-store'
    }
  },
  cordova: {
    preferences: {
      'android-minSdkVersion': '24',
      'android-targetSdkVersion': '34',
      'android-compileSdkVersion': '34',
      'android-buildToolsVersion': '34.0.0',
      'android-gradlePluginVersion': '8.4.0',
      'ios-minVersion': '13.0',
      'ios-targetVersion': '17.0',
      'ios-deployVersion': '1.12.0',
      'UseWKWebView': 'true',
      'AllowInlineMediaPlayback': 'true',
      'BackupWebStorage': 'cloud',
      'EnableViewportScale': 'true',
      'DisallowOverscroll': 'true',
      'Orientation': 'portrait',
      'ScrollEnabled': 'true'
    }
  },
  ios: {
    minVersion: '13.0',
    scheme: 'IonicBankingApp',
    xcodeScheme: 'IonicBankingApp',
    buildOptions: {
      developmentTeam: '',
      codeSignStyle: 'Automatic',
      provisioningProfile: '',
      codeSignIdentity: 'Apple Development',
      packageType: 'development'
    }
  },
  android: {
    minSdkVersion: 24,
    targetSdkVersion: 34,
    compileSdkVersion: 34,
    buildToolsVersion: '34.0.0',
    gradlePluginVersion: '8.4.0',
    kotlinVersion: '1.9.22',
    buildOptions: {
      minifyEnabled: false,
      shrinkResources: false,
      debuggable: true,
      jniDebuggable: true
    },
    signing: {
      storeFile: 'release.keystore',
      storePassword: '',
      alias: 'ionicbankingapp',
      keyPassword: ''
    }
  }
};

export default config;

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ionic-banking-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true,
          "changeDetection": "OnPush"
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        },
        "@schematics/angular:service": {
          "standalone": true
        },
        "@schematics/angular:guard": {
          "standalone": true
        },
        "@schematics/angular:interceptor": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/ionic-banking-app",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              },
              {
                "glob": "**/*",
                "input": "src/environments",
                "output": "/environments"
              },
              {
                "glob": "manifest.webmanifest",
                "input": "src",
                "output": "/"
              },
              {
                "glob": "favicon.ico",
                "input": "src",
                "output": "/"
              }
            ],
            "styles": [
              {
                "input": "src/theme/variables.scss",
                "inject": true
              },
              {
                "input": "src/global.scss",
                "inject": true
              }
            ],
            "scripts": [],
            "serviceWorker": false,
            "optimization": {
              "scripts": true,
              "styles": {
                "minify": true,
                "inlineCritical": true
              },
              "fonts": {
                "inline": true
              }
            },
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "extractLicenses": true
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                },
                {
                  "type": "anyScript",
                  "maximumWarning": "10kb",
                  "maximumError": "50kb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "aot": true,
              "buildOptimizer": true,
              "commonChunk": true,
              "vendorChunk": true,
              "baseHref": "/",
              "deployUrl": "/"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true,
              "aot": false,
              "buildOptimizer": false,
              "vendorChunk": true,
              "commonChunk": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "ionic-banking-app:build:production"
            },
            "development": {
              "buildTarget": "ionic-banking-app:build:development"
            }
          },
          "defaultConfiguration": "development",
          "options": {
            "port": 8100,
            "host": "localhost",
            "proxyConfig": "proxy.conf.json",
            "allowedHosts": ["localhost", "127.0.0.1"],
            "hmr": true,
            "hmrWarning": false
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              },
              {
                "glob": "manifest.webmanifest",
                "input": "src",
                "output": "/"
              }
            ],
            "styles": [
              {
                "input": "src/theme/variables.scss",
                "inject": true
              },
              {
                "input": "src/global.scss",
                "inject": true
              }
            ],
            "scripts": [],
            "karmaConfig": "karma.conf.js",
            "browsers": ["ChromeHeadless"],
            "customLaunchers": {
              "ChromeHeadlessCI": {
                "base": "ChromeHeadless",
                "flags": ["--no-sandbox", "--disable-gpu", "--disable-translate", "--disable-extensions"]
              }
            },
            "codeCoverage": true,
            "codeCoverageExclude": ["src/environments/**", "src/**/*.module.ts", "src/main.ts"],
            "include": ["src/**/*.spec.ts"],
            "exclude": ["src/**/*.e2e-spec.ts"],
            "watch": true,
            "singleRun": false,
            "autoWatch": true,
            "progress": true,
            "reporters": ["kjhtml", "dots"],
            "restartOnFileChange": true
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "eslintConfig": ".eslintrc.json",
            "lintFilePatterns": ["src/**/*.ts", "src/**/*.html"],
            "noEmit": true,
            "cache": true,
            "cacheLocation": ".eslintcache",
            "fix": false,
            "quiet": false,
            "strict": true
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "ionic-banking-app:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "ionic-banking-app:serve:production"
            },
            "development": {
              "devServerTarget": "ionic-banking-app:serve:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "cypress-run": {
          "builder": "@cypress/schematic:cypress",
          "options": {
            "devServerTarget": "ionic-banking-app:serve",
            "configFile": "cypress.config.ts",
            "watch": false,
            "headless": true
          },
          "configurations": {
            "production": {
              "devServerTarget": "ionic-banking-app:serve:production"
            },
            "development": {
              "devServerTarget": "ionic-banking-app:serve:development"
            }
          }
        },
        "cypress-open": {
          "builder": "@cypress/schematic:cypress",
          "options": {
            "devServerTarget": "ionic-banking-app:serve",
            "configFile": "cypress.config.ts",
            "watch": true,
            "headless": false
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "outputPath": "src/locales",
            "outFile": "messages.xlf",
            "sourceLanguage": "en",
            "defaultLocale": "en",
            "i18n": {
              "sourceLocale": "en-US",
              "locales": ["es", "fr", "de", "pt"]
            }
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false,
    "packageManager": "npm",
    "warnings": {
      "versionMismatch": true,
      "typescriptMismatch": true
    }
  },
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "standalone": true,
      "changeDetection": "OnPush"
    },
    "@schematics/angular:directive": {
      "standalone": true
    },
    "@schematics/angular:pipe": {
      "standalone": true
    },
    "@schematics/angular:service": {
      "standalone": true
    },
    "@schematics/angular:guard": {
      "standalone": true
    },
    "@schematics/angular:interceptor": {
      "standalone": true
    }
  }
}

// === ARCHIVO: karma.conf.js ===
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: true,
        seed: Math.floor(Math.random() * 10000).toString(),
        stopSpecOnExpectationFailure: false,
        failSpecWithNoExpectations: false,
        seed: function() { return Math.floor(Math.random() * 10000).toString(); },
        stopOnSpecFailure: false
      },
      clearContext: false,
      captureConsole: true,
      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 60000,
      browserSocketTimeout: 45000,
      colors: true,
      restartOnFileChange: true
    },
    jasmineHtmlReporter: {
      suppressAll: true,
      suppressFailedStackTraces: true
    },
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/ionic-banking-app', subdir: 'html' },
        { type: 'lcov', dir: 'coverage/ionic-banking-app', subdir: 'lcov' },
        { type: 'text-summary' },
        { type: 'text' },
        { type: 'cobertura', dir: 'coverage/ionic-banking-app', subdir: 'cobertura' }
      ],
      check: {
        global: {
          statements: 70,
          branches: 60,
          functions: 70,
          lines: 70
        },
        each: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50
        }
      },
      sourceMap: true,
      useAbsolutePath: false,
      verbose: false,
      includeAllSources: true,
      exclude: [/\/node_modules\//, /\/src\/environments\//],
      dir: 'coverage',
      subdir: 'ionic-banking-app',
      file: 'coverage-final.json',
      mergeConflictAttributes: true,
      projectRoot: '.',
      reporters: ['html', 'lcov', 'text-summary']
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'junit-results.xml',
      useBrowserName: false,
      name: function(browser, result) {
        return browser.toString()
          .replace(/\s+/g, '_')
          .replace(/[\(\)\:]/g, '-')
          .replace(/\//g, '_')
          .toLowerCase();
      },
      classnamePrefix: '',
      properties: {
        timestamp: new Date().toISOString()
      },
      xmlVersion: 1
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-translate',
          '--disable-extensions',
          '--remote-debugging-port=9222',
          '--window-size=1920,1080'
        ]
      },
      ChromeCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-translate',
          '--disable-extensions',
          '--remote-debugging-port=9222',
          '--window-size=1920,1080',
          '--enable-features=NetworkService,NetworkServiceInProcess'
        ]
      },
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-translate',
          '--disable-extensions',
          '--disable-background-networking',
          '--disable-default-apps',
          '--disable-extensions',
          '--disable-sync',
          '--disable-translate',
          '--headless',
          '--remote-debugging-port=9222',
          '--window-size=1920,1080',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--allow-insecure-localhost'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true,
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    urlRoot: '/',
    preprocessors: {
      'src/**/*.ts': ['coverage', 'globals'],
      'src/**/*.js': ['coverage']
    },
    exclude: [
      'e2e/**/*.spec.ts',
      'src/test/**/*.ts',
      'src/**/*.module.ts',
      'src/main.ts',
      'src/environments/**/*.ts',
      'node_modules/**/*.js'
    ],
    files: [
      'node_modules/@angular/angular.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      { pattern: 'src/**/*.spec.ts', watched: true, included: true, nocache: true },
      { pattern: 'src/test/**/*.ts', watched: true, included: true, nocache: true }
    ],
    proxiedSpecs: {},
    urlRoot: '/__karma__/',
   browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    captureTimeout: 60000,
    browserSocketTimeout: 45000
  });
};

// === ARCHIVO: cypress.config.ts ===
import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/preset';

export default defineConfig({
  e2e: {
    specPattern: 'e2e/**/*.spec.ts',
    supportFile: 'e2e/support/e2e.ts',
    fixturesFolder: 'e2e/fixtures',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    downloadsFolder: 'cypress/downloads',
    baseUrl: 'http://localhost:8100',
    viewportWidth: 375,
    viewportHeight: 667,
    viewportHeightBreakpoint: 500,
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 50,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      apiUrl: 'http://localhost:3000/api',
      coverage: false,
      codeCoverage: {
        exclude: ['e2e/**', 'src/environments/**', 'src/main.ts']
      }
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('cypress-plugin-api')(on);
      on('before:run', (details) => {
        console.log('Iniciando ejecución de pruebas E2E...');
        console.log(`Navegador: ${details.config.browser.name}`);
        console.log(`Specs a ejecutar: ${details.specs.length}`);
      });
      on('after:spec', (spec, results) => {
        if (results.stats.failures > 0) {
          console.log(`Spec fallido: ${spec.name}`);
          console.log(`Errores: ${results.stats.failures}`);
        }
      });
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(data) {
          console.table(data);
          return null;
        }
      });
      return config;
    },
    includeShadowDom: true,
    retries: {
      runMode: 3,
      openMode: 0
    },
    scrollBehavior: 'center',
    experimentalModifyObstructiveThirdPartyCode: false,
    experimentalRunAllSpecs: false
  },
  component: {
    specPattern: 'src/**/*.cy.ts',
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '.',
          sourceRoot: 'src',
          buildOptions: {
            outputPath: 'dist',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: ['zone.js'],
            tsConfig: 'tsconfig.json',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['src/global.scss'],
            scripts: []
          }
        },
        host: 'localhost',
        port: 4200
      }
    },
    setupNodeEvents(on, config) {
      return config;
    },
    indexHtmlFile: 'cypress/component-index.html',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 800,
    viewportHeight: 600
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  videoUploadOnPasses: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 4000,
  execTimeout: 60000,
  taskTimeout: 60000,
  pageLoadTimeout: 90000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  numTestsKeptInMemory: 0,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    codeBlock: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  nodeVersion: 'system',
  specPattern: 'e2e/**/*.spec.ts',
  supportFile: 'e2e/support/e2e.ts',
  testFiles: '**/*.spec.ts',
  integrationFolder: 'e2e/specs',
  pluginsFile: 'cypress/plugins/index.js',
  videosDir: 'cypress/videos',
  screenshotsDir: 'cypress/screenshots',
  fixturesDir: 'e2e/fixtures',
  supportFolder: 'e2e/support',
  assetsFolder: 'cypress/assets',
  downloadFolder: 'cypress/downloads',
  wallaby: {
    autoStart: false,
    runMode: 'onsave',
    files: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!src/test/**'
    ],
    tests: [
      'src/**/*.spec.ts'
    ],
    workers: {
      initial: 1,
      regular: 1
    }
  }
});

// === ARCHIVO: README.md ===
# Ionic Banking App

Aplicación móvil de banca para gestión de transacciones financieras con alta disponibilidad y consistencia eventual.

## Requisitos Previos

- Node.js >= 20.0.0
- npm >= 10.0.0
- Ionic CLI instalado globalmente: `npm install -g @ionic/cli`
- Angular CLI instalado globalmente: `npm install -g @angular/cli`

## Instalación

```bash
npm install
```

Este comando instala todas las dependencias definidas en `package.json`, incluyendo:
- Angular 19.2.0
- Ionic 8.4.0
- Capacitor 6.2.0
- RxJS 7.8.1

## Estructura del Proyecto

```
src/
├── app/
│   ├── domain/              # Capa de dominio (Clean Architecture)
│   │   ├── entities/        # Entidades del dominio
│   │   │   ├── transaction.entity.ts
│   │   │   └── account.entity.ts
│   │   ├── repositories/    # Contratos de repositorio
│   │   │   ├── transaction.repository.ts
│   │   │   └── account.repository.ts
│   │   └── usecases/        # Casos de uso
│   │       ├── process-transaction.usecase.ts
│   │       └── get-account-balance.usecase.ts
│   ├── data/                # Capa de datos
│   │   ├── models/          # Modelos de persistencia
│   │   ├── datasources/     # Fuentes de datos (local/remoto)
│   │   └── repositories/    # Implementaciones de repositorio
│   └── presentation/        # Capa de presentación (MVVM)
│       ├── pages/           # Páginas de la aplicación
│       ├── components/      # Componentes reutilizables
│       ├── services/        # Servicios de presentación
│       └── store/           # Gestión de estado
├── test/                    # Pruebas unitarias
│   ├── unit/                # Tests unitarios con Jasmine
│   └── helpers/             # Mocks y utilities
└── main.ts                  # Punto de entrada
```

## Ejecución

### Desarrollo Local

```bash
ionic serve
```

Inicia el servidor de desarrollo con hot-reload. Accesible en `http://localhost:8100`.

### Construcción para Android

```bash
npm run build:android
```

Requiere tener configurado Android SDK. Genera el APK en `android/app/build/outputs/apk/debug/`.

### Construcción para iOS

```bash
npm run build:ios
```

Requiere tener Xcode instalado. Genera el proyecto en `ios/`.

## Pruebas

### Pruebas Unitarias (Jasmine/Karma)

```bash
npm test
```

Ejecuta todas las pruebas unitarias con Karma. Configuración en `karma.conf.js`.

Para ejecución con watch:

```bash
npm run test:watch
```

Para generación de coverage:

```bash
npm run test:coverage
```

Las pruebas unitarias cubren:
- Entidades de dominio (`transaction.entity`, `account.entity`)
- Casos de uso (`process-transaction.usecase`)
- Servicios de presentación (`transaction.service`)

### Pruebas E2E (Cypress)

```bash
npm run cy:open
```

Abre la interfaz gráfica de Cypress para ejecutar pruebas E2E.

Para ejecución en línea de comandos:

```bash
npm run cy:run
```

Las pruebas E2E validan:
- Flujo de transacciones (`transaction-flow.spec.ts`)
- Flujo de autenticación (`auth-flow.spec.ts`)

## Configuración de Entornos

Los archivos de configuración de entorno se encuentran en `src/environments/`:
- `environment.ts` - Configuración de desarrollo
- `environment.prod.ts` - Configuración de producción

## Consistencia Eventual

La aplicación implementa sincronización entre el estado local (SQLite) y el backend:
- Las transacciones se almacenan localmente primero
- La sincronización con el backend ocurre en segundo plano
- El método `syncWithBackend()` en `TransactionRepository` gestiona la reconciliación

## Rendimiento

La aplicación está optimizada para procesar mínimo 10,000 transacciones por hora con latencia máxima de 200ms.

## Seguridad

- Manejo de errores con HttpInterceptor global
- Interceptores para autenticación en peticiones HTTP
- Validación de entidades en la capa de dominio

// === ARCHIVO: src/app/domain/repositories/account.repository.ts ===
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entities/account.entity';
import { AccountStatus } from '../entities/account.entity';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account[]>;
  save(account: Account): Promise<Account>;
  updateStatus(id: string, status: AccountStatus): Promise<Account>;
  updateBalance(id: string, newBalance: number): Promise<Account>;
  findActiveAccounts(customerId: string): Promise<Account[]>;
  syncWithBackend(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class AccountRepositoryBase implements AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByCustomerId(customerId: string): Promise<Account[]>;
  abstract save(account: Account): Promise<Account>;
  abstract updateStatus(id: string, status: AccountStatus): Promise<Account>;
  abstract updateBalance(id: string, newBalance: number): Promise<Account>;
  abstract findActiveAccounts(customerId: string): Promise<Account[]>;
  abstract syncWithBackend(): Promise<void>;
}

// === ARCHIVO: src/app/domain/usecases/process-transaction.usecase.ts ===
import { Injectable, inject } from '@angular/core';
import { Observable, from, switchMap, catchError, of } from 'rxjs';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus, TransactionType } from '../entities/transaction.entity';
import { Account } from '../entities/account.entity';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountRepository } from '../repositories/account.repository';

export interface ProcessTransactionInput {
  accountId: string;
  amount: number;
  type: TransactionType;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface ProcessTransactionOutput {
  success: boolean;
  transaction?: Transaction;
  error?: string;
  balanceAfter?: number;
}

export interface ProcessTransactionValidationResult {
  isValid: boolean;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProcessTransactionUseCase {
  private readonly transactionRepository: TransactionRepository = inject(TransactionRepository);
  private readonly accountRepository: AccountRepository = inject(AccountRepository);

  private static readonly MAX_TRANSACTION_AMOUNT = 100000;
  private static readonly MIN_TRANSACTION_AMOUNT = 0.01;
  private static readonly MAX_DAILY_TRANSACTIONS = 50;

  async execute(input: ProcessTransactionInput): Promise<ProcessTransactionOutput> {
    const validation = this.validateInput(input);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join('; ')
      };
    }

    try {
      const account = await this.accountRepository.findById(input.accountId);
      if (!account) {
        return {
          success: false,
          error: 'Cuenta no encontrada'
        };
      }

      if (!account.isActive()) {
        return {
          success: false,
          error: 'La cuenta no está activa'
        };
      }

      const balanceImpact = this.calculateBalanceImpact(input.amount, input.type);
      if (!account.hasSufficientFunds(Math.abs(balanceImpact))) {
        return {
          success: false,
          error: 'Saldo insuficiente para realizar la transacción'
        };
      }

      const dailyTransactionCount = await this.getDailyTransactionCount(input.accountId);
      if (dailyTransactionCount >= ProcessTransactionUseCase.MAX_DAILY_TRANSACTIONS) {
        return {
          success: false,
          error: 'Límite diario de transacciones alcanzado'
        };
      }

      const transaction = this.createTransaction(input, balanceImpact);
      const savedTransaction = await this.transactionRepository.save(transaction);

      const newBalance = account.adjustBalance(balanceImpact);
      await this.accountRepository.updateBalance(input.accountId, this.extractBalance(newBalance));

      return {
        success: true,
        transaction: savedTransaction,
        balanceAfter: this.extractBalance(newBalance)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al procesar transacción'
      };
    }
  }

  validateInput(input: ProcessTransactionInput): ProcessTransactionValidationResult {
    const errors: string[] = [];

    if (!input.accountId || input.accountId.trim().length === 0) {
      errors.push('El ID de cuenta es requerido');
    }

    if (input.amount <= 0) {
      errors.push('El monto debe ser mayor a cero');
    }

    if (input.amount > ProcessTransactionUseCase.MAX_TRANSACTION_AMOUNT) {
      errors.push(`El monto excede el límite máximo de ${ProcessTransactionUseCase.MAX_TRANSACTION_AMOUNT}`);
    }

    if (input.amount < ProcessTransactionUseCase.MIN_TRANSACTION_AMOUNT) {
      errors.push(`El monto mínimo es ${ProcessTransactionUseCase.MIN_TRANSACTION_AMOUNT}`);
    }

    if (!input.type || !Object.values(TransactionType).includes(input.type)) {
      errors.push('Tipo de transacción inválido');
    }

    if (!input.description || input.description.trim().length === 0) {
      errors.push('La descripción es requerida');
    }

    if (input.description && input.description.length > 200) {
      errors.push('La descripción no puede exceder 200 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private calculateBalanceImpact(amount: number, type: TransactionType): number {
    switch (type) {
      case TransactionType.DEPOSIT:
      case TransactionType.CREDIT:
        return amount;
      case TransactionType.WITHDRAWAL:
      case TransactionType.DEBIT:
      case TransactionType.TRANSFER:
        return -amount;
      case TransactionType.PAYMENT:
        return -amount;
      case TransactionType.REFUND:
        return amount;
      default:
        return 0;
    }
  }

  private createTransaction(input: ProcessTransactionInput, balanceImpact: number): Transaction {
    const now = new Date();
    const transactionData = {
      id: this.generateTransactionId(),
      accountId: input.accountId,
      amount: input.amount,
      type: input.type,
      status: TransactionStatus.PENDING,
      description: input.description,
      createdAt: now,
      updatedAt: now,
      metadata: input.metadata || {}
    };

    return new Transaction(
      transactionData.id,
      transactionData.accountId,
      transactionData.amount,
      transactionData.type,
      transactionData.status,
      transactionData.description,
      transactionData.createdAt,
      transactionData.updatedAt,
      transactionData.metadata
    );
  }

  private generateTransactionId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `TXN-${timestamp}-${randomPart}`.toUpperCase();
  }

  private async getDailyTransactionCount(accountId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const transactions = await this.transactionRepository.findByAccountId(accountId, 100, 0);
      const todayTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.createdAt);
        txDate.setHours(0, 0, 0, 0);
        return txDate.getTime() === today.getTime();
      });
      return todayTransactions.length;
    } catch {
      return 0;
    }
  }

  private extractBalance(account: Account): number {
    const balanceProperty = (account as unknown as { balance: number }).balance;
    return balanceProperty ?? 0;
  }
}

// === ARCHIVO: src/app/domain/usecases/get-account-balance.usecase.ts ===
import { Injectable, inject } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';

export interface GetAccountBalanceInput {
  accountId: string;
  includePending?: boolean;
}

export interface GetAccountBalanceOutput {
  accountId: string;
  currentBalance: number;
  availableBalance: number;
  pendingAmount: number;
  lastUpdated: Date;
  accountStatus: string;
}

export interface BalanceCalculationResult {
  currentBalance: number;
  pendingDebits: number;
  pendingCredits: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetAccountBalanceUseCase {
  private readonly accountRepository: AccountRepository = inject(AccountRepository);
  private readonly transactionRepository: TransactionRepository = inject(TransactionRepository);

  async execute(input: GetAccountBalanceInput): Promise<GetAccountBalanceOutput> {
    const account = await this.accountRepository.findById(input.accountId);

    if (!account) {
      throw new Error('Cuenta no encontrada');
    }

    if (!account.isActive()) {
      throw new Error('La cuenta no está activa');
    }

    const balanceCalculation = await this.calculateBalance(input.accountId, input.includePending ?? true);

    return {
      accountId: input.accountId,
      currentBalance: balanceCalculation.currentBalance,
      availableBalance: this.calculateAvailableBalance(balanceCalculation),
      pendingAmount: balanceCalculation.pendingDebits - balanceCalculation.pendingCredits,
      lastUpdated: new Date(),
      accountStatus: 'ACTIVE'
    };
  }

  async calculateBalance(accountId: string, includePending: boolean): Promise<BalanceCalculationResult> {
    const transactions = await this.transactionRepository.findByAccountId(accountId, 1000, 0);

    let currentBalance = 0;
    let pendingDebits = 0;
    let pendingCredits = 0;

    for (const transaction of transactions) {
      if (!includePending && transaction.status === TransactionStatus.PENDING) {
        continue;
      }

      if (transaction.status === TransactionStatus.COMPLETED || transaction.status === TransactionStatus.PENDING) {
        const impact = transaction.calculateBalanceImpact();

        if (transaction.status === TransactionStatus.COMPLETED) {
          currentBalance += impact;
        } else if (includePending && transaction.status === TransactionStatus.PENDING) {
          if (impact < 0) {
            pendingDebits += Math.abs(impact);
          } else {
            pendingCredits += impact;
          }
        }
      }
    }

    return {
      currentBalance,
      pendingDebits,
      pendingCredits
    };
  }

  private calculateAvailableBalance(calculation: BalanceCalculationResult): number {
    const pendingDebits = calculation.pendingDebits;
    const currentBalance = calculation.currentBalance;
    const available = currentBalance - pendingDebits;
    return Math.max(0, available);
  }

  async getBalanceWithCache(accountId: string, cacheDurationMs: number = 30000): Promise<GetAccountBalanceOutput> {
    const cacheKey = `balance_cache_${accountId}`;
    const cached = this.getCachedBalance(cacheKey);

    if (cached && this.isCacheValid(cached, cacheDurationMs)) {
      return cached;
    }

    const result = await this.execute({ accountId, includePending: true });
    this.setCachedBalance(cacheKey, result);

    return result;
  }

  private getCachedBalance(key: string): GetAccountBalanceOutput | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      parsed.lastUpdated = new Date(parsed.lastUpdated);
      return parsed;
    } catch {
      return null;
    }
  }

  private setCachedBalance(key: string, value: GetAccountBalanceOutput): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to cache balance:', error);
    }
  }

  private isCacheValid(cached: GetAccountBalanceOutput, durationMs: number): boolean {
    const now = new Date().getTime();
    const cachedTime = new Date(cached.lastUpdated).getTime();
    return (now - cachedTime) < durationMs;
  }

  async getTransactionHistory(
    accountId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<Transaction[]> {
    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new Error('Cuenta no encontrada');
    }

    return this.transactionRepository.findByAccountId(accountId, limit, offset);
  }
}

// === ARCHIVO: src/app/data/models/transaction.model.ts ===
import { TransactionType, TransactionStatus, TransactionMetadata } from '../../domain/entities/transaction.entity';

export interface TransactionModel {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: TransactionMetadata;
  processedAt?: Date;
  failureReason?: string;
  retryCount: number;
  externalReference?: string;
  merchantId?: string;
  category?: string;
  location?: string;
  ipAddress?: string;
  deviceId?: string;
}

export interface TransactionModelMapper {
  toDomain(model: TransactionModel): import('../../domain/entities/transaction.entity').Transaction;
  toModel(entity: import('../../domain/entities/transaction.entity').Transaction): TransactionModel;
}

export class TransactionModelImpl implements TransactionModel {
  constructor(
    public id: string,
    public accountId: string,
    public amount: number,
    public type: TransactionType,
    public status: TransactionStatus,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public metadata: TransactionMetadata,
    public processedAt?: Date,
    public failureReason?: string,
    public retryCount: number = 0,
    public externalReference?: string,
    public merchantId?: string,
    public category?: string,
    public location?: string,
    public ipAddress?: string,
    public deviceId?: string
  ) {}

  static fromJson(json: Record<string, unknown>): TransactionModelImpl {
    return new TransactionModelImpl(
      json['id'] as string,
      json['accountId'] as string,
      json['amount'] as number,
      json['type'] as TransactionType,
      json['status'] as TransactionStatus,
      json['description'] as string,
      new Date(json['createdAt'] as string),
      new Date(json['updatedAt'] as string),
      (json['metadata'] as TransactionMetadata) || {},
      json['processedAt'] ? new Date(json['processedAt'] as string) : undefined,
      json['failureReason'] as string | undefined,
      (json['retryCount'] as number) || 0,
      json['externalReference'] as string | undefined,
      json['merchantId'] as string | undefined,
      json['category'] as string | undefined,
      json['location'] as string | undefined,
      json['ipAddress'] as string | undefined,
      json['deviceId'] as string | undefined
    );
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      accountId: this.accountId,
      amount: this.amount,
      type: this.type,
      status: this.status,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      metadata: this.metadata,
      processedAt: this.processedAt?.toISOString(),
      failureReason: this.failureReason,
      retryCount: this.retryCount,
      externalReference: this.externalReference,
      merchantId: this.merchantId,
      category: this.category,
      location: this.location,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId
    };
  }

  isPending(): boolean {
    return this.status === TransactionStatus.PENDING;
  }

  isCompleted(): boolean {
    return this.status === TransactionStatus.COMPLETED;
  }

  isFailed(): boolean {
    return this.status === TransactionStatus.FAILED || this.status === TransactionStatus.REJECTED;
  }

  canRetry(): boolean {
    return this.isFailed() && this.retryCount < 3;
  }

  canBeCancelled(): boolean {
    return this.isPending() && this.retryCount === 0;
  }

  getAgeInMinutes(): number {
    const now = new Date().getTime();
    const createdTime = this.createdAt.getTime();
    return Math.floor((now - createdTime) / (1000 * 60));
  }

  getAgeInSeconds(): number {
    const now = new Date().getTime();
    const createdTime = this.createdAt.getTime();
    return Math.floor((now - createdTime) / 1000);
  }

  isStale(thresholdMinutes: number = 30): boolean {
    return this.isPending() && this.getAgeInMinutes() > thresholdMinutes;
  }

  withUpdatedStatus(newStatus: TransactionStatus): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      newStatus,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      newStatus === TransactionStatus.COMPLETED ? new Date() : this.processedAt,
      this.failureReason,
      this.retryCount,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }

  withIncrementedRetry(): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      this.status,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      this.processedAt,
      this.failureReason,
      this.retryCount + 1,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }

  withFailureReason(reason: string): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      TransactionStatus.FAILED,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      this.processedAt,
      reason,
      this.retryCount,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }
}

export const TransactionModelToEntityMapper: TransactionModelMapper = {
  toDomain(model: TransactionModel) {
    return new Transaction(
      model.id,
      model.accountId,
      model.amount,
      model.type,
      model.status,
      model.description,
      model.createdAt,
      model.updatedAt,
      model.metadata
    );
  },

  toModel(entity: import('../../domain/entities/transaction.entity').Transaction) {
    return new TransactionModelImpl(
      entity.id,
      entity.accountId,
      entity.amount,
      entity.type,
      entity.status,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      entity.metadata
    );
  }
};

// === ARCHIVO: src/app/data/models/account.model.ts ===
export interface AccountModel {
  id: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  holderName: string;
  holderId: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date | null;
  version: number;
  pendingOperations: number;
  overdraftLimit: number;
  branchCode: string;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
  CREDIT = 'CREDIT'
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  CLOSED = 'CLOSED'
}

export interface AccountBalance {
  available: number;
  pending: number;
  total: number;
  currency: string;
  asOf: Date;
}

export interface AccountCreateRequest {
  accountType: AccountType;
  holderName: string;
  holderId: string;
  initialDeposit: number;
  currency: string;
  branchCode: string;
}

export interface AccountUpdateRequest {
  status?: AccountStatus;
  overdraftLimit?: number;
  holderName?: string;
}

export class AccountModelMapper {
  static toDomain(model: AccountModel): import('../../domain/entities/account.entity').Account {
    const AccountEntity = require('../../domain/entities/account.entity').Account;
    const AccountStatusEntity = require('../../domain/entities/account.entity').AccountStatus;
    return new AccountEntity(
      model.id,
      model.accountNumber,
      model.accountType as any,
      model.balance,
      model.currency,
      AccountStatusEntity[model.status] || AccountStatusEntity.ACTIVE,
      model.holderName,
      model.holderId,
      model.createdAt,
      model.updatedAt,
      model.version
    );
  }

  static toPersistence(entity: import('../../domain/entities/account.entity').Account): AccountModel {
    return {
      id: entity.id,
      accountNumber: entity.accountNumber,
      accountType: entity.accountType as unknown as AccountType,
      balance: entity.balance,
      currency: entity.currency,
      status: entity.status as unknown as AccountStatus,
      holderName: entity.holderName,
      holderId: entity.holderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      lastSyncedAt: new Date(),
      version: entity.version,
      pendingOperations: 0,
      overdraftLimit: 0,
      branchCode: 'DEFAULT'
    };
  }

  static toBalance(entity: import('../../domain/entities/account.entity').Account): AccountBalance {
    return {
      available: entity.balance,
      pending: 0,
      total: entity.balance,
      currency: entity.currency,
      asOf: new Date()
    };
  }
}

// === ARCHIVO: src/app/app.component.ts ===
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { IonicModule, Platform, MenuController } from '@ionic/angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthService } from './presentation/services/auth.service';
import { NotificationService } from './presentation/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <ion-app [class.dark-theme]="isDarkMode">
      <ion-menu *ngIf="isAuthenticated" contentId="main-content" type="overlay">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Menú Principal</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button (click)="navigateTo('/home')">
              <ion-icon slot="start" name="home"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/transactions')">
              <ion-icon slot="start" name="swap-horizontal"></ion-icon>
              <ion-label>Transacciones</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/accounts')">
              <ion-icon slot="start" name="wallet"></ion-icon>
              <ion-label>Cuentas</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/settings')">
              <ion-icon slot="start" name="settings"></ion-icon>
              <ion-label>Configuración</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
        <ion-footer>
          <ion-button expand="full" (click)="logout()" color="danger">
            <ion-icon slot="start" name="log-out"></ion-icon>
            Cerrar Sesión
          </ion-button>
        </ion-footer>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>

      <ion-alert
        [isOpen]="showAlert"
        [header]="alertHeader"
        [message]="alertMessage"
        [buttons]="alertButtons"
        (didDismiss)="onAlertDismiss()">
      </ion-alert>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="toastDuration"
        [color]="toastColor"
        (didDismiss)="onToastDismiss()">
      </ion-toast>
    </ion-app>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    ion-app {
      height: 100%;
    }
    .dark-theme {
      --background: #1a1a1a;
      --text-color: #ffffff;
    }
    ion-menu {
      --background: var(--ion-background-color, #ffffff);
    }
    ion-item {
      --padding-start: 16px;
      --inner-padding-end: 16px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly router = inject(Router);
  private readonly menuController = inject(MenuController);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly destroy$ = new Subject<void>();

  isAuthenticated = false;
  isDarkMode = false;
  showAlert = false;
  alertHeader = '';
  alertMessage = '';
  alertButtons: string[] = [];
  showToast = false;
  toastMessage = '';
  toastDuration = 3000;
  toastColor: 'success' | 'warning' | 'danger' | 'primary' = 'primary';

  ngOnInit(): void {
    this.initializeApp();
    this.setupNavigationTracking();
    this.setupAuthObserver();
    this.setupNotifications();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.checkAuthStatus();
      this.registerBackButtonHandler();
      this.applyThemePreferences();
    });
  }

  private checkAuthStatus(): void {
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(auth => {
        this.isAuthenticated = auth;
        if (!auth) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      });
  }

  private setupNavigationTracking(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.onNavigationChange(event.urlAfterRedirects);
    });
  }

  private setupAuthObserver(): void {
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isAuthenticated = state.isAuthenticated;
        if (!state.isAuthenticated && this.isAuthenticated) {
          this.handleSessionExpired();
        }
      });
  }

  private setupNotifications(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notification => {
        if (notification) {
          this.displayNotification(notification);
        }
      });
  }

  private registerBackButtonHandler(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  private handleBackButton(): void {
    const url = this.router.url;
    if (url === '/home' || url === '/login') {
      this.showExitConfirmation();
    } else {
      this.router.navigate(['/home']);
    }
  }

  private showExitConfirmation(): void {
    this.alertHeader = 'Salir';
    this.alertMessage = '¿Desea salir de la aplicación?';
    this.alertButtons = ['Cancelar', 'Salir'];
    this.showAlert = true;
  }

  private applyThemePreferences(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    prefersDark.addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
    });
  }

  private onNavigationChange(url: string): void {
    if (this.isAuthenticated && url !== '/login') {
      this.menuController.enable(true);
    } else {
      this.menuController.enable(false);
    }
  }

  private handleSessionExpired(): void {
    this.alertHeader = 'Sesión Expirada';
    this.alertMessage = 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.';
    this.alertButtons = ['Aceptar'];
    this.showAlert = true;
  }

  private displayNotification(notification: { title: string; message: string; type: string }): void {
    this.toastMessage = notification.message;
    this.toastColor = notification.type as any;
    this.toastDuration = 3000;
    this.showToast = true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.menuController.close();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.menuController.close();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  onAlertDismiss(): void {
    this.showAlert = false;
  }

  onToastDismiss(): void {
    this.showToast = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// === ARCHIVO: src/app/app.module.ts ===
import { NgModule, APP_INITIALIZER, ErrorHandler, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule, IonicErrorHandler, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './presentation/pages/home/home.page';
import { TransactionsPage } from './presentation/pages/transactions/transactions.page';
import { TransactionCardComponent } from './presentation/components/transaction-card/transaction-card.component';
import { BalanceDisplayComponent } from './presentation/components/balance-display/balance-display.component';

import { TransactionService } from './presentation/services/transaction.service';
import { AuthService } from './presentation/services/auth.service';
import { NotificationService } from './presentation/services/notification.service';
import { TransactionStore } from './presentation/store/transaction.store';

import { TransactionRepository } from './domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from './data/repositories/transaction.repository.impl';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountRepositoryImpl } from './data/repositories/account.repository.impl';

import { ProcessTransactionUseCase } from './domain/usecases/process-transaction.usecase';
import { GetAccountBalanceUseCase } from './domain/usecases/get-account-balance.usecase';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'transactions', component: TransactionsPage },
  { path: 'login', loadChildren: () => import('./presentation/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'accounts', loadChildren: () => import('./presentation/pages/accounts/accounts.module').then(m => m.AccountsModule) },
  { path: 'settings', loadChildren: () => import('./presentation/pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: '**', redirectTo: 'home' }
];

export function initializeApp(httpClient: HttpClient, authService: AuthService): () => Promise<any> {
  return () => authService.initializeFromStorage().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    TransactionsPage,
    TransactionCardComponent,
    BalanceDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      mode: 'ios',
      backButtonText: 'Atrás',
      spinnerName: 'lines',
      swipeBackEnabled: true
    }),
    RouterModule.forRoot(routes, { preloadingStrategy: IonicRouteStrategy })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: require('./presentation/interceptors/auth.interceptor').AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: require('./presentation/interceptors/error.interceptor').ErrorInterceptor,
      multi: true
    },
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl
    },
    TransactionService,
    AuthService,
    NotificationService,
    TransactionStore,
    ProcessTransactionUseCase,
    GetAccountBalanceUseCase,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [HttpClient, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.configureGlobalErrorHandling();
  }

  private configureGlobalErrorHandling(): void {
    if (!isDevMode()) {
      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
      });

      window.addEventListener('error', (event) => {
        console.error('Global Error:', event.error);
      });
    }
  }
}

// === ARCHIVO: src/app/data/datasources/transaction.remote.datasource.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, asyncScheduler, observeOn } from 'rxjs';
import { catchError, map, retry, shareReplay, timeout } from 'rxjs/operators';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus, TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';

export interface TransactionFilter {
  accountId?: string;
  status?: TransactionStatus;
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface TransactionBatchRequest {
  transactionIds: string[];
  action: 'approve' | 'reject' | 'process';
  reason?: string;
}

export interface TransactionBatchResult {
  successful: string[];
  failed: { id: string; error: string }[];
  processedAt: Date;
}

export interface TransactionSyncResult {
  uploaded: number;
  downloaded: number;
  conflicts: { localId: string; serverVersion: Transaction }[];
  lastSyncTimestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionRemoteDatasource {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.banking-app.example.com/v1';
  private readonly cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheTimeout = 5 * 60 * 1000;

  private readonly connectionStatus$ = new BehaviorSubject<boolean>(true);
  readonly online$ = this.connectionStatus$.asObservable().pipe(
    observeOn(asyncScheduler)
  );

  constructor() {
    this.initializeNetworkMonitoring();
  }

  private initializeNetworkMonitoring(): void {
    if (typeof window !== 'undefined' && 'onLine' in navigator) {
      this.connectionStatus$.next(navigator.onLine);
      window.addEventListener('online', () => this.connectionStatus$.next(true));
      window.addEventListener('offline', () => this.connectionStatus$.next(false));
    }
  }

  getTransactionById(id: string): Observable<Transaction> {
    const cacheKey = `transaction_${id}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return new Observable(subscriber => {
        subscriber.next(cached);
        subscriber.complete();
      });
    }

    return this.http.get<TransactionModel>(`${this.baseUrl}/transactions/${id}`)
      .pipe(
        map(response => this.mapToEntity(response)),
        retry({ count: 3, delay: 1000 }),
        timeout(10000),
        catchError(error => this.handleError(error, `getTransactionById:${id}`)),
        tap(transaction => this.setCache(cacheKey, transaction)),
        shareReplay(1)
      );
  }

  getTransactionsByAccountId(
    accountId: string,
    page: number = 1,
    pageSize: number = 20,
    filter?: TransactionFilter
  ): Observable<PaginatedResult<Transaction>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.type) params = params.set('type', filter.type);
      if (filter.startDate) params = params.set('startDate', filter.startDate.toISOString());
      if (filter.endDate) params = params.set('endDate', filter.endDate.toISOString());
      if (filter.minAmount) params = params.set('minAmount', filter.minAmount.toString());
      if (filter.maxAmount) params = params.set('maxAmount', filter.maxAmount.toString());
    }

    return this.http.get<PaginatedResult<TransactionModel>>(
      `${this.baseUrl}/accounts/${accountId}/transactions`,
      { params }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data.map(t => this.mapToEntity(t))
      })),
      timeout(15000),
      catchError(error => this.handleError(error, `getTransactionsByAccountId:${accountId}`))
    );
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    const payload = this.mapToModel(transaction);
    return this.http.post<TransactionModel>(
      `${this.baseUrl}/transactions`,
      payload
    ).pipe(
      map(response => this.mapToEntity(response)),
      timeout(10000),
      catchError(error => this.handleError(error, 'createTransaction'))
    );
  }

  updateTransactionStatus(
    id: string,
    newStatus: TransactionStatus,
    reason?: string
  ): Observable<Transaction> {
    const body = {
      status: newStatus,
      reason: reason || '',
      updatedAt: new Date().toISOString()
    };

    return this.http.patch<TransactionModel>(
      `${this.baseUrl}/transactions/${id}/status`,
      body
    ).pipe(
      map(response => this.mapToEntity(response)),
      timeout(8000),
      catchError(error => this.handleError(error, `updateTransactionStatus:${id}`))
    );
  }

  getPendingTransactions(batchSize: number = 50): Observable<Transaction[]> {
    const params = new HttpParams()
      .set('status', TransactionStatus.PENDING)
      .set('batchSize', batchSize.toString())
      .set('sortBy', 'createdAt')
      .set('sortOrder', 'asc');

    return this.http.get<TransactionModel[]>(
      `${this.baseUrl}/transactions/pending`,
      { params }
    ).pipe(
      map(transactions => transactions.map(t => this.mapToEntity(t))),
      timeout(20000),
      catchError(error => this.handleError(error, 'getPendingTransactions'))
    );
  }

  processBatchTransactions(request: TransactionBatchRequest): Observable<TransactionBatchResult> {
    return this.http.post<TransactionBatchResult>(
      `${this.baseUrl}/transactions/batch`,
      request
    ).pipe(
      timeout(60000),
      catchError(error => this.handleError(error, 'processBatchTransactions'))
    );
  }

  syncTransactions(
    lastSyncTimestamp: Date,
    localTransactions: Transaction[]
  ): Observable<TransactionSyncResult> {
    const body = {
      lastSyncTimestamp: lastSyncTimestamp.toISOString(),
      localTransactions: localTransactions.map(t => this.mapToModel(t))
    };

    return this.http.post<TransactionSyncResult>(
      `${this.baseUrl}/transactions/sync`,
      body
    ).pipe(
      timeout(30000),
      catchError(error => this.handleError(error, 'syncTransactions'))
    );
  }

  searchTransactions(
    query: string,
    filters?: TransactionFilter,
    page: number = 1,
    pageSize: number = 20
  ): Observable<PaginatedResult<Transaction>> {
    let params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.accountId) params = params.set('accountId', filters.accountId);
      if (filters.status) params = params.set('status', filters.status);
    }

    return this.http.get<PaginatedResult<TransactionModel>>(
      `${this.baseUrl}/transactions/search`,
      { params }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data.map(t => this.mapToEntity(t))
      })),
      timeout(15000),
      catchError(error => this.handleError(error, 'searchTransactions'))
    );
  }

  exportTransactions(
    accountId: string,
    format: 'csv' | 'json' | 'pdf',
    dateRange?: { start: Date; end: Date }
  ): Observable<Blob> {
    let params = new HttpParams()
      .set('format', format);

    if (dateRange) {
      params = params
        .set('startDate', dateRange.start.toISOString())
        .set('endDate', dateRange.end.toISOString());
    }

    return this.http.get(
      `${this.baseUrl}/accounts/${accountId}/transactions/export`,
      {
        params,
        responseType: 'blob'
      }
    ).pipe(
      timeout(60000),
      catchError(error => this.handleError(error, 'exportTransactions'))
    );
  }

  private mapToEntity(model: TransactionModel): Transaction {
    const TransactionEntity = require('../../domain/entities/transaction.entity').Transaction;
    const TransactionStatusEntity = require('../../domain/entities/transaction.entity').TransactionStatus;
    const TransactionTypeEntity = require('../../domain/entities/transaction.entity').TransactionType;

    return new TransactionEntity(
      model.id,
      model.accountId,
      model.amount,
      model.currency,
      TransactionTypeEntity[model.type] || TransactionTypeEntity.TRANSFER,
      TransactionStatusEntity[model.status] || TransactionStatusEntity.PENDING,
      model.description,
      model.counterpartyId,
      model.counterpartyName,
      model.metadata,
      model.createdAt,
      model.updatedAt,
      model.version
    );
  }

  private mapToModel(entity: Partial<Transaction>): any {
    return {
      id: entity.id,
      accountId: entity.accountId,
      amount: entity.amount,
      currency: entity.currency,
      type: entity.type ? entity.type.toString() : 'TRANSFER',
      status: entity.status ? entity.status.toString() : 'PENDING',
      description: entity.description,
      counterpartyId: entity.counterpartyId,
      counterpartyName: entity.counterpartyName,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }

  private handleError(error: HttpErrorResponse, operation: string): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'No hay conexión con el servidor. Verifique su conexión a internet.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida';
          break;
        case 401:
          errorMessage = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
          break;
        case 403:
          errorMessage = 'No tiene permiso para realizar esta operación';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 409:
          errorMessage = 'Conflicto de datos. La información fue modificada por otro proceso.';
          break;
        case 422:
          errorMessage = error.error?.message || 'Datos inválidos';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Espere un momento e intente nuevamente.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        case 503:
          errorMessage = 'Servicio temporalmente no disponible';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    console.error(`[TransactionRemoteDatasource] ${operation} falló:`, error);
    return throwError(() => new Error(errorMessage));
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

import { tap } from 'rxjs/operators';

// === ARCHIVO: src/app/data/datasources/account.local.datasource.ts ===
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Account } from '../../domain/entities/account.entity';
import { AccountStatus } from '../../domain/entities/account.entity';

@Injectable({
  providedIn: 'root'
})
export class AccountLocalDatasource {
  private accountsStorage: Map<string, Account> = new Map();
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  private readonly STORAGE_KEY = 'ionic_banking_accounts';
  private initialized = false;

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    if (this.initialized) return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const accountsData = JSON.parse(stored);
        accountsData.forEach((acc: any) => {
          const account = this.reconstructAccount(acc);
          this.accountsStorage.set(account.id, account);
        });
        this.accountsSubject.next(Array.from(this.accountsStorage.values()));
      }
      this.initialized = true;
    } catch (error) {
      console.error('[AccountLocalDatasource] Error initializing from storage:', error);
      this.initialized = true;
    }
  }

  private reconstructAccount(data: any): Account {
    const account = new Account(
      data.id,
      data.accountNumber,
      data.balance,
      data.accountType,
      data.status,
      data.customerId,
      data.currency,
      data.createdAt,
      data.updatedAt
    );
    return account;
  }

  private persistToStorage(): void {
    try {
      const accountsArray = Array.from(this.accountsStorage.values()).map(acc => ({
        id: acc.id,
        accountNumber: acc.accountNumber,
        balance: acc.balance,
        accountType: acc.accountType,
        status: acc.status,
        customerId: acc.customerId,
        currency: acc.currency,
        createdAt: acc.createdAt,
        updatedAt: acc.updatedAt
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(accountsArray));
      this.accountsSubject.next(Array.from(this.accountsStorage.values()));
    } catch (error) {
      console.error('[AccountLocalDatasource] Error persisting to storage:', error);
    }
  }

  findById(id: string): Observable<Account | null> {
    return of(this.accountsStorage.get(id) || null).pipe(
      delay(10),
      map(account => {
        if (!account) {
          console.warn(`[AccountLocalDatasource] Account not found: ${id}`);
        }
        return account;
      })
    );
  }

  findByCustomerId(customerId: string): Observable<Account[]> {
    const accounts = Array.from(this.accountsStorage.values())
      .filter(acc => acc.customerId === customerId);
    return of(accounts).pipe(delay(10));
  }

  findAll(): Observable<Account[]> {
    return this.accountsSubject.asObservable().pipe(delay(10));
  }

  save(account: Account): Observable<Account> {
    if (!account || !account.id) {
      return throwError(() => new Error('[AccountLocalDatasource] Account or account ID is required'));
    }

    const existing = this.accountsStorage.get(account.id);
    if (existing) {
      console.log(`[AccountLocalDatasource] Updating existing account: ${account.id}`);
    } else {
      console.log(`[AccountLocalDatasource] Creating new account: ${account.id}`);
    }

    this.accountsStorage.set(account.id, account);
    this.persistToStorage();
    return of(account).pipe(delay(10));
  }

  updateBalance(accountId: string, newBalance: number): Observable<Account> {
    const account = this.accountsStorage.get(accountId);
    
    if (!account) {
      return throwError(() => new Error(`[AccountLocalDatasource] Account not found: ${accountId}`));
    }

    if (newBalance < 0 && !account.hasSufficientFunds(Math.abs(newBalance))) {
      return throwError(() => new Error('[AccountLocalDatasource] Insufficient funds'));
    }

    const updatedAccount = account.adjustBalance(newBalance);
    this.accountsStorage.set(accountId, updatedAccount);
    this.persistToStorage();
    
    console.log(`[AccountLocalDatasource] Balance updated for account ${accountId}: ${newBalance}`);
    return of(updatedAccount).pipe(delay(10));
  }

  updateStatus(accountId: string, newStatus: AccountStatus): Observable<Account> {
    const account = this.accountsStorage.get(accountId);
    
    if (!account) {
      return throwError(() => new Error(`[AccountLocalDatasource] Account not found: ${accountId}`));
    }

    const updatedAccount = account.withStatus(newStatus);
    this.accountsStorage.set(accountId, updatedAccount);
    this.persistToStorage();
    
    console.log(`[AccountLocalDatasource] Status updated for account ${accountId}: ${newStatus}`);
    return of(updatedAccount).pipe(delay(10));
  }

  delete(id: string): Observable<boolean> {
    const existed = this.accountsStorage.has(id);
    if (existed) {
      this.accountsStorage.delete(id);
      this.persistToStorage();
      console.log(`[AccountLocalDatasource] Account deleted: ${id}`);
    }
    return of(existed).pipe(delay(10));
  }

  findByAccountNumber(accountNumber: string): Observable<Account | null> {
    const account = Array.from(this.accountsStorage.values())
      .find(acc => acc.accountNumber === accountNumber) || null;
    return of(account).pipe(delay(10));
  }

  exists(id: string): Observable<boolean> {
    return of(this.accountsStorage.has(id)).pipe(delay(10));
  }

  clear(): Observable<void> {
    this.accountsStorage.clear();
    localStorage.removeItem(this.STORAGE_KEY);
    this.accountsSubject.next([]);
    console.log('[AccountLocalDatasource] All accounts cleared');
    return of(void 0).pipe(delay(10));
  }

  count(): Observable<number> {
    return of(this.accountsStorage.size).pipe(delay(10));
  }
}

// === ARCHIVO: src/app/data/repositories/transaction.repository.impl.ts ===
import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError, tap, switchMap } from 'rxjs/operators';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/entities/transaction.entity';
import { TransactionLocalDatasource } from '../datasources/transaction.local.datasource';
import { TransactionRemoteDatasource } from '../datasources/transaction.remote.datasource';

@Injectable({
  providedIn: 'root'
})
export class TransactionRepositoryImpl implements TransactionRepository {
  private transactionsStorage: Map<string, Transaction> = new Map();
  private syncInProgress = false;
  private pendingSyncCount = new BehaviorSubject<number>(0);
  private readonly STORAGE_KEY = 'ionic_banking_transactions';

  constructor(
    private localDatasource: TransactionLocalDatasource,
    private remoteDatasource: TransactionRemoteDatasource
  ) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const transactionsData = JSON.parse(stored);
        transactionsData.forEach((txData: any) => {
          const transaction = this.reconstructTransaction(txData);
          this.transactionsStorage.set(transaction.id, transaction);
        });
      }
    } catch (error) {
      console.error('[TransactionRepositoryImpl] Error initializing from storage:', error);
    }
  }

  private reconstructTransaction(data: any): Transaction {
    const transaction = new Transaction(
      data.id,
      data.accountId,
      data.amount,
      data.type,
      data.status,
      data.description,
      data.counterpartyId,
      data.counterpartyName,
      data.category,
      data.metadata,
      data.createdAt,
      data.updatedAt
    );
    return transaction;
  }

  private persistToStorage(): void {
    try {
      const transactionsArray = Array.from(this.transactionsStorage.values()).map(tx => ({
        id: tx.id,
        accountId: tx.accountId,
        amount: tx.amount,
        type: tx.type,
        status: tx.status,
        description: tx.description,
        counterpartyId: tx.counterpartyId,
        counterpartyName: tx.counterpartyName,
        category: tx.category,
        metadata: tx.metadata,
        createdAt: tx.createdAt,
        updatedAt: tx.updatedAt
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactionsArray));
    } catch (error) {
      console.error('[TransactionRepositoryImpl] Error persisting to storage:', error);
    }
  }

  save(transaction: Transaction): Observable<Transaction> {
    if (!transaction || !transaction.id) {
      return throwError(() => new Error('[TransactionRepositoryImpl] Transaction or transaction ID is required'));
    }

    const existing = this.transactionsStorage.get(transaction.id);
    if (existing) {
      console.log(`[TransactionRepositoryImpl] Updating existing transaction: ${transaction.id}`);
    } else {
      console.log(`[TransactionRepositoryImpl] Creating new transaction: ${transaction.id}`);
    }

    this.transactionsStorage.set(transaction.id, transaction);
    this.persistToStorage();
    this.pendingSyncCount.next(this.pendingSyncCount.value + 1);

    return of(transaction).pipe(delay(10));
  }

  findById(id: string): Observable<Transaction | null> {
    const transaction = this.transactionsStorage.get(id) || null;
    if (!transaction) {
      console.warn(`[TransactionRepositoryImpl] Transaction not found: ${id}`);
    }
    return of(transaction).pipe(delay(10));
  }

  findByAccountId(accountId: string, limit: number = 50, offset: number = 0): Observable<Transaction[]> {
    const allTransactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const paginatedTransactions = allTransactions.slice(offset, offset + limit);
    return of(paginatedTransactions).pipe(delay(10));
  }

  findPendingTransactions(batchSize: number): Observable<Transaction[]> {
    const pendingTransactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.status === TransactionStatus.PENDING && tx.isProcessable())
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, batchSize);

    console.log(`[TransactionRepositoryImpl] Found ${pendingTransactions.length} pending transactions`);
    return of(pendingTransactions).pipe(delay(10));
  }

  updateStatus(id: string, newStatus: string): Observable<Transaction> {
    const transaction = this.transactionsStorage.get(id);
    
    if (!transaction) {
      return throwError(() => new Error(`[TransactionRepositoryImpl] Transaction not found: ${id}`));
    }

    const updatedTransaction = transaction.withStatus(newStatus as TransactionStatus);
    this.transactionsStorage.set(id, updatedTransaction);
    this.persistToStorage();
    
    console.log(`[TransactionRepositoryImpl] Status updated for transaction ${id}: ${newStatus}`);
    return of(updatedTransaction).pipe(delay(10));
  }

  syncWithBackend(): Observable<void> {
    if (this.syncInProgress) {
      console.warn('[TransactionRepositoryImpl] Sync already in progress');
      return of(void 0);
    }

    this.syncInProgress = true;
    console.log('[TransactionRepositoryImpl] Starting sync with backend');

    return this.remoteDatasource.fetchAll().pipe(
      delay(100),
      tap(remoteTransactions => {
        console.log(`[TransactionRepositoryImpl] Received ${remoteTransactions.length} transactions from backend`);
        
        remoteTransactions.forEach(remoteTx => {
          const localTx = this.transactionsStorage.get(remoteTx.id);
          
          if (!localTx) {
            this.transactionsStorage.set(remoteTx.id, remoteTx);
          } else if (new Date(remoteTx.updatedAt) > new Date(localTx.updatedAt)) {
            this.transactionsStorage.set(remoteTx.id, remoteTx);
          }
        });
        
        this.persistToStorage();
        this.pendingSyncCount.next(0);
      }),
      map(() => {
        this.syncInProgress = false;
        console.log('[TransactionRepositoryImpl] Sync completed successfully');
      }),
      catchError(error => {
        this.syncInProgress = false;
        console.error('[TransactionRepositoryImpl] Sync failed:', error);
        return throwError(() => error);
      })
    );
  }

  getPendingSyncCount(): Observable<number> {
    return this.pendingSyncCount.asObservable();
  }

  findByDateRange(accountId: string, startDate: Date, endDate: Date): Observable<Transaction[]> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => {
        const txDate = new Date(tx.createdAt);
        return tx.accountId === accountId && 
               txDate >= startDate && 
               txDate <= endDate;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return of(transactions).pipe(delay(10));
  }

  findByType(accountId: string, type: string): Observable<Transaction[]> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId && tx.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return of(transactions).pipe(delay(10));
  }

  delete(id: string): Observable<boolean> {
    const existed = this.transactionsStorage.has(id);
    if (existed) {
      this.transactionsStorage.delete(id);
      this.persistToStorage();
      console.log(`[TransactionRepositoryImpl] Transaction deleted: ${id}`);
    }
    return of(existed).pipe(delay(10));
  }

  count(): Observable<number> {
    return of(this.transactionsStorage.size).pipe(delay(10));
  }

  getBalanceImpact(accountId: string): Observable<number> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId && tx.status === TransactionStatus.COMPLETED);

    const totalImpact = transactions.reduce((sum, tx) => sum + tx.calculateBalanceImpact(), 0);
    return of(totalImpact).pipe(delay(10));
  }
}

// === ARCHIVO: src/app/data/repositories/account.repository.impl.ts ===
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { AccountStatus } from '../../domain/entities/account.entity';
import { AccountLocalDatasource } from '../datasources/account.local.datasource';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryImpl implements AccountRepository {
  private syncInProgress = false;

  constructor(private localDatasource: AccountLocalDatasource) {}

  findById(id: string): Observable<Account | null> {
    return this.localDatasource.findById(id).pipe(
      delay(10),
      tap(account => {
        if (account) {
          console.log(`[AccountRepositoryImpl] Found account: ${id}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding account ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  findByCustomerId(customerId: string): Observable<Account[]> {
    return this.localDatasource.findByCustomerId(customerId).pipe(
      delay(10),
      tap(accounts => {
        console.log(`[AccountRepositoryImpl] Found ${accounts.length} accounts for customer: ${customerId}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding accounts for customer ${customerId}:`, error);
        return throwError(() => error);
      })
    );
  }

  findAll(): Observable<Account[]> {
    return this.localDatasource.findAll().pipe(
      delay(10),
      tap(accounts => {
        console.log(`[AccountRepositoryImpl] Found ${accounts.length} total accounts`);
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error finding all accounts:', error);
        return throwError(() => error);
      })
    );
  }

  save(account: Account): Observable<Account> {
    if (!account || !account.id) {
      return throwError(() => new Error('[AccountRepositoryImpl] Account or account ID is required'));
    }

    return this.localDatasource.save(account).pipe(
      delay(10),
      tap(savedAccount => {
        console.log(`[AccountRepositoryImpl] Account saved: ${savedAccount.id}`);
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error saving account:', error);
        return throwError(() => error);
      })
    );
  }

  updateBalance(accountId: string, newBalance: number): Observable<Account> {
    if (newBalance < 0) {
      return throwError(() => new Error('[AccountRepositoryImpl] Balance cannot be negative'));
    }

    return this.localDatasource.updateBalance(accountId, newBalance).pipe(
      delay(10),
      tap(updatedAccount => {
        console.log(`[AccountRepositoryImpl] Balance updated for account ${accountId}: ${newBalance}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error updating balance for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  updateStatus(accountId: string, newStatus: AccountStatus): Observable<Account> {
    return this.localDatasource.updateStatus(accountId, newStatus).pipe(
      delay(10),
      tap(updatedAccount => {
        console.log(`[AccountRepositoryImpl] Status updated for account ${accountId}: ${newStatus}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error updating status for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<boolean> {
    return this.localDatasource.delete(id).pipe(
      delay(10),
      tap(existed => {
        if (existed) {
          console.log(`[AccountRepositoryImpl] Account deleted: ${id}`);
        } else {
          console.warn(`[AccountRepositoryImpl] Account not found for deletion: ${id}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error deleting account ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  findByAccountNumber(accountNumber: string): Observable<Account | null> {
    return this.localDatasource.findByAccountNumber(accountNumber).pipe(
      delay(10),
      tap(account => {
        if (account) {
          console.log(`[AccountRepositoryImpl] Found account by account number: ${accountNumber}`);
        } else {
          console.warn(`[AccountRepositoryImpl] Account not found by account number: ${accountNumber}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding account by account number ${accountNumber}:`, error);
        return throwError(() => error);
      })
    );
  }

  exists(id: string): Observable<boolean> {
    return this.localDatasource.exists(id).pipe(
      delay(10),
      tap(exists => {
        console.log(`[AccountRepositoryImpl] Account ${id} exists: ${exists}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error checking if account ${id} exists:`, error);
        return throwError(() => error);
      })
    );
  }

  hasSufficientFunds(accountId: string, amount: number): Observable<boolean> {
    return this.findById(accountId).pipe(
      map(account => {
        if (!account) {
          throw new Error(`[AccountRepositoryImpl] Account not found: ${accountId}`);
        }
        return account.hasSufficientFunds(amount);
      }),
      delay(10),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error checking funds for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  adjustBalance(accountId: string, amount: number): Observable<Account> {
    return this.findById(accountId).pipe(
      map(account => {
        if (!account) {
          throw new Error(`[AccountRepositoryImpl] Account not found: ${accountId}`);
        }
        if (!account.isActive()) {
          throw new Error(`[AccountRepositoryImpl] Account ${accountId} is not active`);
        }
        if (amount < 0 && !account.hasSufficientFunds(Math.abs(amount))) {
          throw new Error(`[AccountRepositoryImpl] Insufficient funds in account ${accountId}`);
        }
        return account.adjustBalance(amount);
      }),
      switchMap(updatedAccount => this.save(updatedAccount)),
      delay(10),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error adjusting balance for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  count(): Observable<number> {
    return this.localDatasource.count().pipe(
      delay(10),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error counting accounts:', error);
        return throwError(() => error);
      })
    );
  }

  clear(): Observable<void> {
    return this.localDatasource.clear().pipe(
      delay(10),
      tap(() => {
        console.log('[AccountRepositoryImpl] All accounts cleared');
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error clearing accounts:', error);
        return throwError(() => error);
      })
    );
  }
}

// === ARCHIVO: src/app/presentation/services/transaction.service.ts ===
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/entities/transaction.entity';
import { TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private selectedTransactionSubject = new BehaviorSubject<Transaction | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();
  selectedTransaction$ = this.selectedTransactionSubject.asObservable();

  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository,
    private notificationService: NotificationService
  ) {}

  loadTransactions(accountId: string, limit: number = 50, offset: number = 0): void {
    this.setLoading(true);
    this.clearError();

    this.transactionRepository.findByAccountId(accountId, limit, offset).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Loaded ${transactions.length} transactions for account ${accountId}`);
        this.transactionsSubject.next(transactions);
      }),
      catchError(error => {
        console.error('[TransactionService] Error loading transactions:', error);
        this.setError('Failed to load transactions');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    ).subscribe();
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.save(transaction).pipe(
      delay(100),
      tap(savedTransaction => {
        console.log(`[TransactionService] Transaction created: ${savedTransaction.id}`);
        this.notificationService.success('Transaction created successfully');
        this.addTransactionToList(savedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error creating transaction:', error);
        this.setError('Failed to create transaction');
        this.notificationService.error('Failed to create transaction');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  processTransaction(transactionId: string): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findById(transactionId).pipe(
      switchMap(transaction => {
        if (!transaction) {
          throw new Error(`Transaction not found: ${transactionId}`);
        }

        if (!transaction.isProcessable()) {
          throw new Error('Transaction cannot be processed in current status');
        }

        return this.accountRepository.hasSufficientFunds(transaction.accountId, Math.abs(transaction.amount));
      }),
      switchMap(hasFunds => {
        if (!hasFunds) {
          throw new Error('Insufficient funds');
        }
        return this.transactionRepository.updateStatus(transactionId, TransactionStatus.COMPLETED);
      }),
      tap(updatedTransaction => {
        console.log(`[TransactionService] Transaction processed: ${transactionId}`);
        this.notificationService.success('Transaction processed successfully');
        this.updateTransactionInList(updatedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error processing transaction:', error);
        const errorMessage = error.message || 'Failed to process transaction';
        this.setError(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  rejectTransaction(transactionId: string, reason: string): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.updateStatus(transactionId, TransactionStatus.REJECTED).pipe(
      delay(100),
      tap(updatedTransaction => {
        console.log(`[TransactionService] Transaction rejected: ${transactionId}, reason: ${reason}`);
        this.notificationService.warning('Transaction rejected');
        this.updateTransactionInList(updatedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error rejecting transaction:', error);
        this.setError('Failed to reject transaction');
        this.notificationService.error('Failed to reject transaction');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  syncTransactions(): Observable<void> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.syncWithBackend().pipe(
      delay(200),
      tap(() => {
        console.log('[TransactionService] Transactions synced with backend');
        this.notificationService.success('Transactions synchronized');
      }),
      catchError(error => {
        console.error('[TransactionService] Error syncing transactions:', error);
        this.setError('Failed to sync transactions');
        this.notificationService.error('Failed to sync transactions');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionById(id: string): Observable<Transaction | null> {
    this.clearError();

    return this.transactionRepository.findById(id).pipe(
      delay(50),
      tap(transaction => {
        if (transaction) {
          this.selectedTransactionSubject.next(transaction);
          console.log(`[TransactionService] Transaction loaded: ${id}`);
        } else {
          console.warn(`[TransactionService] Transaction not found: ${id}`);
        }
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transaction:', error);
        this.setError('Failed to get transaction');
        return of(null);
      })
    );
  }

  getPendingTransactions(batchSize: number = 10): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findPendingTransactions(batchSize).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} pending transactions`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting pending transactions:', error);
        this.setError('Failed to get pending transactions');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionsByType(accountId: string, type: TransactionType): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findByType(accountId, type).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} transactions of type ${type}`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transactions by type:', error);
        this.setError('Failed to get transactions by type');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionsByDateRange(accountId: string, startDate: Date, endDate: Date): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findByDateRange(accountId, startDate, endDate).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} transactions in date range`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transactions by date range:', error);
        this.setError('Failed to get transactions by date range');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getBalanceImpact(accountId: string): Observable<number> {
    return this.transactionRepository.getBalanceImpact(accountId).pipe(
      delay(50),
      tap(impact => {
        console.log(`[TransactionService] Balance impact for account ${accountId}: ${impact}`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting balance impact:', error);
        return of(0);
      })
    );
  }

  clearSelectedTransaction(): void {
    this.selectedTransactionSubject.next(null);
  }

  clearTransactions(): void {
    this.transactionsSubject.next([]);
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private setError(message: string): void {
    this.errorSubject.next(message);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }

  private addTransactionToList(transaction: Transaction): void {
    const currentTransactions = this.transactionsSubject.value;
    this.transactionsSubject.next([transaction, ...currentTransactions]);
  }

  private updateTransactionInList(updatedTransaction: Transaction): void {
    const currentTransactions = this.transactionsSubject.value;
    const updatedList = currentTransactions.map(tx => 
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    );
    this.transactionsSubject.next(updatedList);

    if (this.selectedTransactionSubject.value?.id === updatedTransaction.id) {
      this.selectedTransactionSubject.next(updatedTransaction);
    }
  }
}

// === ARCHIVO: src/app/presentation/services/auth.service.ts ===
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap, retry, shareReplay } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

const JWT_TOKEN_KEY = 'auth_jwt_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_DATA_KEY = 'auth_user_data';
const TOKEN_EXPIRY_BUFFER = 30000;

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  accountId: string;
  roles: string[];
}

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  accountId: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(Storage);

  private readonly apiUrl = 'https://api.bankapp.example.com/v1';
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  readonly isAuthenticated = signal<boolean>(false);
  readonly currentUser = signal<AuthUser | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly authError = signal<string | null>(null);

  readonly isAdmin = computed(() => {
    const user = this.currentUser();
    return user?.roles?.includes('admin') ?? false;
  });

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.storage.create();
      const [token, refreshToken, userData] = await Promise.all([
        this.storage.get(JWT_TOKEN_KEY),
        this.storage.get(REFRESH_TOKEN_KEY),
        this.storage.get(USER_DATA_KEY)
      ]);

      if (token && this.isTokenValid(token)) {
        this.tokenSubject.next(token);
        this.refreshTokenSubject.next(refreshToken);
        if (userData) {
          this.currentUser.set(JSON.parse(userData));
        }
        this.isAuthenticated.set(true);
        this.scheduleTokenRefresh(token);
      } else {
        await this.clearAuthData();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      await this.clearAuthData();
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.authError.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      shareReplay(1)
    );
  }

  register(userData: { email: string; password: string; name: string }): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.authError.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      shareReplay(1)
    );
  }

  logout(): void {
    this.clearAuthData();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.tokenSubject.next(null);
    this.refreshTokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.refreshTokenSubject.value;
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return true;
      }
      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      return expirationDate <= now;
    } catch {
      return true;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return false;
      }
      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      const bufferTime = new Date(now.getTime() + TOKEN_EXPIRY_BUFFER);
      return expirationDate > bufferTime;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): TokenPayload | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.tokenSubject.next(response.accessToken);
    this.refreshTokenSubject.next(response.refreshToken);
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
    this.isLoading.set(false);
    this.authError.set(null);

    this.storage.set(JWT_TOKEN_KEY, response.accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, response.refreshToken);
    this.storage.set(USER_DATA_KEY, JSON.stringify(response.user));

    this.scheduleTokenRefresh(response.accessToken);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    this.isLoading.set(false);
    let errorMessage = 'An error occurred during authentication';

    if (error.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.status === 403) {
      errorMessage = 'Account is locked or disabled';
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.authError.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private scheduleTokenRefresh(token: string): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) return;

      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      const timeUntilExpiry = expirationDate.getTime() - now.getTime();
      const refreshTime = timeUntilExpiry - TOKEN_EXPIRY_BUFFER;

      if (refreshTime > 0) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.refreshToken().subscribe();
        }, refreshTime);
      } else {
        this.refreshToken().subscribe();
      }
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
    }
  }

  private async clearAuthData(): Promise<void> {
    await Promise.all([
      this.storage.remove(JWT_TOKEN_KEY),
      this.storage.remove(REFRESH_TOKEN_KEY),
      this.storage.remove(USER_DATA_KEY)
    ]);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  updateUserProfile(updates: Partial<AuthUser>): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.apiUrl}/users/profile`, updates, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => {
        this.currentUser.set(user);
        this.storage.set(USER_DATA_KEY, JSON.stringify(user));
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/change-password`,
      { currentPassword, newPassword },
      { headers: this.getAuthHeaders() }
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password-request`, { email });
  }

  verifyEmail(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/verify-email`, { token }).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  resendVerificationEmail(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/resend-verification`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}

// === ARCHIVO: src/app/presentation/services/notification.service.ts ===
import { Injectable, inject, signal } from '@angular/core';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  TRANSACTION = 'transaction',
  SECURITY = 'security',
  SYSTEM = 'system'
}

interface ToastOptions {
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  color?: string;
  icon?: string;
  cssClass?: string | string[];
  buttons?: Array<{ text: string; role?: string; handler?: () => void }>;
}

interface AlertOptions {
  header?: string;
  subHeader?: string;
  message: string;
  buttons?: Array<{ text: string; role?: string; handler?: () => void }>;
  inputs?: Array<{
    type: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio';
    name: string;
    placeholder?: string;
    value?: string | number | boolean;
    label?: string;
    checked?: boolean;
  }>;
  backdropDismiss?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toastController = inject(ToastController);
  private readonly alertController = inject(AlertController);
  private readonly loadingController = inject(LoadingController);
  private readonly modalController = inject(ModalController);
  private readonly translate = inject(TranslateService);

  private readonly notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  private readonly unreadCountSubject = new BehaviorSubject<number>(0);
  private readonly loadingOverlay: { present: () => Promise<void>; dismiss: () => Promise<void> } | null = null;

  readonly notifications$ = this.notificationsSubject.asObservable();
  readonly unreadCount$ = this.unreadCountSubject.asObservable();
  readonly hasUnreadNotifications = signal<boolean>(false);

  private notificationIdCounter = 0;

  async showSuccessToast(message: string, duration = 3000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'success',
      icon: 'checkmark-circle'
    });
  }

  async showErrorToast(message: string, duration = 4000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'danger',
      icon: 'alert-circle'
    });
  }

  async showWarningToast(message: string, duration = 3500): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'warning',
      icon: 'warning'
    });
  }

  async showInfoToast(message: string, duration = 3000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'medium',
      icon: 'information-circle'
    });
  }

  async showToast(options: ToastOptions): Promise<void> {
    const translatedMessage = this.translate.instant(options.message);
    
    const toast = await this.toastController.create({
      message: translatedMessage,
      duration: options.duration ?? 3000,
      position: options.position ?? 'top',
      color: options.color ?? 'medium',
      cssClass: options.cssClass,
      buttons: options.buttons,
      animated: true,
      translucent: false
    });

    await toast.present();
  }

  async showAlert(options: AlertOptions): Promise<boolean> {
    const translatedHeader = options.header ? this.translate.instant(options.header) : undefined;
    const translatedSubHeader = options.subHeader ? this.translate.instant(options.subHeader) : undefined;
    const translatedMessage = this.translate.instant(options.message);

    const alert = await this.alertController.create({
      header: translatedHeader,
      subHeader: translatedSubHeader,
      message: translatedMessage,
      buttons: options.buttons ?? [
        {
          text: this.translate.instant('common.ok'),
          role: 'confirm'
        }
      ],
      inputs: options.inputs,
      backdropDismiss: options.backbackDismiss ?? true,
      animated: true
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

  async showConfirmAlert(
    message: string,
    confirmText?: string,
    cancelText?: string,
    header?: string
  ): Promise<boolean> {
    return this.showAlert({
      header: header ?? this.translate.instant('common.confirm'),
      message,
      buttons: [
        {
          text: cancelText ?? this.translate.instant('common.cancel'),
          role: 'cancel'
        },
        {
          text: confirmText ?? this.translate.instant('common.confirm'),
          role: 'confirm'
        }
      ]
    });
  }

  async showLoading(message: string = 'Loading...'): Promise<void> {
    const translatedMessage = this.translate.instant(message);
    const loading = await this.loadingController.create({
      message: translatedMessage,
      spinner: 'circular',
      cssClass: 'loading-overlay',
      backdropDismiss: false,
      animated: true
    });
    await loading.present();
  }

  async hideLoading(): Promise<void> {
    try {
      await this.loadingController.dismiss();
    } catch {
      // Loading was not present
    }
  }

  async showTransactionNotification(
    type: 'success' | 'failed' | 'pending',
    amount: number,
    recipientName: string
  ): Promise<void> {
    let title: string;
    let message: string;
    let color: string;
    let icon: string;

    switch (type) {
      case 'success':
        title = this.translate.instant('notifications.transactionSuccess');
        message = this.translate.instant('notifications.sentTo', { name: recipientName, amount });
        color = 'success';
        icon = 'checkmark-circle';
        break;
      case 'failed':
        title = this.translate.instant('notifications.transactionFailed');
        message = this.translate.instant('notifications.failedTo', { name: recipientName });
        color = 'danger';
        icon = 'alert-circle';
        break;
      case 'pending':
        title = this.translate.instant('notifications.transactionPending');
        message = this.translate.instant('notifications.pendingTo', { name: recipientName });
        color = 'warning';
        icon = 'time';
        break;
    }

    await this.showToast({
      message: `${title}: ${message}`,
      duration: 4000,
      position: 'top',
      color,
      icon
    });
  }

  async showSecurityAlert(message: string): Promise<void> {
    await this.showAlert({
      header: this.translate.instant('notifications.securityAlert'),
      message,
      buttons: [
        {
          text: this.translate.instant('common.acknowledge'),
          role: 'confirm'
        }
      ]
    });
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: `notif_${++this.notificationIdCounter}_${Date.now()}`,
      timestamp: new Date(),
      read: false
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...currentNotifications]);
    this.updateUnreadCount();
  }

  markAsRead(notificationId: string): void {
    const notifications = this.notificationsSubject.value.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(notif => ({
      ...notif,
      read: true
    }));
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
    this.updateUnreadCount();
  }

  getNotificationById(id: string): AppNotification | undefined {
    return this.notificationsSubject.value.find(n => n.id === id);
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notificationsSubject.value.filter(n => !n.read).length;
    this.unreadCountSubject.next(unreadCount);
    this.hasUnreadNotifications.set(unreadCount > 0);
  }

  async showBalanceUpdateNotification(newBalance: number, previousBalance: number): Promise<void> {
    const difference = newBalance - previousBalance;
    const direction = difference >= 0 ? 'increase' : 'decrease';
    const formattedDifference = Math.abs(difference).toFixed(2);

    const title = direction === 'increase'
      ? this.translate.instant('notifications.balanceIncreased')
      : this.translate.instant('notifications.balanceDecreased');
    
    const message = this.translate.instant('notifications.balanceChange', {
      direction: this.translate.instant(`common.${direction}`),
      amount: formattedDifference
    });

    await this.showToast({
      message: `${title}: ${message}`,
      duration: 4000,
      position: 'top',
      color: direction === 'increase' ? 'success' : 'warning',
      icon: direction === 'increase' ? 'arrow-up-circle' : 'arrow-down-circle'
    });
  }

  async showAccountLockedNotification(): Promise<void> {
    await this.showAlert({
      header: this.translate.instant('notifications.accountLocked'),
      message: this.translate.instant('notifications.accountLockedMessage'),
      buttons: [
        {
          text: this.translate.instant('common.contactSupport'),
          role: 'confirm'
        }
      ]
    });
  }

  async showSessionExpiredNotification(): Promise<void> {
    const confirmed = await this.showConfirmAlert(
      this.translate.instant('notifications.sessionExpired'),
      this.translate.instant('common.login'),
      this.translate.instant('common.cancel')
    );

    if (confirmed) {
      // Navigation to login will be handled by the component
    }
  }
}

// === ARCHIVO: src/app/presentation/store/transaction.store.ts ===
import { Injectable, signal, computed, inject } from '@angular/core';
import { Transaction, TransactionStatus, TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export interface TransactionState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  isLoading: boolean;
  error: string | null;
  currentFilter: TransactionFilter;
  pagination: TransactionPagination;
}

export interface TransactionFilter {
  status?: TransactionStatus;
  type?: TransactionType;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface TransactionPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const initialState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
  isLoading: false,
  error: null,
  currentFilter: {},
  pagination: {
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  }
};

@Injectable({
  providedIn: 'root'
})
export class TransactionStore {
  private readonly transactionRepository = inject(TransactionRepository);

  private readonly state = signal<TransactionState>(initialState);

  readonly transactions = computed(() => this.state().transactions);
  readonly selectedTransaction = computed(() => this.state().selectedTransaction);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);
  readonly currentFilter = computed(() => this.state().currentFilter);
  readonly pagination = computed(() => this.state().pagination);

  readonly hasMorePages = computed(() => {
    const { page, totalPages } = this.state().pagination;
    return page < totalPages;
  });

  readonly pendingTransactions = computed(() =>
    this.state().transactions.filter(t => t.status === TransactionStatus.PENDING)
  );

  readonly recentTransactions = computed(() =>
    this.state().transactions.slice(0, 5)
  );

  readonly totalAmount = computed(() =>
    this.state().transactions.reduce((sum, t) => sum + t.calculateBalanceImpact(), 0)
  );

  setLoading(isLoading: boolean): void {
    this.state.update(state => ({ ...state, isLoading }));
  }

  setError(error: string | null): void {
    this.state.update(state => ({ ...state, error, isLoading: false }));
  }

  setTransactions(transactions: Transaction[]): void {
    this.state.update(state => ({
      ...state,
      transactions,
      isLoading: false,
      error: null
    }));
  }

  addTransaction(transaction: Transaction): void {
    this.state.update(state => ({
      ...state,
      transactions: [transaction, ...state.transactions],
      isLoading: false,
      error: null
    }));
  }

  updateTransaction(updatedTransaction: Transaction): void {
    this.state.update(state => ({
      ...state,
      transactions: state.transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
      isLoading: false,
      error: null
    }));
  }

  selectTransaction(transaction: Transaction | null): void {
    this.state.update(state => ({ ...state, selectedTransaction: transaction }));
  }

  setFilter(filter: TransactionFilter): void {
    this.state.update(state => ({
      ...state,
      currentFilter: filter,
      pagination: { ...state.pagination, page: 1 }
    }));
  }

  clearFilter(): void {
    this.state.update(state => ({
      ...state,
      currentFilter: {},
      pagination: { ...state.pagination, page: 1 }
    }));
  }

  setPagination(pagination: Partial<TransactionPagination>): void {
    this.state.update(state => ({
      ...state,
      pagination: { ...state.pagination, ...pagination }
    }));
  }

  nextPage(): void {
    this.state.update(state => ({
      ...state,
      pagination: { ...state.pagination, page: state.pagination.page + 1 }
    }));
  }

  previousPage(): void {
    this.state.update(state => ({
      ...state,
      pagination: {
        ...state.pagination,
        page: Math.max(1, state.pagination.page - 1)
      }
    }));
  }

  reset(): void {
    this.state.set(initialState);
  }

  async loadTransactions(accountId: string): Promise<void> {
    this.setLoading(true);
    try {
      const { page, pageSize } = this.state().pagination;
      const transactions = await this.transactionRepository.findByAccountId(
        accountId,
        pageSize,
        (page - 1) * pageSize
      );
      this.setTransactions(transactions);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to load transactions');
    }
  }

  async loadMoreTransactions(accountId: string): Promise<void> {
    if (!this.hasMorePages()) return;

    this.setLoading(true);
    try {
      const { page, pageSize } = this.state().pagination;
      const newTransactions = await this.transactionRepository.findByAccountId(
        accountId,
        pageSize,
        page * pageSize
      );

      this.state.update(state => ({
        ...state,
        transactions: [...state.transactions, ...newTransactions],
        isLoading: false,
        error: null
      }));

      this.nextPage();
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to load more transactions');
    }
  }

  async syncTransactions(): Promise<void> {
    this.setLoading(true);
    try {
      await this.transactionRepository.syncWithBackend();
      const accountId = this.state().transactions[0]?.accountId;
      if (accountId) {
        await this.loadTransactions(accountId);
      }
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to sync transactions');
    }
  }
}

// === ARCHIVO: src/app/presentation/pages/home/home.page.ts ===
import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonItem, IonLabel, IonBadge, IonRefresher, IonRefresherContent, IonSkeletonText, IonAlert } from '@ionic/angular/standalone';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { catchError, finalize, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { TransactionStore } from '../../store/transaction.store';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionType, TransactionStatus } from '../../../domain/entities/transaction.entity';
import { Account } from '../../../domain/entities/account.entity';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  color: string;
}

interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingTransactions: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly userName = computed(() => this.authService.currentUser()?.name ?? 'User');
  readonly userEmail = computed(() => this.authService.currentUser()?.email ?? '');
  readonly isLoading = this.transactionStore.isLoading;
  readonly error = this.transactionStore.error;
  readonly transactions = this.transactionStore.transactions;
  readonly recentTransactions = this.transactionStore.recentTransactions;

  readonly accountId = computed(() => this.authService.currentUser()?.accountId ?? '');

  readonly dashboardStats = computed<DashboardStats>(() => {
    const allTransactions = this.transactions();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyTransactions = allTransactions.filter(
      t => new Date(t.createdAt) >= startOfMonth
    );

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === TransactionType.CREDIT || t.type === TransactionType.DEPOSIT)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === TransactionType.DEBIT || t.type === TransactionType.WITHDRAWAL)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const pendingCount = allTransactions.filter(
      t => t.status === TransactionStatus.PENDING
    ).length;

    return {
      totalBalance: 12500.00,
      monthlyIncome,
      monthlyExpenses,
      pendingTransactions: pendingCount
    };
  });

  readonly quickActions: QuickAction[] = [
    {
      id: 'send',
      label: 'Send',
      icon: 'send',
      route: '/transfer',
      color: 'primary'
    },
    {
      id: 'receive',
      label: 'Receive',
      icon: 'arrow-down-circle',
      route: '/receive',
      color: 'success'
    },
    {
      id: 'pay',
      label: 'Pay',
      icon: 'wallet',
      route: '/payments',
      color: 'warning'
    },
    {
      id: 'topup',
      label: 'Top Up',
      icon: 'add-circle',
      route: '/topup',
      color: 'tertiary'
    }
  ];

  readonly unreadNotificationCount = signal<number>(0);
  readonly showErrorAlert = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadInitialData();
    this.subscribeToNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    const accountId = this.accountId();
    if (accountId) {
      this.transactionStore.loadTransactions(accountId);
    }
  }

  private subscribeToNotifications(): void {
    this.notificationService.unreadCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.unreadNotificationCount.set(count));
  }

  async handleRefresh(event: Event): Promise<void> {
    const accountId = this.accountId();
    if (!accountId) {
      return;
    }

    try {
      await this.transactionStore.syncTransactions();
    } catch (error) {
      this.errorMessage.set('Failed to refresh data. Please try again.');
      this.showErrorAlert.set(true);
    } finally {
      const refresher = event as CustomEvent;
      await refresher.target.complete();
    }
  }

  onQuickAction(action: QuickAction): void {
    this.router.navigate([action.route]);
  }

  onTransactionClick(transaction: Transaction): void {
    this.transactionStore.selectTransaction(transaction);
    this.router.navigate(['/transactions', transaction.id]);
  }

  onViewAllTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  async onLogout(): Promise<void> {
    const confirmed = await this.notificationService.showConfirmAlert(
      'Are you sure you want to log out?',
      'Logout',
      'Cancel'
    );

    if (confirmed) {
      this.authService.logout();
    }
  }

  onNotificationsClick(): void {
    this.router.navigate(['/notifications']);
  }

  onProfileClick(): void {
    this.router.navigate(['/profile']);
  }

  getTransactionIcon(type: TransactionType): string {
    switch (type) {
      case TransactionType.CREDIT:
        return 'arrow-down-circle';
      case TransactionType.DEBIT:
        return 'arrow-up-circle';
      case TransactionType.TRANSFER:
        return 'swap-horizontal';
      case TransactionType.PAYMENT:
        return 'card';
      case TransactionType.DEPOSIT:
        return 'cash';
      case TransactionType.WITHDRAWAL:
        return 'wallet';
      default:
        return 'ellipse';
    }
  }

  getTransactionColor(type: TransactionType): string {
    switch (type) {
      case TransactionType.CREDIT:
      case TransactionType.DEPOSIT:
        return 'success';
      case TransactionType.DEBIT:
      case TransactionType.WITHDRAWAL:
      case TransactionType.PAYMENT:
        return 'danger';
      case TransactionType.TRANSFER:
        return 'primary';
      default:
        return 'medium';
    }
  }

  getStatusColor(status: TransactionStatus): string {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return 'success';
      case TransactionStatus.PENDING:
        return 'warning';
      case TransactionStatus.FAILED:
        return 'danger';
      case TransactionStatus.CANCELLED:
        return 'medium';
      default:
        return 'medium';
    }
  }

  formatAmount(amount: number, type: TransactionType): string {
    const isCredit = type === TransactionType.CREDIT || 
                     type === TransactionType.DEPOSIT || 
                     type === TransactionType.REFUND;
    const prefix = isCredit ? '+' : '-';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  dismissErrorAlert(): void {
    this.showErrorAlert.set(false);
    this.errorMessage.set('');
  }
}

// === ARCHIVO: src/app/presentation/pages/home/home.page.html ===
<ion-header [translucent]="true">
  <ion-toolbar color="primary">
    <ion-title>Banco Móvil</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="logout()">
        <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div class="home-container">
    <ion-card class="welcome-card">
      <ion-card-header>
        <ion-card-title>Bienvenido</ion-card-title>
        <ion-card-subtitle>{{ userName }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <p>Gestiona tus finanzas de forma segura y eficiente.</p>
      </ion-card-content>
    </ion-card>

    <app-balance-display
      [balance]="currentBalance"
      [currency]="currency"
      [lastUpdated]="lastBalanceUpdate">
    </app-balance-display>

    <div class="quick-actions">
      <h2>Acciones Rápidas</h2>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-button expand="block" color="secondary" (click)="navigateToTransactions()">
              <ion-icon slot="start" name="list-outline"></ion-icon>
              Transacciones
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button expand="block" color="tertiary" (click)="navigateToTransfer()">
              <ion-icon slot="start" name="swap-horizontal-outline"></ion-icon>
              Transferir
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-button expand="block" color="success" (click)="navigateToDeposit()">
              <ion-icon slot="start" name="add-circle-outline"></ion-icon>
              Depositar
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button expand="block" color="warning" (click)="navigateToWithdraw()">
              <ion-icon slot="start" name="remove-circle-outline"></ion-icon>
              Retirar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <div class="recent-transactions">
      <h2>Transacciones Recientes</h2>
      <ion-list *ngIf="recentTransactions().length > 0; else noTransactions">
        <ion-item *ngFor="let transaction of recentTransactions()">
          <app-transaction-card
            [transaction]="transaction"
            (transactionClick)="onTransactionClick($event)">
          </app-transaction-card>
        </ion-item>
      </ion-list>
      <ng-template #noTransactions>
        <ion-card>
          <ion-card-content class="empty-state">
            <ion-icon name="wallet-outline" size="large"></ion-icon>
            <p>No hay transacciones recientes</p>
            <ion-button fill="outline" (click)="navigateToTransactions()">
              Ver Todas
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ng-template>
    </div>

    <div class="sync-status" *ngIf="syncStatus() as status">
      <ion-note [color]="status.synced ? 'success' : 'warning'">
        <ion-icon [name]="status.synced ? 'cloud-done-outline' : 'cloud-offline-outline'"></ion-icon>
        {{ status.message }}
      </ion-note>
    </div>
  </div>
</ion-content>

<ion-footer>
  <ion-toolbar>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" (click)="navigateToHome()">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="transactions" (click)="navigateToTransactions()">
          <ion-icon name="list-outline"></ion-icon>
          <ion-label>Movimientos</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" (click)="navigateToProfile()">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-toolbar>
</ion-footer>

// === ARCHIVO: src/app/presentation/pages/transactions/transactions.page.ts ===
import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLoading, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSelect, IonSelectOption, IonSearchbar, IonButtons, IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Subject, takeUntil, catchError, finalize } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionStore } from '../../store/transaction.store';
import { Transaction, TransactionStatus, TransactionType } from '../../../domain/entities/transaction.entity';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    TransactionCardComponent
  ],
  templateUrl: './transactions.page.html'
})
export class TransactionsPage implements OnInit, OnDestroy {
  private readonly transactionService = inject(TransactionService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly transactions = this.transactionStore.transactions;
  readonly isLoading = this.transactionStore.isLoading;
  readonly error = this.transactionStore.error;
  readonly syncStatus = this.transactionStore.syncStatus;

  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<TransactionStatus | 'ALL'>('ALL');
  readonly typeFilter = signal<TransactionType | 'ALL'>('ALL');

  readonly filteredTransactions = computed(() => {
    let result = this.transactions();
    const query = this.searchQuery().toLowerCase();
    const status = this.statusFilter();
    const type = this.typeFilter();

    if (query) {
      result = result.filter(t => 
        t.description?.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
      );
    }

    if (status !== 'ALL') {
      result = result.filter(t => t.status === status);
    }

    if (type !== 'ALL') {
      result = result.filter(t => t.type === type);
    }

    return result;
  });

  readonly pendingCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.PENDING).length
  );

  readonly completedCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.COMPLETED).length
  );

  readonly failedCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.FAILED).length
  );

  readonly totalAmount = computed(() => 
    this.transactions().reduce((sum, t) => sum + Math.abs(t.amount), 0)
  );

  private pageSize = 20;
  private currentPage = 0;
  private hasMoreData = true;

  ngOnInit(): void {
    this.loadTransactions();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTransactions(): void {
    this.transactionStore.setLoading(true);
    this.transactionStore.clearError();

    this.transactionService.getTransactions(this.pageSize, 0)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al cargar transacciones: ' + err.message);
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(transactions => {
        this.transactionStore.setTransactions(transactions);
        this.currentPage = 1;
        this.hasMoreData = transactions.length >= this.pageSize;
      });
  }

  loadMoreTransactions(event: any): void {
    if (!this.hasMoreData) {
      event.target.complete();
      return;
    }

    this.transactionService.getTransactions(this.pageSize, this.currentPage * this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al cargar más transacciones');
          return [];
        })
      )
      .subscribe(transactions => {
        const currentTransactions = this.transactions();
        this.transactionStore.setTransactions([...currentTransactions, ...transactions]);
        this.currentPage++;
        this.hasMoreData = transactions.length >= this.pageSize;
        event.target.complete();
      });
  }

  handleRefresh(event: any): void {
    this.transactionStore.clearTransactions();
    this.currentPage = 0;
    this.hasMoreData = true;

    this.transactionService.getTransactions(this.pageSize, 0)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al sincronizar');
          return [];
        })
      )
      .subscribe(transactions => {
        this.transactionStore.setTransactions(transactions);
        this.currentPage = 1;
        event.target.complete();
      });
  }

  onSearch(event: any): void {
    this.searchQuery.set(event.detail.value || '');
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter.set(event.detail.value);
  }

  onTypeFilterChange(event: any): void {
    this.typeFilter.set(event.detail.value);
  }

  onTransactionClick(transaction: Transaction): void {
    this.router.navigate(['/transactions', transaction.id]);
  }

  retryFailedTransaction(transaction: Transaction): void {
    if (transaction.status !== TransactionStatus.FAILED) {
      return;
    }

    this.transactionStore.setLoading(true);
    this.transactionService.retryTransaction(transaction.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al reintentar transacción');
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(updatedTransaction => {
        if (updatedTransaction) {
          const current = this.transactions();
          const updated = current.map(t => 
            t.id === updatedTransaction.id ? updatedTransaction : t
          );
          this.transactionStore.setTransactions(updated);
        }
      });
  }

  syncWithBackend(): void {
    this.transactionStore.setLoading(true);
    this.transactionService.syncWithBackend()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al sincronizar con el servidor');
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('ALL');
    this.typeFilter.set('ALL');
  }

  private setupAutoRefresh(): void {
    setInterval(() => {
      if (!this.isLoading()) {
        this.syncWithBackend();
      }
    }, 30000);
  }
}

// === ARCHIVO: src/app/presentation/pages/transactions/transactions.page.html ===
<ion-header [translucent]="true">
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-back-button default-href="/home"></ion-back-button>
    </ion-buttons>
    <ion-title>Transacciones</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="syncWithBackend()" [disabled]="isLoading()">
        <ion-icon slot="icon-only" name="sync-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-refresher slot="fixed" (ionRefresh)="handleRefresh($event)">
    <ion-refresher-content
      pulling-text="Desliza para actualizar"
      refreshing-spinner="circles"
      refreshing-text="Sincronizando...">
    </ion-refresher-content>
  </ion-refresher>

  <div class="transactions-summary">
    <ion-grid>
      <ion-row>
        <ion-col size="4">
          <div class="summary-item">
            <ion-badge color="warning">{{ pendingCount() }}</ion-badge>
            <ion-label>Pendientes</ion-label>
          </div>
        </ion-col>
        <ion-col size="4">
          <div class="summary-item">
            <ion-badge color="success">{{ completedCount() }}</ion-badge>
            <ion-label>Completadas</ion-label>
          </div>
        </ion-col>
        <ion-col size="4">
          <div class="summary-item">
            <ion-badge color="danger">{{ failedCount() }}</ion-badge>
            <ion-label>Fallidas</ion-label>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>

  <div class="filters-section">
    <ion-searchbar
      [ngModel]="searchQuery()"
      (ngModelChange)="onSearch($event)"
      placeholder="Buscar por descripción o ID"
      search-icon="search-outline"
      show-clear-button="always">
    </ion-searchbar>

    <ion-grid>
      <ion-row>
        <ion-col size="6">
          <ion-select
            label="Estado"
            [ngModel]="statusFilter()"
            (ngModelChange)="onStatusFilterChange($event)"
            interface="popover"
            placeholder="Todos">
            <ion-select-option value="ALL">Todos</ion-select-option>
            <ion-select-option value="PENDING">Pendiente</ion-select-option>
            <ion-select-option value="PROCESSING">Procesando</ion-select-option>
            <ion-select-option value="COMPLETED">Completada</ion-select-option>
            <ion-select-option value="FAILED">Fallida</ion-select-option>
            <ion-select-option value="CANCELLED">Cancelada</ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col size="6">
          <ion-select
            label="Tipo"
            [ngModel]="typeFilter()"
            (ngModelChange)="onTypeFilterChange($event)"
            interface="popover"
            placeholder="Todos">
            <ion-select-option value="ALL">Todos</ion-select-option>
            <ion-select-option value="DEPOSIT">Depósito</ion-select-option>
            <ion-select-option value="WITHDRAWAL">Retiro</ion-select-option>
            <ion-select-option value="TRANSFER">Transferencia</ion-select-option>
            <ion-select-option value="PAYMENT">Pago</ion-select-option>
            <ion-select-option value="REFUND">Reembolso</ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-button
      *ngIf="searchQuery() || statusFilter() !== 'ALL' || typeFilter() !== 'ALL'"
      fill="clear"
      size="small"
      (click)="clearFilters()">
      <ion-icon slot="start" name="close-circle-outline"></ion-icon>
      Limpiar filtros
    </ion-button>
  </div>

  <div class="transactions-list">
    <ion-loading [isOpen]="isLoading()" message="Cargando transacciones..."></ion-loading>

    <div *ngIf="error() as errorMessage" class="error-banner">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <span>{{ errorMessage }}</span>
      <ion-button fill="clear" size="small" (click)="loadTransactions()">
        Reintentar
      </ion-button>
    </div>

    <ion-list *ngIf="filteredTransactions().length > 0; else emptyState">
      <ion-item
        *ngFor="let transaction of filteredTransactions()"
        [button]="true"
        (click)="onTransactionClick(transaction)">
        <app-transaction-card
          [transaction]="transaction"
          (retry)="retryFailedTransaction($event)">
        </app-transaction-card>
      </ion-item>
    </ion-list>

    <ng-template #emptyState>
      <div class="empty-state">
        <ion-icon name="receipt-outline" size="large"></ion-icon>
        <h3>No hay transacciones</h3>
        <p *ngIf="searchQuery() || statusFilter() !== 'ALL' || typeFilter() !== 'ALL'">
          No se encontraron transacciones con los filtros aplicados.
        </p>
        <p *ngIf="!searchQuery() && statusFilter() === 'ALL' && typeFilter() === 'ALL'">
          Tu historial de transacciones aparecerá aquí.
        </p>
        <ion-button
          *ngIf="searchQuery() || statusFilter() !== 'ALL' || typeFilter() !== 'ALL'"
          fill="outline"
          (click)="clearFilters()">
          Ver todas las transacciones
        </ion-button>
      </div>
    </ng-template>

    <ion-infinite-scroll
      *ngIf="filteredTransactions().length > 0"
      (ionInfinite)="loadMoreTransactions($event)">
      <ion-infinite-scroll-content
        loading-spinner="circles"
        loading-text="Cargando más transacciones...">
      </ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </div>

  <div class="sync-info" *ngIf="syncStatus() as status">
    <ion-note [color]="status.synced ? 'medium' : 'warning'">
      <ion-icon [name]="status.synced ? 'cloud-done-outline' : 'cloud-offline-outline'"></ion-icon>
      {{ status.message }}
    </ion-note>
  </div>
</ion-content>

// === ARCHIVO: src/app/presentation/components/transaction-card/transaction-card.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonLabel, IonBadge, IonButton, IonNote } from '@ionic/angular/standalone';
import { Transaction, TransactionStatus, TransactionType } from '../../../domain/entities/transaction.entity';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonLabel,
    IonBadge,
    IonButton,
    IonNote
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transaction-card" [class]="getStatusClass()">
      <div class="transaction-icon">
        <ion-icon [name]="getTypeIcon()" size="large"></ion-icon>
      </div>
      
      <div class="transaction-details">
        <div class="transaction-header">
          <ion-label class="transaction-type">{{ getTypeLabel() }}</ion-label>
          <ion-badge [color]="getStatusColor()" class="status-badge">
            {{ getStatusLabel() }}
          </ion-badge>
        </div>
        
        <ion-label class="transaction-description" *ngIf="transaction.description">
          {{ transaction.description }}
        </ion-label>
        
        <div class="transaction-meta">
          <ion-note class="transaction-date">
            <ion-icon name="calendar-outline"></ion-icon>
            {{ formatDate(transaction.createdAt) }}
          </ion-note>
          <ion-note class="transaction-id" *ngIf="showTransactionId">
            <ion-icon name="hash-outline"></ion-icon>
            {{ truncateId(transaction.id) }}
          </ion-note>
        </div>
        
        <div class="transaction-category" *ngIf="transaction.metadata?.category">
          <ion-badge color="light">
            {{ transaction.metadata.category }}
          </ion-badge>
        </div>
      </div>
      
      <div class="transaction-amount" [class]="getAmountClass()">
        <span class="amount-sign">{{ getAmountSign() }}</span>
        <span class="amount-value">{{ formatAmount(transaction.amount) }}</span>
        <span class="amount-currency">{{ transaction.currency || 'USD' }}</span>
      </div>
      
      <div class="transaction-actions" *ngIf="showActions && transaction.status === 'FAILED'">
        <ion-button
          fill="clear"
          size="small"
          color="primary"
          (click)="onRetry($event)">
          <ion-icon slot="icon-only" name="refresh-outline"></ion-icon>
        </ion-button>
        <ion-button
          fill="clear"
          size="small"
          color="medium"
          (click)="onDetails($event)">
          <ion-icon slot="icon-only" name="chevron-forward-outline"></ion-icon>
        </ion-button>
      </div>
      
      <div class="retry-info" *ngIf="showRetryInfo && transaction.status === 'FAILED'">
        <ion-note color="danger">
          <ion-icon name="warning-outline"></ion-icon>
          {{ transaction.metadata?.retryMessage || 'Transacción fallida. Toca para reintentar.' }}
        </ion-note>
      </div>
    </div>
  `,
  styles: [`
    .transaction-card {
      display: flex;
      align-items: flex-start;
      padding: 12px;
      background: var(--ion-item-background, var(--ion-card-background, #fff));
      border-radius: 12px;
      margin: 8px 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .transaction-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .transaction-card.status-completed {
      border-left: 4px solid var(--ion-color-success, #2dd36f);
    }
    
    .transaction-card.status-pending {
      border-left: 4px solid var(--ion-color-warning, #ffc409);
    }
    
    .transaction-card.status-failed {
      border-left: 4px solid var(--ion-color-danger, #eb445a);
    }
    
    .transaction-card.status-processing {
      border-left: 4px solid var(--ion-color-tertiary, #3dc2ec);
    }
    
    .transaction-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--ion-color-light, #f4f5f8);
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .transaction-icon ion-icon {
      color: var(--ion-color-primary, #3880ff);
    }
    
    .transaction-details {
      flex: 1;
      min-width: 0;
    }
    
    .transaction-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    
    .transaction-type {
      font-weight: 600;
      font-size: 16px;
      color: var(--ion-text-color, #000);
    }
    
    .status-badge {
      font-size: 10px;
      text-transform: uppercase;
    }
    
    .transaction-description {
      display: block;
      font-size: 14px;
      color: var(--ion-color-medium, #92949c);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .transaction-meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
    }
    
    .transaction-meta ion-note {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
    }
    
    .transaction-category {
      margin-top: 6px;
    }
    
    .transaction-amount {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 12px;
      flex-shrink: 0;
    }
    
    .transaction-amount.positive {
      color: var(--ion-color-success, #2dd36f);
    }
    
    .transaction-amount.negative {
      color: var(--ion-color-danger, #eb445a);
    }
    
    .amount-sign {
      font-size: 14px;
      font-weight: 500;
    }
    
    .amount-value {
      font-size: 18px;
      font-weight: 700;
    }
    
    .amount-currency {
      font-size: 12px;
      opacity: 0.7;
    }
    
    .transaction-actions {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      gap: 4px;
    }
    
    .retry-info {
      width: 100%;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--ion-color-light, #f4f5f8);
    }
  `]
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
  @Input() showActions = false;
  @Input() showRetryInfo = false;
  @Input() showTransactionId = false;

  @Output() transactionClick = new EventEmitter<Transaction>();
  @Output() retry = new EventEmitter<Transaction>();
  @Output() details = new EventEmitter<Transaction>();

  getTypeIcon(): string {
    const iconMap: Record<TransactionType, string> = {
      [TransactionType.DEPOSIT]: 'arrow-down-circle-outline',
      [TransactionType.WITHDRAWAL]: 'arrow-up-circle-outline',
      [TransactionType.TRANSFER]: 'swap-horizontal-outline',
      [TransactionType.PAYMENT]: 'card-outline',
      [TransactionType.REFUND]: 'return-up-back-outline'
    };
    return iconMap[this.transaction?.type] || 'help-circle-outline';
  }

  getTypeLabel(): string {
    const labelMap: Record<TransactionType, string> = {
      [TransactionType.DEPOSIT]: 'Depósito',
      [TransactionType.WITHDRAWAL]: 'Retiro',
      [TransactionType.TRANSFER]: 'Transferencia',
      [TransactionType.PAYMENT]: 'Pago',
      [TransactionType.REFUND]: 'Reembolso'
    };
    return labelMap[this.transaction?.type] || 'Transacción';
  }

  getStatusColor(): string {
    const colorMap: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]: 'warning',
      [TransactionStatus.PROCESSING]: 'tertiary',
      [TransactionStatus.COMPLETED]: 'success',
      [TransactionStatus.FAILED]: 'danger',
      [TransactionStatus.CANCELLED]: 'medium'
    };
    return colorMap[this.transaction?.status] || 'medium';
  }

  getStatusLabel(): string {
    const labelMap: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]: 'Pendiente',
      [TransactionStatus.PROCESSING]: 'Procesando',
      [TransactionStatus.COMPLETED]: 'Completada',
      [TransactionStatus.FAILED]: 'Fallida',
      [TransactionStatus.CANCELLED]: 'Cancelada'
    };
    return labelMap[this.transaction?.status] || 'Desconocido';
  }

  getStatusClass(): string {
    return `status-${this.transaction?.status?.toLowerCase() || 'unknown'}`;
  }

  getAmountClass(): string {
    const impact = this.transaction?.calculateBalanceImpact?.();
    return impact !== undefined ? (impact >= 0 ? 'positive' : 'negative') : 'positive';
  }

  getAmountSign(): string {
    const impact = this.transaction?.calculateBalanceImpact?.();
    return impact !== undefined ? (impact >= 0 ? '+' : '-') : '+';
  }

  formatAmount(amount: number): string {
    if (amount === undefined || amount === null) {
      return '0.00';
    }
    return Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  truncateId(id: string): string {
    if (!id || id.length < 8) {
      return id || '';
    }
    return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
  }

  onRetry(event: Event): void {
    event.stopPropagation();
    this.retry.emit(this.transaction);
  }

  onDetails(event: Event): void {
    event.stopPropagation();
    this.details.emit(this.transaction);
  }

// === ARCHIVO: src/app/presentation/components/balance-display/balance-display.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, loadingController, alertController } from '@ionic/angular';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { Account } from '../../../domain/entities/account.entity';

@Component({
  selector: 'app-balance-display',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card class="balance-card">
      <ion-card-header>
        <ion-card-title class="balance-title">Saldo Disponible</ion-card-title>
        <ion-card-subtitle class="account-info">
          @if (accountId()) {
            <span>Cuenta: {{ accountId() | slice:0:4 }}****</span>
          }
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        @if (isLoading()) {
          <div class="skeleton-container">
            <ion-skeleton-text animated class="balance-skeleton"></ion-skeleton-text>
            <ion-skeleton-text animated class="sub-skeleton"></ion-skeleton-text>
          </div>
        } @else if (error()) {
          <div class="error-container">
            <ion-icon name="alert-circle-outline" class="error-icon"></ion-icon>
            <p class="error-message">{{ error() }}</p>
            <ion-button fill="outline" size="small" (click)="retryLoad()">
              Reintentar
            </ion-button>
          </div>
        } @else {
          <div class="balance-amount" [class.positive]="balance() > 0" [class.negative]="balance() < 0">
            <span class="currency">$</span>
            <span class="amount">{{ formatBalance(balance()) }}</span>
          </div>
          <div class="balance-details">
            <div class="detail-row">
              <span class="label">Última actualización:</span>
              <span class="value">{{ lastUpdate() | date:'short' }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Transacciones pendientes:</span>
              <span class="value pending-count">{{ pendingCount() }}</span>
            </div>
          </div>
          <div class="balance-actions">
            <ion-button expand="block" fill="outline" (click)="refreshBalance()">
              <ion-icon slot="start" name="refresh-outline"></ion-icon>
              Actualizar
            </ion-button>
          </div>
        }
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .balance-card {
      margin: 16px;
      border-radius: 16px;
      --background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      --color: #ffffff;
    }
    .balance-title {
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.85;
    }
    .account-info {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 4px;
    }
    .balance-amount {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin: 24px 0;
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .balance-amount.positive {
      color: #4ade80;
    }
    .balance-amount.negative {
      color: #f87171;
    }
    .currency {
      font-size: 24px;
      font-weight: 500;
      margin-right: 4px;
    }
    .amount {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .balance-details {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }
    .detail-row:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .label {
      font-size: 12px;
      opacity: 0.7;
    }
    .value {
      font-size: 13px;
      font-weight: 500;
    }
    .pending-count {
      color: #fbbf24;
      font-weight: 600;
    }
    .balance-actions ion-button {
      --border-color: rgba(255, 255, 255, 0.3);
      --color: #ffffff;
    }
    .skeleton-container {
      padding: 20px 0;
    }
    .balance-skeleton {
      height: 48px;
      width: 70%;
      margin: 0 auto 12px;
    }
    .sub-skeleton {
      height: 16px;
      width: 50%;
      margin: 0 auto;
    }
    .error-container {
      text-align: center;
      padding: 20px;
    }
    .error-icon {
      font-size: 48px;
      color: #f87171;
      margin-bottom: 12px;
    }
    .error-message {
      color: #fca5a5;
      font-size: 14px;
      margin-bottom: 16px;
    }
  `]
})
export class BalanceDisplayComponent implements OnInit, OnDestroy {
  private readonly transactionRepository = inject(TransactionRepository);
  private readonly destroy$ = new Subject<void>();

  readonly balance = signal<number>(0);
  readonly accountId = signal<string>('');
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly lastUpdate = signal<Date>(new Date());
  readonly pendingCount = signal<number>(0);

  readonly formattedBalance = computed(() => this.formatBalance(this.balance()));

  async ngOnInit(): Promise<void> {
    await this.loadAccountData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadAccountData(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const mockAccountId = 'ACC-2024-001';
      this.accountId.set(mockAccountId);

      const transactions = await this.transactionRepository
        .findByAccountId(mockAccountId, 100, 0)
        .pipe(takeUntil(this.destroy$))
        .toPromise();

      if (!transactions || transactions.length === 0) {
        this.balance.set(0);
        this.pendingCount.set(0);
        this.isLoading.set(false);
        return;
      }

      const calculatedBalance = this.calculateBalanceFromTransactions(transactions);
      const pendingTransactions = transactions.filter(t => 
        t.isProcessable && t.withStatus('PENDING')
      );

      this.balance.set(calculatedBalance);
      this.pendingCount.set(pendingTransactions.length);
      this.lastUpdate.set(new Date());

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar el saldo';
      this.error.set(message);
      console.error('[BalanceDisplay] Error loading account data:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  private calculateBalanceFromTransactions(transactions: Transaction[]): number {
    return transactions.reduce((total, transaction) => {
      const impact = transaction.calculateBalanceImpact();
      return total + impact;
    }, 0);
  }

  formatBalance(amount: number): string {
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return amount < 0 ? `-${formatted}` : formatted;
  }

  async refreshBalance(): Promise<void> {
    const loading = await loadingController.create({
      message: 'Actualizando saldo...',
      duration: 1500,
      spinner: 'circles'
    });

    await loading.present();
    await this.loadAccountData();
    await loading.dismiss();
  }

  async retryLoad(): Promise<void> {
    await this.loadAccountData();
  }

  updateAccountId(newAccountId: string): void {
    this.accountId.set(newAccountId);
    this.loadAccountData();
  }

// === ARCHIVO: src/test/helpers/mocks.ts ===
import { Transaction, TransactionStatus, TransactionType } from '../../app/domain/entities/transaction.entity';
import { Account, AccountStatus } from '../../app/domain/entities/account.entity';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';

export const mockTransaction = (overrides?: Partial<Transaction>): Transaction => {
  return {
    id: 'txn-123',
    accountId: 'acc-456',
    amount: 100.00,
    type: TransactionType.DEBIT,
    status: TransactionStatus.PENDING,
    description: 'Test transaction',
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    calculateBalanceImpact: () => -100.00,
    isProcessable: () => true,
    withStatus: (newStatus: TransactionStatus) => mockTransaction({ status: newStatus }),
    ...overrides
  } as Transaction;
};

export const mockAccount = (overrides?: Partial<Account>): Account => {
  return {
    id: 'acc-456',
    accountNumber: '1234567890',
    balance: 1000.00,
    status: AccountStatus.ACTIVE,
    currency: 'USD',
    isActive: () => true,
    adjustBalance: (amount: number) => mockAccount({ balance: 1000.00 + amount }),
    withStatus: (newStatus: AccountStatus) => mockAccount({ status: newStatus }),
    hasSufficientFunds: (amount: number) => 1000.00 >= amount,
    ...overrides
  } as Account;
};

export const mockTransactionRepository = (): jest.Mocked<TransactionRepository> => {
  return {
    save: jest.fn().mockResolvedValue(mockTransaction()),
    findById: jest.fn().mockResolvedValue(mockTransaction()),
    findByAccountId: jest.fn().mockResolvedValue([mockTransaction()]),
    findPendingTransactions: jest.fn().mockResolvedValue([mockTransaction()]),
    updateStatus: jest.fn().mockResolvedValue(mockTransaction()),
    syncWithBackend: jest.fn().mockResolvedValue(undefined)
  };
};

// === ARCHIVO: src/test/unit/transaction.entity.spec.ts ===
import { Transaction, TransactionStatus, TransactionType } from '../../app/domain/entities/transaction.entity';
import { mockTransaction } from '../helpers/mocks';

describe('Transaction Entity', () => {
  describe('calculateBalanceImpact', () => {
    it('debería retornar impacto negativo para transacciones de débito', () => {
      const transaction = mockTransaction({ type: TransactionType.DEBIT, amount: 150.00 });
      const impact = transaction.calculateBalanceImpact();
      expect(impact).toBe(-150.00);
    });

    it('debería retornar impacto positivo para transacciones de crédito', () => {
      const transaction = mockTransaction({ type: TransactionType.CREDIT, amount: 200.00 });
      const impact = transaction.calculateBalanceImpact();
      expect(impact).toBe(200.00);
    });
  });

  describe('isProcessable', () => {
    it('debería retornar true cuando la transacción está en estado pendiente', () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      expect(transaction.isProcessable()).toBe(true);
    });

    it('debería retornar false cuando la transacción ya fue procesada', () => {
      const transaction = mockTransaction({ status: TransactionStatus.COMPLETED });
      expect(transaction.isProcessable()).toBe(false);
    });
  });

  describe('withStatus', () => {
    it('debería crear una nueva transacción con el estado actualizado', () => {
      const original = mockTransaction({ status: TransactionStatus.PENDING });
      const updated = original.withStatus(TransactionStatus.COMPLETED);
      expect(updated.status).toBe(TransactionStatus.COMPLETED);
    });
  });
});

// === ARCHIVO: src/test/unit/process-transaction.usecase.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { ProcessTransactionUseCase } from '../../app/domain/usecases/process-transaction.usecase';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';
import { mockTransactionRepository, mockTransaction } from '../helpers/mocks';
import { TransactionStatus } from '../../app/domain/entities/transaction.entity';

describe('ProcessTransactionUseCase', () => {
  let useCase: ProcessTransactionUseCase;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ProcessTransactionUseCase,
        { provide: TransactionRepository, useFactory: mockTransactionRepository }
      ]
    });

    useCase = TestBed.inject(ProcessTransactionUseCase);
    repository = TestBed.inject(TransactionRepository) as jest.Mocked<TransactionRepository>;
  });

  it('debería existir', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('debería procesar una transacción exitosamente', async () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      repository.findById.mockResolvedValue(transaction);
      repository.updateStatus.mockResolvedValue(transaction);

      const result = await useCase.execute(transaction.id);
      expect(repository.findById).toHaveBeenCalledWith(transaction.id);
      expect(repository.updateStatus).toHaveBeenCalled();
    });

    it('debería manejar transacciones no encontradas', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await useCase.execute('non-existent-id');
      expect(result).toBeNull();
    });
  });
});

// === ARCHIVO: src/test/unit/transaction.service.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { TransactionService } from '../../app/presentation/services/transaction.service';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';
import { mockTransactionRepository, mockTransaction } from '../helpers/mocks';
import { TransactionStatus } from '../../app/domain/entities/transaction.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useFactory: mockTransactionRepository }
      ]
    });

    service = TestBed.inject(TransactionService);
    repository = TestBed.inject(TransactionRepository) as jest.Mocked<TransactionRepository>;
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeDefined();
  });

  describe('getTransactions', () => {
    it('debería obtener transacciones de una cuenta', async () => {
      const accountId = 'acc-456';
      const transactions = [mockTransaction(), mockTransaction({ id: 'txn-124' })];
      repository.findByAccountId.mockResolvedValue(transactions);

      const result = await service.getTransactions(accountId);
      expect(repository.findByAccountId).toHaveBeenCalledWith(accountId, undefined, undefined);
      expect(result).toHaveLength(2);
    });

    it('debería retornar array vacío cuando no hay transacciones', async () => {
      repository.findByAccountId.mockResolvedValue([]);

      const result = await service.getTransactions('acc-empty');
      expect(result).toHaveLength(0);
    });
  });

  describe('createTransaction', () => {
    it('debería crear una nueva transacción', async () => {
      const transaction = mockTransaction({ status: TransactionStatus.PENDING });
      repository.save.mockResolvedValue(transaction);

      const result = await service.createTransaction(transaction);
      expect(repository.save).toHaveBeenCalledWith(transaction);
      expect(result).toBeDefined();
    });
  });

  describe('syncTransactions', () => {
    it('debería sincronizar transacciones con el backend', async () => {
      repository.syncWithBackend.mockResolvedValue(undefined);

      await service.syncTransactions();
      expect(repository.syncWithBackend).toHaveBeenCalled();
    });
  });
});

// === ARCHIVO: e2e/specs/transaction-flow.spec.ts ===
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor';

describe('Flujo de Transacciones', () => {
  describe('Creación de nueva transacción', () => {
    it.skip('debería crear una transacción exitosa con saldo suficiente', () => {
      // Arrange: usuario autenticado con cuenta activa y saldo
      // Act: usuario inicia una nueva transacción
      // Assert: transacción creada exitosamente
    });

    it.skip('debería rechazar transacción por saldo insuficiente', () => {
      // Arrange: usuario autenticado con cuenta sin fondos
      // Act: usuario intenta crear transacción
      // Assert: transacción rechazada con mensaje de error
    });

    it.skip('debería validar campos obligatorios de la transacción', () => {
      // Arrange: usuario en formulario de transacción
      // Act: usuario envía formulario incompleto
      // Assert: validación muestra errores en campos requeridos
    });
  });

  describe('Visualización de transacciones', () => {
    it.skip('debería mostrar historial de transacciones del usuario', () => {
      // Arrange: usuario autenticado con transacciones previas
      // Act: usuario navega a pantalla de transacciones
      // Assert: lista de transacciones displayed
    });

    it.skip('debería filtrar transacciones por tipo', () => {
      // Arrange: usuario en pantalla de transacciones
      // Act: usuario aplica filtro por tipo
      // Assert: solo transacciones del tipo seleccionado displayed
    });

    it.skip('debería mostrar detalles de una transacción específica', () => {
      // Arrange: usuario en lista de transacciones
      // Act: usuario selecciona una transacción
      // Assert: detalles completos displayed
    });
  });

  describe('Procesamiento de transacciones', () => {
    it.skip('debería actualizar saldo después de transacción exitosa', () => {
      // Arrange: cuenta con saldo inicial conocido
      // Act: transacción completada
      // Assert: saldo actualizado correctamente
    });

    it.skip('debería sincronizar transacción con backend', () => {
      // Arrange: transacción creada en modo offline
      // Act: conexión restaurada
      // Assert: transacción sincronizada con backend
    });
  });
});

// === ARCHIVO: e2e/specs/auth-flow.spec.ts ===
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor';

describe('Flujo de Autenticación', () => {
  describe('Inicio de sesión', () => {
    it.skip('debería iniciar sesión con credenciales válidas', () => {
      // Arrange: usuario registrado en el sistema
      // Act: usuario ingresa credenciales válidas
      // Assert: usuario autenticado y redirigido a home
    });

    it.skip('debería rechazar credenciales inválidas', () => {
      // Arrange: usuario en pantalla de login
      // Act: usuario ingresa credenciales incorrectas
      // Assert: mensaje de error mostrado
    });

    it.skip('debería mostrar error con cuenta bloqueada', () => {
      // Arrange: usuario con cuenta bloqueada por intentos fallidos
      // Act: usuario intenta iniciar sesión
      // Assert: mensaje de cuenta bloqueada mostrado
    });
  });

  describe('Cierre de sesión', () => {
    it.skip('debería cerrar sesión correctamente', () => {
      // Arrange: usuario autenticado
      // Act: usuario selecciona cerrar sesión
      // Assert: usuario redirigido a login, sesión invalidada
    });
  });

  describe('Gestión de sesión', () => {
    it.skip('debería mantener sesión activa', () => {
      // Arrange: usuario autenticado
      // Act: usuario permanece inactivo por tiempo corto
      // Assert: sesión sigue activa
    });

    it.skip('debería expirar sesión por inactividad', () => {
      // Arrange: usuario autenticado
      // Act: usuario permanece inactivo por tiempo prolongado
      // Assert: sesión expirada, redirigido a login
    });
  });
});

// === ARCHIVO: e2e/support/commands.ts ===
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

// === ARCHIVO: docs/bdd-explanation.md ===
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

// === ARCHIVO: docs/profiling-guide.md ===
# Perfilamiento de Aplicaciones y Servicios Virtualizados

## Introducción al Perfilamiento

El perfilamiento (profiling) es el proceso de medición y análisis del rendimiento de una aplicación para identificar cuellos de botella, consumo de memoria, patrones de uso de CPU y otras métricas críticas. En una aplicación móvil Ionic que procesa 10,000 transacciones por hora con latencia máxima de 200ms, el perfilamiento es esencial para garantizar los SLAs.

## Métricas Fundamentales

### 1. Tiempo de Inicio (Cold Start)

El tiempo que transcurre desde que el usuario toca el icono hasta que la aplicación está interactiva. En Ionic, esto incluye:

- Carga del WebView
- Inicialización de Angular
- Carga del módulo principal
- Renderizado del primer componente

**Objetivo típico**: < 2 segundos en dispositivos de gama media.

### 2. Uso de Memoria

El consumo de RAM durante la ejecución. Memory leaks en aplicaciones Ionic frecuentemente ocurren por:

- Observables sin desuscribirse
- Referencias circulares en componentes
- Caching excesivo de datos

**Herramienta**: Chrome DevTools > Memory tab, disponible vía USB debugging.

### 3. Latencia de Interacciones

El tiempo entre un input del usuario y la respuesta visual.超过 100ms percibirse como "lento" por el usuario.

### 4. FPS (Frames Per Second)

La fluidez de la interfaz. Un objetivo constante de 60 FPS garantiza una experiencia fluida. Caídas por debajo de 30 FPS indican problemas de renderizado.

## Herramientas de Perfilamiento para Ionic

### Chrome DevTools

Conecte su dispositivo Android vía USB y acceda a chrome://inspect para profiler la aplicación:

```bash
# Habilitar USB debugging en el dispositivo
# Conectar dispositivo
# Abrir Chrome y navegar a chrome://inspect
```

### Ionic DevApp y Ionic Lab

Permiten testing en dispositivos reales con reload automático y acceso a herramientas de desarrollo nativas.

### Android Profiler (Android Studio)

Proporciona visualización en tiempo real de CPU, memoria, red y energía consumida por la aplicación.

## Servicios Virtualizados en Arquitectura Móvil

### Concepto de Virtualización

La virtualización en el contexto de aplicaciones móviles se refiere a la creación de abstracciones que permiten ejecutar servicios backend sin necesidad de infraestructura física real durante desarrollo y testing.

### Tipos de Servicios Virtualizados

#### 1. Mock Servers

Servidores que simulan APIs REST con respuestas predefinidas. Ejemplo: JSON Server, MirageJS.

#### 2. Service Virtualization Platforms

Plataformas empresariales como WireMock, MockServer que permiten:

- Simular respuestas complejas
- Crear escenarios de error
- Configurar latencia simulada

#### 3. Contratos de API

Definiciones formales de las interfaces entre frontend y backend, típicamente en formato OpenAPI/Swagger o GraphQL Schema.

## Implementación en Ionic Banking

### Estrategias de Virtualización para Testing

#### Interceptores HTTP

Angular permite crear interceptores que interceptan todas las peticiones HTTP, permitiendo retornar respuestas mockeas sin modificar el código de la aplicación:

```typescript
// src/app/core/interceptors/mock.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  private mocks = new Map<string, any>();
  
  constructor() {
    this.initializeMocks();
  }
  
  private initializeMocks(): void {
    this.mocks.set('/api/accounts/ACC-001/balance', {
      balance: 5000.00,
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    });
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const mockKey = req.urlWithParams;
    
    if (this.mocks.has(mockKey) && req.method === 'GET') {
      return of(new HttpResponse({
        status: 200,
        body: this.mocks.get(mockKey)
      })).pipe(delay(200)); // Simular latencia de red
    }
    
    return next.handle(req);
  }
}
```

#### Cypress Intercepts

Para pruebas E2E, Cypress permite configurar respuestas mockeas a nivel de red:

```typescript
// e2e/support/mocks.ts

export const setupTransactionMocks = () => {
  cy.intercept('GET', '/api/transactions*', {
    statusCode: 200,
    body: {
      transactions: [
        {
          id: 'TXN-001',
          amount: 150.00,
          type: 'TRANSFER',
          status: 'COMPLETED',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ],
      pagination: { total: 1, page: 1, limit: 20 }
    }
  }).as('getTransactions');
  
  cy.intercept('POST', '/api/transactions', {
    statusCode: 201,
    body: {
      id: 'TXN-NEW-001',
      status: 'PENDING',
      message: 'Transacción creada exitosamente'
    }
  }).as('createTransaction');
};
```

### Beneficios de la Virtualización

#### Desarrollo Paralelo

Equipos frontend y backend pueden trabajar simultáneamente sin bloqueos por dependencias.

#### Testing de Escenarios de Error

Permite simular condiciones difíciles de reproducir:

- Timeout de red
- Errores 500 del servidor
- Latencia extrema
- Datos corruptos

#### Reducción de Costos

No se requiere infraestructura de staging completa para testing funcional.

## Técnicas de Optimización de Rendimiento

### 1. Lazy Loading de Módulos

Cargar módulos bajo demanda reduce el tiempo de inicio:

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () => import('./presentation/pages/transactions/transactions.module')
      .then(m => m.TransactionsModule)
  }
];
```

### 2. Change Detection Strategy OnPush

Reducir la frecuencia de detección de cambios en componentes:

```typescript
@Component({
  selector: 'app-balance-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './balance-display.component.html'
})
export class BalanceDisplayComponent {
  @Input() balance: number = 0;
  @Input() status: AccountStatus = AccountStatus.ACTIVE;
}
```

### 3. Virtual Scrolling

Para listas grandes de transacciones, usar virtual scrolling:

```typescript
import { IonicModule } from '@ionic/angular';
import { VirtualScrollModule } from '@angular/cdk/scrolling';
```

### 4. Memoización de Selectors

En aplicaciones con estado complejo, memoizar los selectors para evitar cálculos redundantes.

## Proceso de Perfilamiento

### Fase 1: Baseline

Establecer métricas de rendimiento iniciales en condiciones controladas.

### Fase 2: Stress Testing

Someter la aplicación a cargas progresivas para identificar umbrales de ruptura.

### Fase 3: Análisis de Resultados

Identificar patrones de degradación y correlacionar con código específico.

### Fase 4: Optimización

Implementar mejoras y verificar impacto en las métricas.

### Fase 5: Monitoreo Continuo

Integrar herramientas de monitoreo en producción para detección temprana de regresiones.

## Referencias

- Chrome DevTools Performance: https://developer.chrome.com/docs/devtools/performance
- Angular Performance Guide: https://angular.io/guide/performance
- Ionic Profiling: https://ionicframework.com/docs/developer-resources/performance
```
