// esbuild.config.js
const esbuild = require('esbuild')

esbuild
  .build({
    entryPoints: ['src/server.ts'],
    bundle: true,
    outfile: 'dist/server.js',
    platform: 'node',
    target: 'es2020',
    sourcemap: true,
  })
  .catch(() => process.exit(1))
