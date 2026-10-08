#!/usr/bin/env bash
set -euo pipefail
CI=true npm test -- --watch=false --runInBand
npm run build
