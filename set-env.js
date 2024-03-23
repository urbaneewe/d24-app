require('dotenv').config();
const fs = require('fs');

const targetPath = './src/environments/environment.ts';

// Generate the content of environment.ts and write to file
const envConfigFile = `
export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}',
};
`;

fs.writeFileSync(targetPath, envConfigFile, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`environment.ts file generated correctly at ${targetPath}`);
  }
});
