#!/usr/bin/env bash
set -euo pipefail
PLINK="/c/Program Files/PuTTY/plink"
PASS="${VPS_PASSWORD:-}"
if [ -z "$PASS" ]; then echo "no password" >&2; exit 1; fi
HOST="31.97.39.46"
"$PLINK" -P 22 -batch -pw "$PASS" -nohostkeycheck "root@$HOST" \
  "echo CONNECTED; hostname; whoami; id -u; echo ---; ls -la /var/www 2>/dev/null; echo ---; ls -la /var/www/html 2>/dev/null; echo ---; cat /etc/nginx/sites-enabled/default 2>/dev/null | head -50; echo ---; systemctl status nginx --no-pager 2>/dev/null | head -20"