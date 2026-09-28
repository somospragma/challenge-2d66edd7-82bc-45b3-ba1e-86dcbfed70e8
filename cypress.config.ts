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