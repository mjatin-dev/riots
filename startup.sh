#!/bin/sh
rm -rf src/migrations/
npm run migration-generate;
npm run migration;
npm run build;
node dist/main;