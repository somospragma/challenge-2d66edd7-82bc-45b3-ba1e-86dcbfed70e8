# Optimización y validación de una aplicación móvil con Ionic

En el contexto de una aplicación móvil de banca construida con Ionic, el objetivo es implementar pruebas unitarias en lenguaje nativo, utilizar pruebas funcionales automatizadas, explicar el concepto de BDD y comprender la importancia del perfilamiento de aplicaciones y los servicios virtualizados. La aplicación debe manejar transacciones financieras con alta disponibilidad y consistencia. Los actores involucrados son el usuario final, el backend de la banca y el sistema de notificaciones. La aplicación debe procesar un mínimo de 10 000 transacciones por hora con una latencia máxima de 200ms y mantener una consistencia eventual entre el estado local y el backend.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Técnicas de pruebas unitarias y fundamentos de perfilamiento de aplicaciones |
| **Nivel** | master-l2 |
| **Tipo** | mixed |
| **Tiempo estimado** | 20 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de pruebas unitarias

**Objetivo:** Garantizar la correcta funcionalidad de los componentes individuales de la aplicación.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Identificar los componentes críticos de la aplicación que requieren pruebas unitarias.
- Escribir pruebas unitarias para validar la funcionalidad de estos componentes.
- Asegurar que las pruebas cubran los casos de éxito y los casos límite del dominio.

**Entregable:** Conjunto de pruebas unitarias que cubren los componentes críticos de la aplicación.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el impacto de las pruebas en la performance y la mantenibilidad del código.
- Piensa en cómo las pruebas pueden ayudar a identificar errores temprano en el ciclo de desarrollo.

</details>

### Fase 2: Implementación de pruebas funcionales automatizadas

**Objetivo:** Validar el flujo completo de la aplicación desde la perspectiva del usuario.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Diseñar y escribir pruebas funcionales automatizadas que cubran los flujos de usuario clave.
- Asegurar que las pruebas verifican la interacción correcta entre los componentes y el backend.
- Evaluar la robustez de la aplicación ante diferentes condiciones de uso.

**Entregable:** Conjunto de pruebas funcionales automatizadas que validan los flujos de usuario clave.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo las pruebas funcionales pueden ayudar a identificar problemas de integración entre componentes.
- Piensa en la importancia de mantener las pruebas actualizadas con los cambios en la aplicación.

</details>

### Fase 3: Explicación de BDD y su aplicación

**Objetivo:** Comprender y aplicar el concepto de BDD en el desarrollo de la aplicación.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Investigar y explicar el concepto de BDD y su importancia en el desarrollo de software.
- Aplicar BDD en la escritura de pruebas para la aplicación móvil.
- Evaluar cómo BDD mejora la colaboración entre desarrolladores y stakeholders.

**Entregable:** Documento que explique el concepto de BDD y su aplicación en las pruebas de la aplicación.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo BDD puede ayudar a alinear las expectativas de los stakeholders con la implementación técnica.
- Piensa en la importancia de mantener un lenguaje común entre desarrolladores y stakeholders.

</details>

### Fase 4: Perfilamiento de aplicaciones y servicios virtualizados

**Objetivo:** Comprender la importancia del perfilamiento de aplicaciones y los servicios virtualizados en el rendimiento y la escalabilidad.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Investigar y explicar la importancia del perfilamiento de aplicaciones y los servicios virtualizados.
- Aplicar técnicas de perfilamiento en la aplicación móvil.
- Evaluar el impacto de los servicios virtualizados en el rendimiento y la escalabilidad de la aplicación.

**Entregable:** Documento que explique la importancia del perfilamiento de aplicaciones y los servicios virtualizados, y los resultados de la aplicación de estas técnicas en la aplicación móvil.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo el perfilamiento puede ayudarte a identificar cuellos de botella en el rendimiento.
- Piensa en la importancia de los servicios virtualizados para simular diferentes condiciones de uso y carga.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las pruebas unitarias y por qué son importantes en el desarrollo de aplicaciones móviles?
- **paraQueSirve**: ¿Cómo aplicas BDD en la escritura de pruebas para mejorar la colaboración entre desarrolladores y stakeholders?
- **comoSeUsa**: ¿Cómo utilizas el perfilamiento de aplicaciones para identificar y resolver cuellos de botella en el rendimiento?
- **erroresComunes**: ¿Cuáles son los errores comunes al escribir pruebas unitarias y cómo los evitas?
- **queDecisionesImplica**: ¿Qué decisiones implica la aplicación de servicios virtualizados en el desarrollo de aplicaciones móviles?

## Criterios de Evaluacion

- Implementar pruebas unitarias que cubran los componentes críticos de la aplicación.
- Escribir pruebas funcionales automatizadas que validen los flujos de usuario clave.
- Explicar y aplicar el concepto de BDD en la escritura de pruebas.
- Comprender y aplicar técnicas de perfilamiento de aplicaciones y servicios virtualizados para mejorar el rendimiento y la escalabilidad.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
