import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run redux-bill-tracker:serve:development',
        production: 'nx run redux-bill-tracker:serve:production',
      },
      ciWebServerCommand: 'nx run redux-bill-tracker:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
