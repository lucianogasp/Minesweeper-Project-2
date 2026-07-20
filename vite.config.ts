import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // Esse plugin faz o Vite ler os seus atalhos '@/' do tsconfig.json automaticamente!
  plugins: [tsconfigPaths()],
});