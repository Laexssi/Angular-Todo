// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: "AIzaSyBbtbJHkMvgFZD358KPmEOz48aoeFaQnVk",
  authDomain: "todo-c43f3.firebaseapp.com",
  databaseURL: "https://todo-c43f3.firebaseio.com",
  projectId: "todo-c43f3",
  storageBucket: "todo-c43f3.appspot.com",
  messagingSenderId: "308469250196",
  appId: "1:308469250196:web:acc05bf108e6b08022dc81"
};

export const environment = {
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
