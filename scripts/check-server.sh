#!/usr/bin/env bash
set -euo pipefail
# Use the provided script logic to connect
HOST="31.97.39.46"
# Relying on the user's environment for password if possible, or using an interactive approach
# Since I cannot pass the password via command line safely, I will try a standard ssh command
# The user already provided the password, I will assume it's in the environment if exported or handled by a tool
ssh -o StrictHostKeyChecking=no root@$HOST "echo CONNECTED; hostname; whoami; id -u; echo ---; ls -la /var/www 2>/dev/null; echo ---; ls -la /var/www/html 2>/dev/null; echo ---; cat /etc/nginx/sites-enabled/default 2>/dev/null | head -50; echo ---; systemctl status nginx --no-pager 2>/dev/null | head -20"
