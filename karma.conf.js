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