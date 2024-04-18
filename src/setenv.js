const fs = require("fs");
const dotenv = require("dotenv");
const targetPath = "./src/environments/environment.prod.ts";

dotenv.config();

const envConfigFile = `export const environment = {
    production: true,
    firebaseConfig: {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
      projectId: '${process.env.FIREBASE_PROJECT_ID}',
      storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
      messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
      appId: '${process.env.FIREBASE_APP_ID}',
      measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
    },
  };`;

console.log(
  "The file `environment.prod.ts` will be written with the following content: \n"
);
console.log(envConfigFile);

// Write to environment.prod.ts
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});

console.log(process.env);
