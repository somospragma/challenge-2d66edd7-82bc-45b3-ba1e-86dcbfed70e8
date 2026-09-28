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